// Object utilities, could be replaced by lodash or ramda

type Predicate<TObject extends Record<string, unknown>> = (
  value?: TObject[keyof TObject],
  key?: keyof TObject
) => boolean

export const pickBy = <
  TObject extends Record<string, unknown>,
  TPredicate extends Predicate<TObject> | undefined = undefined,
>(
  object: TObject,
  predicate?: Predicate<TObject> | TPredicate
) => {
  return Object.fromEntries(
    Object.entries(object).filter(([key, value]) => {
      if (predicate) {
        return predicate(value as TObject[keyof TObject], key)
      }
      return Boolean(value)
    })
  ) as TPredicate extends undefined
    ? {
        [K in keyof TObject as TObject[K] extends null | undefined
          ? never
          : K]: TObject[K]
      }
    : Partial<TObject>
}
