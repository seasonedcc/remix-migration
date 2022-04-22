import * as z from 'zod'
import { makeDomainFunction } from 'remix-domains'
import { db, sql } from '~/framework/index.server'
import type { DeviseUser } from '~/framework/common/types'
import { deviseUserSchema } from '~/framework/common/types'

const userParser = z.object({
  email: z.string().email().nonempty(),
})

type User = z.infer<typeof userParser>

const domainWithDeviseUser = makeDomainFunction(deviseUserSchema)

const userFromDevise = domainWithDeviseUser(async (deviseUser) =>
  db().users.findUnique({
    select: { email: true },
    where: { email: deviseUser.uid },
    rejectOnNotFound: true,
  }),
)
const login = makeDomainFunction(
  z.object({
    email: z
      .string()
      .nonempty({ message: 'You need to type your email' })
      .email({ message: 'Invalid Email address' }),
    password: z
      .string()
      .min(6, { message: 'Your password should be longer than 6 characters' }),
  }),
)(async ({ email, password }) => {
  const [loginUser]: DeviseUser[] = await sql`
    WITH seed_data AS (
      SELECT
        gen_random_uuid() AS client,
        gen_random_uuid() AS token,
        extract(epoch from (current_timestamp + '2 weeks'::interval))::int as expiry
    ),
    update_cmd AS (
      UPDATE users
      SET
        tokens =
            (coalesce(tokens, '{}')#>>'{}')::jsonb
            || jsonb_build_object(
                seed_data.client,
                jsonb_build_object(
                    'expiry',
                    seed_data.expiry,
                    'token',
                    crypt(seed_data.token::text, gen_salt('bf', 11))
                )
            )
      FROM seed_data
      WHERE
        email = ${email} AND encrypted_password = crypt(${password}, substring(encrypted_password, 1, 29))
      RETURNING
        email
    )
    SELECT email AS uid, client, token as "accessToken", expiry, 'Bearer' as "tokenType" FROM update_cmd, seed_data;
    `
  if (!loginUser)
    throw new Error('Invalid login credentials. Please try again.')
  return loginUser
})

export { login, userFromDevise, userParser }
export type { User }
