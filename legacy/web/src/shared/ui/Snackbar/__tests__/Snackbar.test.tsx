import type { ComponentType } from 'react';
import React from 'react'
import type { SvgIconProps } from '@material-ui/core'
import userEvent from '@testing-library/user-event'
import { render, screen, waitFor } from 'test-utils'
import Snackbar from '../Snackbar'

describe('Snackbar component', () => {
  it('Renders nothing when open is false', () => {
    render(
      <Snackbar
        settings={{ message: 'snackbar message' }}
        open={false}
        cleanSettings={jest.fn()}
        closeSnackbar={jest.fn()}
      />,
    )

    expect(screen.queryByText('snackbar message')).not.toBeInTheDocument()
  })

  it('Renders properly when open is true', () => {
    render(
      <Snackbar
        settings={{ message: 'snackbar message' }}
        open
        cleanSettings={jest.fn()}
        closeSnackbar={jest.fn()}
      />,
    )

    expect(screen.getByText('snackbar message')).toBeInTheDocument()
    expect(screen.getByTestId('icon-info')).toBeInTheDocument()
  })

  it('Renders title and type correctly', () => {
    render(
      <Snackbar
        settings={{
          title: 'snackbar title',
          message: 'snackbar message',
          type: 'warning',
        }}
        open
        cleanSettings={jest.fn()}
        closeSnackbar={jest.fn()}
      />,
    )

    expect(screen.getByText('snackbar message')).toBeInTheDocument()
    expect(screen.getByText('snackbar title')).toBeInTheDocument()
    expect(screen.getByTestId('icon-warning')).toBeInTheDocument()
  })

  it('Renders custom icon', () => {
    render(
      <Snackbar
        settings={{
          message: 'snackbar message',
          customIcon: (
            <div>Custom Icon</div>
          ) as unknown as ComponentType<SvgIconProps>,
        }}
        open
        cleanSettings={jest.fn()}
        closeSnackbar={jest.fn()}
      />,
    )

    expect(screen.getByText('snackbar message')).toBeInTheDocument()
    expect(screen.getByText('Custom Icon')).toBeInTheDocument()
  })

  it('Renders buttons correctly', () => {
    const buttonFunction = jest.fn()
    const closeSnackbar = jest.fn()
    const cleanSettings = jest.fn()

    render(
      <Snackbar
        settings={{
          message: 'snackbar message',
          buttons: [
            {
              title: 'button title',
              onClick: buttonFunction,
            },
          ],
        }}
        open
        cleanSettings={cleanSettings}
        closeSnackbar={closeSnackbar}
      />,
    )

    const button = screen.getByRole('button', { name: 'button title' })

    expect(button).toBeInTheDocument()
    userEvent.click(button)
    expect(buttonFunction).toHaveBeenCalled()
    expect(cleanSettings).toHaveBeenCalled()

    userEvent.click(screen.getByRole('button', { name: 'Close' }))

    expect(closeSnackbar).toHaveBeenCalled()
  })

  it('Runs functions after timeout', async () => {
    const cleanSettings = jest.fn()
    const afterTimeout = jest.fn()

    render(
      <Snackbar
        settings={{
          message: 'snackbar message',
          afterTimeout,
          timeout: 4,
        }}
        open
        cleanSettings={cleanSettings}
        closeSnackbar={jest.fn()}
      />,
    )

    expect(cleanSettings).not.toHaveBeenCalled()
    expect(afterTimeout).not.toHaveBeenCalled()

    await waitFor(
      () => {
        expect(cleanSettings).toHaveBeenCalled()
        expect(afterTimeout).toHaveBeenCalled()
      },
      { timeout: 4500 },
    )
  })

  it('Does NOT run functions after timeout when button is clicked', async () => {
    const cleanSettings = jest.fn()
    const afterTimeout = jest.fn()
    const abort = jest.fn()

    render(
      <Snackbar
        settings={{
          message: 'snackbar message',
          afterTimeout,
          timeout: 4,
          buttons: [{ onClick: abort, title: 'abort!' }],
        }}
        open
        cleanSettings={cleanSettings}
        closeSnackbar={jest.fn()}
      />,
    )

    userEvent.click(screen.getByRole('button', { name: 'abort!' }))

    expect(abort).toHaveBeenCalled()

    await waitFor(
      () => {
        expect(afterTimeout).not.toHaveBeenCalled()
      },
      { timeout: 4500 },
    )
  })
})
