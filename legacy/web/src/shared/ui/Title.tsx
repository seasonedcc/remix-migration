import * as React from 'react'
import { Typography } from '@material-ui/core'

type Props = {
  children: React.ReactNode
  textAlign?: 'left' | 'center' | 'right'
  variant?: 'h3' | 'h4' | 'h5' | 'h6'
  role?: string
  color?:
    | 'inherit'
    | 'initial'
    | 'primary'
    | 'secondary'
    | 'textPrimary'
    | 'textSecondary'
    | 'error'
}

const Title = ({
  children,
  variant = 'h3',
  role = undefined,
  color = undefined,
  ...props
}: Props) => (
  <div className="mb-2 sm:mb-4" {...props}>
    <Typography
      variant={variant}
      className="font-bold"
      role={role}
      color={color}
    >
      {children}
    </Typography>
  </div>
)

export default Title
