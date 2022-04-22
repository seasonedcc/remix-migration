import type { SvgIconProps } from '@material-ui/core'
import type { ComponentType } from 'react'

export type Dispatcher = (settings: SnackbarSettings) => void

type Types = 'info' | 'warning' | 'success' | 'error'

export type Button = {
  title: string
  variant?: 'text' | 'outlined' | 'contained'
  onClick: () => void
}

export type SnackbarSettings = {
  type?: Types

  title?: string
  message: string

  noIcon?: boolean
  customIcon?: ComponentType<SvgIconProps>

  timeout?: number
  afterTimeout?: () => void
  runAfterTimeoutOnClose?: boolean

  buttons?: Button[]
}
