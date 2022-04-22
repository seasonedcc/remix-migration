import * as z from 'zod'

const environmentSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  DATABASE_URL: z.string().nonempty(),
  SESSION_SECRET: z.string().nonempty(),
  REDIS_URL: z.string().nonempty().default('redis://localhost:6379'),
  APP_URL: z.string().nonempty().default('http://localhost:3001'),
  SPA_APP_URL: z.string().nonempty().default('http://localhost:3000'),
  PORT: z.preprocess((v) => (isNaN(Number(v)) ? 3001 : Number(v)), z.number()),
})

const environment = () => environmentSchema.parse(process.env)

export { environment }
