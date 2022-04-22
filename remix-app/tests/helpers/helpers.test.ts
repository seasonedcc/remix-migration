import { testTransaction } from 'tests/helpers'
import { db } from '~/framework/index.server'

describe('testTransaction', () => {
  beforeAll(async () => {
    await db().$executeRaw`DROP TABLE IF EXISTS  a_test_table `
    await db().$executeRaw`CREATE TABLE a_test_table (id text primary key)`
  })

  afterAll(async () => {
    await db().$executeRaw`DROP TABLE IF EXISTS  a_test_table `
  })

  it('rolls back after transaction', async () => {
    await testTransaction(async () => {
      await db()
        .$executeRaw`INSERT INTO a_test_table VALUES ('one line of test')`
    })()

    expect(await db().$queryRaw`SELECT count(*) FROM a_test_table`).toEqual([
      { count: 0 },
    ])
  })

  it('rolls back in case of exception', async () => {
    try {
      await testTransaction(async () => {
        await db()
          .$executeRaw`INSERT INTO a_test_table VALUES ('one line of test')`
        throw new Error('Some Error')
      })()
    } catch (error) {
    } finally {
      expect(await db().$queryRaw`SELECT count(*) FROM a_test_table`).toEqual([
        { count: 0 },
      ])
    }
  })

  it('rethrows in case of exception', async () => {
    let errorThrown = null
    try {
      await testTransaction(async () => {
        await db()
          .$executeRaw`INSERT INTO a_test_table VALUES ('one line of test')`
        throw new Error('Some Test Error')
      })()
    } catch (error) {
      errorThrown = error
    }
    expect(errorThrown).toEqual(new Error('Some Test Error'))
  })
})
