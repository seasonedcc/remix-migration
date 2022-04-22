/* eslint-disable */
import { PrismaClient } from '@prisma/client'
import { installGlobals } from '@remix-run/node'

declare global {
  var db: PrismaClient
  var help: () => void
}
/* eslint-enable */

installGlobals()
global.db = new PrismaClient()
global.help = () =>
  console.log(`
Some helpers have been installed in the terminal globals:
help()  => Display this message.
db      => Use a database connection using PrismaClient.
fetch() => Fetch polyfill.
`)

help()
