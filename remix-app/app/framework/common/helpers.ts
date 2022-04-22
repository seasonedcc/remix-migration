import {
  compose,
  join,
  reject,
  isBoolean,
  isNil,
  flatten,
  isEmpty,
} from 'lodash/fp'

const cx = (...args: unknown[]) =>
  compose(join(' '), reject(isBoolean), reject(isNil), flatten)(args)

const safeJoin = (delimiter = '', ...args: unknown[]) => {
  return compose(join(delimiter), reject(isEmpty), reject(isNil), flatten)(args)
}

const sleep = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time))
}

export { cx, safeJoin, sleep }
