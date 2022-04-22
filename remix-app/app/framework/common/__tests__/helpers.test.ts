import { cx, safeJoin } from '~/framework/common/helpers'

describe('cx', () => {
  it('returns empty string when input is undefined', async () => {
    expect(cx()).toEqual('')
  })

  it('returns truish term', async () => {
    expect(cx('someClass')).toEqual('someClass')
  })

  it('joins terms', async () => {
    expect(cx('someClass', 'anotherClass')).toEqual('someClass anotherClass')
  })

  it('ommits falsish terms', async () => {
    expect(cx(false && 'someClass', 'anotherClass')).toEqual('anotherClass')
  })
})

describe('safeJoin', () => {
  it('joins strings with a given separator', () => {
    expect(safeJoin('.', ['a', 'b', 'c'])).toEqual('a.b.c')
  })

  it('filters nullish values before joining', () => {
    expect(safeJoin(' ', ['a', null, 'b', undefined, '', 'c'])).toEqual('a b c')
  })

  it('accepts many arguments to be flattened and joined', () => {
    expect(safeJoin(' ', ['a', 'b'], undefined, 'c', null, [['d']])).toEqual(
      'a b c d',
    )
  })
})
