import type { LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { $path } from 'remix-routes'

export const loader: LoaderFunction = async () => {
  return redirect($path('/auth/login'))
}
