export class LocalStorageMock {
  key = (idx: number): string => {
    const values = Object.values(this.store)
    return values[idx]
  }

  length: number

  store: { [k: string]: string }

  constructor() {
    this.store = {}
    this.length = 0
  }

  clear() {
    this.store = {}
  }

  getItem(key: string) {
    return this.store[key] || null
  }

  removeItem(key: string) {
    delete this.store[key]
  }

  setItem(key: string, value: string) {
    this.store[key] = String(value)
  }
}
