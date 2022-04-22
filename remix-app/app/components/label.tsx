import { cx } from '~/framework/common'

type Props = Omit<JSX.IntrinsicElements['label'], 'htmlFor'> & {
  htmlFor: string
}
function Label({ children, className, ...props }: Props) {
  return children ? (
    <label
      className={cx(
        'mb-1 px-1 text-lg text-current text-neutral-500',
        className,
      )}
      {...props}
    >
      {children}
      {props['aria-required'] && props['aria-required'] !== 'false' ? ' *' : ''}
    </label>
  ) : null
}

export default Label
