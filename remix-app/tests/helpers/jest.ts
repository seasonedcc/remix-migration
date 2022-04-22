import { parse } from 'superjson'

type ExpectResponse = (response: Response) => jest.Matchers<void, Response> & {
  toRedirect: (url: string) => void
  toHaveStatus: (status: number) => void
  toHaveHeader: (key: string, value?: string) => void
  toHaveTextBody: (body: string) => void
  toHaveJsonBody: (body: unknown) => void
}

const expectResponse: ExpectResponse = (response: Response) => {
  expect(response).toBeInstanceOf(Response)
  return {
    ...expect(response),
    toRedirect: (url) => expect(response.headers.get('Location')).toMatch(url),
    toHaveStatus: (status) => expect(response.status).toEqual(status),
    toHaveHeader: (key, value) =>
      value
        ? expect(response.headers.get(key)).toMatch(value)
        : expect(response.headers.get(key)).not.toBeNull(),
    toHaveTextBody: async (body) => expect(await response.text()).toEqual(body),
    toHaveJsonBody: async (body) =>
      expect(parse(await response.text())).toEqual(body),
  } as ReturnType<ExpectResponse>
}

type ExpectSideEffect = (fn: () => Promise<unknown>) => jest.Matchers<
  void,
  Function
> & {
  toChange: (expression: () => Promise<unknown>) => Promise<void>
}

const expectSideEffect: ExpectSideEffect = (fn) => {
  expect(fn).toBeInstanceOf(Function)
  return {
    ...expect(fn),
    toChange: async (expression) => {
      const valueBefore = await expression()
      await fn()
      const valueAfter = await expression()
      expect(valueBefore).not.toEqual(valueAfter)
    },
  } as ReturnType<ExpectSideEffect>
}

export { expectResponse, expectSideEffect }
