import type { PrismaClient } from '@prisma/client'
import type { SessionStorage } from '@remix-run/node'
import type Bull from 'bull'

type Globals = {
  db?:
    | PrismaClient
    | Omit<
        PrismaClient,
        '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'
      >
  sessionStorage?: SessionStorage
  queues?: Record<string, Bull.Queue<any>>
}

/* eslint-disable */
declare global {
  var testWithMutation: jest.It
  namespace Seasoned {
    var globals: Globals
  }
}
/* eslint-enable */

function getOrSetGlobal<T extends keyof Globals>(
  key: T,
  value: NonNullable<Globals[T]> | (() => NonNullable<Globals[T]>),
): NonNullable<Globals[T]> {
  if (!global.Seasoned) global.Seasoned = { globals: {} }
  /* eslint-disable */
  if (global.Seasoned.globals[key]) return global.Seasoned.globals[key]!
  /* eslint-enable */
  const initialValue = typeof value === 'function' ? value() : value
  global.Seasoned.globals[key] = initialValue
  return initialValue
}

function mutateGlobal<T extends keyof Globals>(
  key: T,
  value:
    | NonNullable<Globals[T]>
    | ((previousValue: Globals[T]) => NonNullable<Globals[T]>),
): NonNullable<Globals[T]> {
  if (!global.Seasoned) global.Seasoned = { globals: {} }

  /* eslint-enable */
  const newValue =
    typeof value === 'function' ? value(global.Seasoned.globals[key]) : value
  global.Seasoned.globals[key] = newValue
  return newValue
}

export { getOrSetGlobal, mutateGlobal }
