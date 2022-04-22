import type React from 'react'

export type DomainPath = `/${string}` | ''
type RouteProps = { path: DomainPath; pageTitle: string; category?: string }

export type PageProps<T = Record<string, any>> = React.FC<
  T &
    RouteProps & {
      currentUser?: User
      uri: string
    }
>

export type User = {
  id: number
  active: boolean
  role: string
  firstName?: string
  lastName?: string
  email: string
}

export type Route = RouteProps & {
  LayoutComponent?: React.ComponentType<any>
  breadcrumbs?: string[]
  authRedirect?: string
  component: null | React.ComponentType<any>
  unauthorize?: (u?: User) => boolean
  authorize?: boolean
  showWhen?: (env: NodeJS.ProcessEnv) => boolean
}
