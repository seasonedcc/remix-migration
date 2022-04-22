import React, { useEffect } from 'react'
import { Button, Snackbar as MuiSnackbar } from '@material-ui/core'
import { Countdown } from '@seasonedsoftware/utils'

import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import CloseIcon from '@material-ui/icons/Close'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import WarningIcon from '@material-ui/icons/Warning'
import IconButton from '@material-ui/core/IconButton'

import { cx } from 'shared/helpers'
import type { SnackbarSettings } from './types'

type Props = {
  settings: SnackbarSettings
  open: boolean
  cleanSettings: () => void
  closeSnackbar: () => void
}

const styles = {
  error: 'bg-red',
  success: 'bg-green',
  warning: 'bg-yellow',
  info: 'bg-blue',
}

const icons = {
  error: ErrorIcon,
  info: InfoIcon,
  success: CheckCircleIcon,
  warning: WarningIcon,
}

const addEventListener = () =>
  window.addEventListener('beforeunload', avoidWindowClosing)
const removeEventListener = () =>
  window.removeEventListener('beforeunload', avoidWindowClosing)

const avoidWindowClosing = (e: BeforeUnloadEvent) => {
  const confirmationMessage = 'Ainda há dados não salvos'

  ;(e || window.event).returnValue = confirmationMessage
  return confirmationMessage
}

export default function Snackbar({
  settings,
  open,
  cleanSettings,
  closeSnackbar,
}: Props) {
  const {
    type = 'info',
    timeout = 4,
    title,
    message,
    noIcon = false,
    customIcon,
    buttons = [],
    afterTimeout,
    runAfterTimeoutOnClose,
  } = settings

  const Icon = icons[type]
  const style = styles[type]

  const onFinish = () => {
    if (timeout > 0) {
      if (afterTimeout) {
        afterTimeout()
      }
      return cleanSettings()
    }
    return null
  }

  const handleClose = () => {
    if (runAfterTimeoutOnClose && afterTimeout) {
      afterTimeout()
    }
    removeEventListener()
    closeSnackbar()
  }

  useEffect(() => {
    if (afterTimeout) {
      addEventListener()
    }
    return () => {
      removeEventListener()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <MuiSnackbar
      anchorOrigin={{
        horizontal: 'right',
        vertical: 'bottom',
      }}
      open={open}
      onClose={cleanSettings}
    >
      <div
        className={cx(
          style,
          'flex min-w-[270px] flex-wrap items-center justify-between rounded-md py-2 px-4 text-white',
        )}
      >
        <Countdown time={timeout} onFinish={onFinish} active />

        <div className="flex items-center">
          {!noIcon &&
            (customIcon || (
              <Icon
                data-testid={`icon-${type}`}
                className="mr-2 text-xl opacity-90"
              />
            ))}

          <div>
            {title && <h5 className="text-base font-bold">{title}</h5>}
            <p className="text-xs">{message}</p>
          </div>
        </div>

        <div>
          {buttons.map(
            ({ onClick, title: buttonTitle, variant = 'text' }, idx) => (
              <Button
                key={buttonTitle + idx}
                className="!text-white"
                variant={variant}
                onClick={() => {
                  onClick()
                  removeEventListener()
                  cleanSettings()
                }}
              >
                {buttonTitle}
              </Button>
            ),
          )}

          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon className="text-xl" />
          </IconButton>
        </div>
      </div>
    </MuiSnackbar>
  )
}
