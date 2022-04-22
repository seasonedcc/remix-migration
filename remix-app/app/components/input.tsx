import * as React from 'react'
import { cx } from '~/framework/common'
import InputHint from './input-hint'
import Label from './label'
import { useFormContext } from '~/framework/common'
import { errorMessagesFor } from 'remix-domains'

type Props = Omit<JSX.IntrinsicElements['input'], 'name'> & {
  name: string
  label?: string
  hint?: string
}

function Input(
  { name, type = 'text', id = name, hint, label, className, ...props }: Props,
  ref: React.Ref<HTMLInputElement>,
) {
  const { errors } = useFormContext()
  const [error] = errorMessagesFor(errors, name)
  const hasErrors = Boolean(error)

  const hintId = `input-${id}-hint`
  return (
    <div className="flex flex-col text-left focus-within:text-blush">
      <Label aria-required={props.required} htmlFor={id}>
        {label}
      </Label>
      <input
        ref={ref}
        className={cx(
          'rounded border-gray-light px-3 py-4 transition-all focus:border-blush focus:ring-blush',
          hasErrors && '!border-red-dark !text-red-dark',
          className,
        )}
        type={type}
        aria-invalid={hasErrors ? 'true' : 'false'}
        aria-describedby={hasErrors ? hintId : undefined}
        {...props}
        name={name}
        id={id}
      />
      <InputHint id={hintId} isError={hasErrors}>
        {error ?? hint}
      </InputHint>
    </div>
  )
}

export type { Props as InputProps }
export default React.forwardRef(Input)
