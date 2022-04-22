import type { ActionFunction } from '@remix-run/node'
import { $path } from 'remix-routes'
import { logout } from '~/framework/index.server'

export const action: ActionFunction = async ({ request }) =>
  logout(request, $path('/auth/login'))
