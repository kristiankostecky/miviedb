import { describe, expect, it } from 'vitest'
import { getSearchParams, parseUrl } from './url'

describe('getSearchParams', () => {
  it('returns the search params', () => {
    expect(
      getSearchParams(new URLSearchParams('?q=hello&page=2'), [
        'q',
        'page',
      ] as const)
    ).toStrictEqual({ q: 'hello', page: '2' })
  })
  it('returns null for missing search params', () => {
    expect(
      getSearchParams(new URLSearchParams('?q=hello'), ['q', 'page'] as const)
    ).toStrictEqual({ q: 'hello', page: null })
  })
})

describe('parseUrl', () => {
  it('returns the url if it is valid', () => {
    expect(parseUrl('https://example.com', 'https://fallback.com')).toBe(
      'https://example.com'
    )
  })
  it('returns the fallback url if it is invalid', () => {
    expect(parseUrl('invalid url', 'https://fallback.com')).toBe(
      'https://fallback.com'
    )
  })
})
