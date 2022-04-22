import React, { useState } from 'react'
import Snackbar from './Snackbar'
import type { Dispatcher, SnackbarSettings } from './types'

const defaultDispatcher: Dispatcher = () => {}

export const Context = React.createContext(defaultDispatcher)

type Props = {
  children: React.ReactNode
}

export default function SnackbarProvider({ children }: Props) {
  const [snackbarSettings, setSnackbarSettings] =
    useState<SnackbarSettings | null>(null)

  const [open, setOpen] = useState(false)

  const dispatch: Dispatcher = (settings) => {
    setSnackbarSettings(settings)
    setOpen(true)
  }

  const cleanSettings = () => setSnackbarSettings(null)
  const closeSnackbar = () => setOpen(false)

  return (
    <Context.Provider value={dispatch}>
      {snackbarSettings && snackbarSettings.message && (
        <Snackbar
          settings={snackbarSettings}
          open={open}
          closeSnackbar={closeSnackbar}
          cleanSettings={cleanSettings}
        />
      )}
      {children}
    </Context.Provider>
  )
}
