import React, { Suspense, useEffect } from 'react'
import type { HistoryLocation } from '@reach/router'
// @ts-ignore
import { Auth } from 'croods-auth'
import Layout from 'shared/ui/layout'
import Loading from 'shared/ui/Loading'
import type { Route as RouteTypes } from 'types'

const redirectUnauthorizedUser = (path: string) => async () => {
  window.location.href = path
}

export type RouteProps = RouteTypes & {
  LayoutComponent?: React.ComponentType<any>
  location?: HistoryLocation
  path: string
  default?: boolean
  show: boolean
}

export const keepHistoryURL = (
  location: any,
  authRedirect: string | undefined,
) => {
  const { pathname, search, hash } = location ?? {}
  const endpoint = [pathname, search, hash].join('') ?? '/'
  const path = authRedirect || `/login?redirect_to=${endpoint}`

  return path
}

export const Route = ({
  component,
  authorize = true,
  unauthorize,
  authRedirect,
  LayoutComponent = Layout,
  breadcrumbs,
  ...props
}: RouteProps) => {
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [props.location])

  const Rendered = () => {
    if (component) {
      const Component = component

      if (authorize) {
        return (
          <Auth
            {...props}
            authorizing={<Loading />}
            unauthorize={unauthorize}
            unauthorized={redirectUnauthorizedUser(
              keepHistoryURL(props.location, authRedirect),
            )}
            Component={component}
          />
        )
      }

      return <Component {...props} />
    }

    return null
  }

  return (
    <LayoutComponent
      {...props}
      location={props.location}
      breadcrumbs={breadcrumbs}
      path={props.path}
    >
      <Suspense fallback={<Loading />}>
        <Rendered />
      </Suspense>
    </LayoutComponent>
  )
}
