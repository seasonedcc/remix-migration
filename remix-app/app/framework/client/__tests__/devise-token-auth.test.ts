/**
 * @jest-environment jsdom
 */
import { testDeviseUser } from 'tests/helpers'
import { create, destroy } from '../devise-token-auth'

describe('create', () => {
  beforeEach(() => create(testDeviseUser))

  it('creates the deviseUser under authCredentials key', () => {
    expect(window.localStorage.getItem('authCredentials')).toEqual(
      JSON.stringify(testDeviseUser),
    )
  })
})

describe('destroy', () => {
  beforeEach(() => {
    create(testDeviseUser)
    destroy()
  })

  it('destroys the deviseUser under authCredentials key', () => {
    expect(window.localStorage.getItem('authCredentials')).toBeNull()
  })
})
