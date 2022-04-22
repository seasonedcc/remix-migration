import SignIn from 'shared/auth/SignIn'
import Home from 'Home'
import Faq from 'Faq'

import type { Route } from 'types'

const login: Route = {
  component: SignIn,
  path: '/login',
  pageTitle: 'Login',
  authorize: false,
}
const home: Route = {
  component: Home,
  path: '/',
  pageTitle: 'Home',
  authorize: true,
}
const faq: Route = {
  component: Faq,
  path: '/faq',
  pageTitle: 'Home',
  authorize: true,
}

export default [home, faq, login]
