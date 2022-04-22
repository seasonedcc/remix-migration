import type { LoaderFunction } from '@remix-run/node'
import { environment } from '~/environment.server'
import { notFound } from '~/framework/index.server'

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const { origin } = new URL(request.url)

    const proxiedUrl = request.url.replace(origin, environment().SPA_APP_URL)
    const res = await fetch(proxiedUrl)

    const bodyContent = (await res.text()).replace(
      environment().SPA_APP_URL,
      origin,
    )
    return new Response(bodyContent, { headers: res.headers })
  } catch (error) {
    console.error(error)

    throw notFound()
  }
}
