import { pickBy } from './object'
import { describe, expect, it } from 'vitest'

describe('pickBy', () => {
  it('filters out falsy values', () => {
    expect(
      pickBy({ a: '', b: undefined, c: null, d: 'hello', e: false, f: 0 })
    ).toStrictEqual({
      d: 'hello',
    })
  })
  it('pick out values that match the predicate', () => {
    expect(
      pickBy(
        { a: '', b: undefined, c: null, d: 'hello' },
        (value) => value === 'hello'
      )
    ).toStrictEqual({ d: 'hello' })
  })
})
