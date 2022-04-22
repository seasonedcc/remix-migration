import { PrismaClient } from '@prisma/client'
import { getOrSetGlobal } from '~/framework/server/globals'

function db():
  | PrismaClient
  | Omit<
      PrismaClient,
      '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'
    > {
  const db = getOrSetGlobal('db', () => {
    const db = new PrismaClient()
    db.$connect()
    return db
  })

  return db
}

const sql: InstanceType<typeof PrismaClient>['$queryRaw'] = (...args) =>
  db().$queryRaw(...args)

export { db, sql }
