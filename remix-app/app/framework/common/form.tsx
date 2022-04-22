import * as React from 'react'
import type { FormProps } from '@remix-run/react'
import { Form as RemixForm } from '@remix-run/react'
import type { SchemaError } from 'remix-domains'

type FormContext = {
  errors: SchemaError[]
}
type FormElement =
  | HTMLFieldSetElement
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement
  | HTMLButtonElement
function useFocusOnFormError(
  formRef: React.RefObject<HTMLFormElement>,
  errors: SchemaError[] = [],
) {
  React.useEffect(() => {
    const [error] = errors
    if (error && formRef.current) {
      const el = Array.from(
        formRef.current.elements as Iterable<FormElement>,
      ).find((el) => el.name === error.path[0])
      if (el) el.focus()
    }
  }, [errors, formRef])

  return formRef
}

const Context = React.createContext({ errors: [] } as FormContext)
function useFormContext() {
  return React.useContext(Context) ?? { errors: [] }
}

function useCombinedRefs<T extends object>(
  ...refs: Array<
    React.MutableRefObject<T> | React.RefObject<T> | React.ForwardedRef<T>
  >
) {
  const targetRef = React.useRef<T>(null)

  React.useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) return

      if (typeof ref === 'function') {
        ref(targetRef.current)
      } else if (ref) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ref.current = targetRef.current
      }
    })
  }, [refs])

  return targetRef
}

type Props = FormProps & {
  errors?: SchemaError[]
}
const Form = React.forwardRef<HTMLFormElement, Props>(
  ({ errors = [], ...props }, forwardedRef) => {
    const innerRef = React.useRef<HTMLFormElement>(null)

    useFocusOnFormError(innerRef, errors)

    const ref = useCombinedRefs(innerRef, forwardedRef)
    return (
      <Context.Provider value={{ errors }}>
        <RemixForm {...props} ref={ref} />
      </Context.Provider>
    )
  },
)

Form.displayName = 'Framework.Form'

export { Form, useFormContext, useFocusOnFormError }
