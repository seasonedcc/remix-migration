import 'tsconfig-paths/register'
import { createTestUser } from 'tests/helpers'

export default async () => {
  try {
    await createTestUser()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}
