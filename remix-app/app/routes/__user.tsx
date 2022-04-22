import type { LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { Outlet, useLoaderData, useLocation } from '@remix-run/react'
import { getDeviseUser } from '~/framework/index.server'
import type { DeviseUser } from '~/framework/common/types'
import type { User } from '~/domain/authentication.server'
import { userFromDevise } from '~/domain/authentication.server'
import { $path } from 'remix-routes'
import { loginPath } from '~/routes/auth/login'
import Redirect from '~/components/redirect'

type AuthenticatedContext = {
  user: User
  deviseUser: DeviseUser
}

export const loader: LoaderFunction = async ({
  request,
}): Promise<AuthenticatedContext | Response> => {
  try {
    const deviseUser = await getDeviseUser(request)
    if (!deviseUser) return redirect($path('/auth/login'))

    const result = await userFromDevise(deviseUser)
    if (!result.success) return redirect($path('/auth/login'))

    return {
      user: result.data,
      deviseUser,
    }
  } catch (error) {
    return redirect(loginPath(new URL(request.url)))
  }
}

export default function Index() {
  const { user, deviseUser } = useLoaderData<AuthenticatedContext>()
  const location = useLocation()

  return (
    <>
      {!deviseUser && <Redirect to={loginPath(location)} />}
      <Outlet context={{ user, deviseUser }} />
    </>
  )
}

export type { AuthenticatedContext }
