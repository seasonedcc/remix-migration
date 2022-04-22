/**
 * @jest-environment jsdom
 */

import * as React from 'react'
import { render, cleanup } from '@testing-library/react'
import { useFocusOnFormError } from '../form'
import type { SchemaError } from 'remix-domains'

const Form = ({ errors }: { errors: SchemaError[] }) => {
  const formRef = React.useRef<HTMLFormElement>(null)
  useFocusOnFormError(formRef, errors)
  return (
    <form ref={formRef}>
      <input type="text" name="name" aria-label="Name" />
      <input type="text" name="company" aria-label="Company" />
    </form>
  )
}

afterEach(() => cleanup())
describe('useFocusOnFormError', () => {
  it('should focus on the first element with error', () => {
    const formErrors = [{ path: ['company'] }] as SchemaError[]
    const { getByRole } = render(<Form errors={formErrors} />)
    expect(getByRole('textbox', { name: /company/i })).toEqual(
      document.activeElement,
    )
  })

  it('should focus on the first element with error', () => {
    const formErrors = [{ path: ['foo'] }] as SchemaError[]
    const { getAllByRole } = render(<Form errors={formErrors} />)
    expect(getAllByRole('textbox')).not.toContain(document.activeElement)
  })
})
