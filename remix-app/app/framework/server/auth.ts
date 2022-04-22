import { createCookieSessionStorage, redirect } from '@remix-run/node'
import { getOrSetGlobal } from '~/framework/index.server'
import type { DeviseUser } from '~/framework/common'
import { environment } from '~/environment.server'

const sessionKey = 'user'

function sessionStorage() {
  return getOrSetGlobal(
    'sessionStorage',
    createCookieSessionStorage({
      cookie: {
        name: '_session', // use any name you want here
        sameSite: 'lax', // this helps with CSRF
        path: '/', // remember to add this so the cookie will work in all routes
        httpOnly: true, // for security reasons, make this cookie http only
        secrets: [environment().SESSION_SECRET], // replace this with an actual secret
        secure: environment().NODE_ENV === 'production', // enable this in prod only
      },
    }),
  )
}

async function authenticateHeaders(request: Request, user: DeviseUser) {
  const session = await sessionStorage().getSession(
    request.headers.get('cookie'),
  )
  session.set(sessionKey, user)

  const headers = new Headers({
    'Set-Cookie': await sessionStorage().commitSession(session),
    'Access-Token': user.accessToken,
    Client: user.client,
    Expiry: String(user.expiry),
    Uid: user.uid,
    'Token-Type': 'Bearer',
  })

  return headers as ResponseInit['headers']
}

const authenticatedSession = async (request: Request) => {
  const session = await sessionStorage().getSession(
    request.headers.get('cookie'),
  )

  if (!session.get(sessionKey)) {
    throw new Response('Missing Authentication', { status: 401 })
  }
  return session.get(sessionKey) as DeviseUser
}

const authenticateRequest = async (request: Request, user: DeviseUser) => {
  const authenticatedRequest = request.clone()
  const session = await sessionStorage().getSession(
    authenticatedRequest.headers.get('cookie'),
  )
  session.set(sessionKey, user)
  authenticatedRequest.headers.set(
    'cookie',
    await sessionStorage().commitSession(session),
  )
  return authenticatedRequest
}

const getDeviseUser = (request: Request) =>
  sessionStorage()
    .getSession(request.headers.get('cookie'))
    .then((session) => session.get(sessionKey) as DeviseUser)

const logout = async (request: Request, redirectTo: string) => {
  let session = await sessionStorage().getSession(request.headers.get('Cookie'))

  throw redirect(redirectTo, {
    headers: {
      'Set-Cookie': await sessionStorage().destroySession(session),
    },
  })
}

export {
  logout,
  authenticateHeaders,
  getDeviseUser,
  authenticatedSession,
  authenticateRequest,
  sessionStorage,
}
