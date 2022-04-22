import { notFound } from '../responses'

describe('notFound', () => {
  it('uses a 404 status', () => {
    const response = notFound()

    expect(response.status).toEqual(404)
  })

  it('can use a custom body', async () => {
    const response = notFound('just a custom body')

    expect(await response.text()).toEqual('just a custom body')
  })
})
