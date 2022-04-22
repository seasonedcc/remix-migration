import { useContext, useMemo } from 'react'
import { Context } from './SnackbarProvider'
import type { Dispatcher } from './types'

export const useSnackbar = () => {
  const dispatch: Dispatcher = useContext(Context)
  const actions = useMemo(
    () => ({
      snackbar: dispatch,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )
  return actions
}
