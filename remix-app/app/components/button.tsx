import { cx } from '~/framework/common'

type Props = JSX.IntrinsicElements['button'] & {
  variant?: 'primary' | 'secondary' | 'success' | 'error'
  size?: 'sm' | 'md' | 'lg'
  contained?: boolean
  outlined?: boolean
}
function Button({
  contained,
  outlined,
  variant,
  size = 'md',
  className,
  children,
  ...props
}: Props) {
  return (
    <button
      type="button"
      className={cx(
        'bt',
        className,
        size === 'sm' && 'bt-sm',
        size === 'lg' && 'bt-lg',
        contained && 'bt-contained',
        outlined && 'bt-outlined',
        variant === 'primary' && 'bt-primary',
        variant === 'secondary' && 'bt-secondary',
        variant === 'success' && 'bt-success',
        variant === 'error' && 'bt-error',
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export type { Props as ButtonProps }
export default Button
