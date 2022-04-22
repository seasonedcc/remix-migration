import { compose, flatten, isBoolean, isNil, join, reject } from 'lodash/fp'

export const cx = (...args: unknown[]) =>
  compose(join(' '), reject(isBoolean), reject(isNil), flatten)(args)
