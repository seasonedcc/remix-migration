import type { Result } from 'remix-domains'
import { json } from '../common'

const notFound = (body?: BodyInit) =>
  new Response(body ?? 'Not found', {
    status: 404,
  })

const badParameters = (body?: BodyInit) =>
  new Response(body ?? 'Bad parameters', {
    status: 422,
  })

const actionResponse = <T extends Result<X>, X>(result: T) =>
  json(result, { status: result.success ? 200 : 422 })

export { actionResponse, notFound, badParameters }
