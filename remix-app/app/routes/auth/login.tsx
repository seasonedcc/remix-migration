import * as React from 'react'
import type { ActionFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { useActionData, useLocation, useTransition } from '@remix-run/react'
import { authenticateHeaders } from '~/framework/index.server'
import Input from '~/components/input'
import Button from '~/components/button'
import InputHint from '~/components/input-hint'
import { Form } from '~/framework/common'
import { $path } from 'remix-routes'
import { inputFromForm } from 'remix-domains'
import { login } from '~/domain/authentication.server'

export const loginPath = (url: { pathname: string }) =>
  $path('/auth/login', { 'redirect-to': url.pathname })

export const action: ActionFunction = async ({ request }) => {
  const result = await login(await inputFromForm(request))
  if (!result.success) return { error: 'Invalid username or password' }

  const headers = await authenticateHeaders(request, result.data)
  return redirect($path('/auth/set-devise-token-auth'), { headers })
}

export default function Login() {
  const actionData = useActionData()
  const transition = useTransition()
  const location = useLocation()
  const qs = new URLSearchParams(location.search)
  const [email, setEmail] = React.useState(qs.get('email') ?? '')
  const invalidMsg = qs.get('invalid')
    ? 'Your link has expired, please generate a new one.'
    : null

  return (
    <Form action={location.search} method="post" className="mx-auto max-w-2xl">
      <fieldset
        className="flex flex-col gap-6"
        disabled={transition.state === 'submitting'}
      >
        <legend className="mb-6 text-left">
          <h2>Remix App Login</h2>
        </legend>
        <div className="flex flex-col">
          <Input
            label="Email"
            autoFocus
            type="email"
            name="email"
            required
            autoComplete="off"
            onChange={(event: { target: { value: string } }) =>
              setEmail(event.target.value)
            }
            value={email}
          />
        </div>
        <div className="flex flex-col">
          <Input
            label="Password"
            type="password"
            name="password"
            required
            autoComplete="current-password"
          />
        </div>
        <InputHint isError>{actionData?.error ?? invalidMsg}</InputHint>
        <Button
          className="self-center"
          variant="primary"
          size="lg"
          contained
          type="submit"
        >
          Sign in
        </Button>
      </fieldset>
    </Form>
  )
}
