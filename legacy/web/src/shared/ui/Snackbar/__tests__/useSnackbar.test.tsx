import { renderHook } from '@testing-library/react-hooks'
import { useSnackbar } from '../useSnackbar'

describe('useSnackbar hook', () => {
  it('Return the right actions', () => {
    const { result } = renderHook(() => useSnackbar())
    expect(result.current).toHaveProperty('snackbar')
  })
})
