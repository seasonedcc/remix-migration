import React, { useEffect } from 'react'
import { useSignIn } from 'croods-auth'

import FormError from 'shared/forms/FormError'
import { useRedirectBack } from 'shared/utils/hooks'
import { useSnackbar } from 'shared/ui/Snackbar/useSnackbar'
import Input from 'shared/forms/Input'
import AuthForm from './AuthForm'

export const afterSuccess =
  ({ redirectBack }) =>
  () => {
    redirectBack()
  }

const SignIn = ({ location }) => {
  const { search } = location
  const { snackbar } = useSnackbar()
  const redirectBack = useRedirectBack()

  const [{ signingIn, error, emailProps, passwordProps, formProps }] =
    useSignIn({
      afterSuccess: afterSuccess({ snackbar, redirectBack }),
    })

  useEffect(() => {
    if (search && search !== '?redirect_to=/') {
      snackbar({
        message: 'You are not authorized',
        type: 'error',
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AuthForm
      title="Login"
      form={
        <form {...formProps} className="w-full">
          <SignInForm
            emailProps={emailProps}
            passwordProps={passwordProps}
            error={error}
            signingIn={signingIn}
          />
        </form>
      }
    />
  )
}

const SignInForm = ({ emailProps, passwordProps, error }) => (
  <div className="flex flex-col items-center">
    <div className="flex w-full flex-col gap-4">
      <Input {...emailProps} autocomplete="off" label="Email" />
      <Input {...passwordProps} label="Password" />
    </div>
    <FormError>{error}</FormError>
    <button className="bt bt-contained bt-primary mt-4" type="submit">
      Sign in
    </button>
  </div>
)

export default SignIn
