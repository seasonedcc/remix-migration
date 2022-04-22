import { render, screen } from 'test-utils'
import SnackbarProvider from '../SnackbarProvider'

describe('Snackbar Provider', () => {
  it('Renders properly', () => {
    render(<SnackbarProvider>Children</SnackbarProvider>)

    expect(screen.getByText('Children')).toBeInTheDocument()
  })
})
