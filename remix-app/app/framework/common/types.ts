import * as z from 'zod'

const deviseUserSchema = z.object(
  {
    uid: z.string().nonempty().email(),
    client: z.string().nonempty(),
    accessToken: z.string().nonempty(),
    expiry: z.number(),
    tokenType: z.enum(['Bearer']),
  },
  { invalid_type_error: 'User not logged in' },
)

type DeviseUser = z.infer<typeof deviseUserSchema>

export { deviseUserSchema }
export type { DeviseUser }
