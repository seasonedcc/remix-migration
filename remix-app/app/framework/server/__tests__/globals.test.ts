import { getOrSetGlobal } from '~/framework/server/globals'
import type { PrismaClient } from '@prisma/client'

describe('getOrSetGlobal', () => {
  const originalGlobals = { ...global.Seasoned }
  const mockDb = 'mockDb' as unknown as PrismaClient

  beforeEach(() => {
    global.Seasoned = { globals: {} }
  })

  afterAll(() => {
    global.Seasoned = originalGlobals
  })

  it('sets a global variable and return its value', async () => {
    expect(getOrSetGlobal('db', mockDb)).toBe(mockDb)
  })

  it('returns the original value if the variable is already set', async () => {
    getOrSetGlobal('db', mockDb)
    const newMockDmockDb = 'newMockDmockDb' as unknown as PrismaClient

    expect(getOrSetGlobal('db', newMockDmockDb)).toBe(mockDb)
  })
})
