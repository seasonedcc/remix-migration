import * as React from 'react'
import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import type { DeviseUser } from '~/framework/common'

import { deviseTokenAuth } from '~/framework/client'
import { getDeviseUser } from '~/framework/server/auth'
import { $path } from 'remix-routes'

type LoaderData = { user: DeviseUser; redirectTo: string }

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getDeviseUser(request)
  if (!user) throw redirect($path('/auth/login'))

  return json({ user, redirectTo: $path('/') })
}

export default () => {
  const { user, redirectTo } = useLoaderData<LoaderData>()
  const [createdToken, setCreatedToken] = React.useState(false)

  React.useEffect(() => {
    if (user && redirectTo) {
      deviseTokenAuth.create(user)
      setCreatedToken(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  if (!redirectTo || !createdToken) return null

  return <meta httpEquiv="refresh" content={`0; URL='${redirectTo}'`} />
}
