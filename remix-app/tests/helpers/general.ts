import { PrismaClient } from '@prisma/client'
import type { DeviseUser } from '~/framework/common'
import { db } from '~/framework/index.server'

const makePost: (entries: Array<[string, string]>, url?: string) => Request = (
  entries,
  url = 'http://localhost/test',
) =>
  new Request(url, {
    method: 'POST',
    body: new URLSearchParams(entries).toString(),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })

const makeGet: (entries: Array<[string, string]>, url?: string) => Request = (
  entries,
  url = 'http://localhost/test',
) =>
  new Request(url + '?' + new URLSearchParams(entries).toString(), {
    method: 'GET',
  })

const makeParams = (request: Request, params: Record<string, string> = {}) => ({
  request,
  context: null,
  params,
})

const testDeviseUser: DeviseUser = {
  uid: 'some-test-user@bar.com',
  accessToken: 'some token',
  client: 'random client id',
  expiry: 0,
  tokenType: 'Bearer',
}

const createTestUserBase = (email: string) => async () => {
  const date = new Date()

  await db().users.upsert({
    where: { email },
    update: {},
    create: {
      uid: email,
      email,
      encrypted_password:
        '$2a$12$PAfT7g0zy/9WDVQxLiMRq.ZpcLIW/n8fFgho0Lq6SgHRsYtFH1/Qq',
      created_at: date,
      updated_at: date,
    },
  })
}

const createTestUser = createTestUserBase(testDeviseUser.uid)

const deleteUserBase = (email: string) => async () => {
  await db().users.delete({ where: { email } })
}

const deleteTestUser = deleteUserBase(testDeviseUser.uid)

const testTransaction = (fnWithinTransaction: () => Promise<unknown>) => {
  const oldDb = db()
  const connection = new PrismaClient()
  const test = async () => {
    await connection.$transaction(async (prisma) => {
      global.Seasoned.globals.db = prisma

      try {
        await prisma.$executeRaw`SET timezone TO 'UTC'`
        await fnWithinTransaction()
      } finally {
        await prisma.$executeRaw`ROLLBACK`
        global.Seasoned.globals.db = oldDb
      }
    })
    connection.$disconnect()
  }

  return test
}

const flushPromises = () => {
  return new Promise(jest.requireActual('timers').setImmediate)
}
export {
  makeParams,
  makeGet,
  makePost,
  createTestUser,
  createTestUserBase,
  testTransaction,
  testDeviseUser,
  deleteTestUser,
  flushPromises,
}
