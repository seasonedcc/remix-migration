import { cx } from '~/framework/common'

type Props = JSX.IntrinsicElements['small'] & {
  isError?: boolean
}
function InputHint({ isError, className, children, ...props }: Props) {
  return children ? (
    <small
      className={cx(
        'mt-1 px-3 text-xs font-semibold',
        className,
        isError ? 'text-red-600' : 'text-neutral-600',
      )}
      role={isError ? 'alert' : undefined}
      {...props}
    >
      {children}
    </small>
  ) : null
}

export default InputHint
