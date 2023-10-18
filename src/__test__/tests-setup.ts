import { LocalStorageMock } from './local-storage-mock'
import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

global.localStorage = new LocalStorageMock()

afterEach(() => {
  cleanup()
})
