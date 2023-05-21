import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup } from '@nuxt/test-utils'
import { renderPage } from './utils'

describe('basic hydration', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
    dev: true,
    browser: true,
    server: true
  })

  it('renders the index page and expect to see a mismatch', async () => {
    const { page, consoleLogs } = await renderPage('/')
    expect(consoleLogs.find(w => w.text.includes('Hydration completed but contains mismatches'))).toBeTruthy()
    expect(await page.locator('#nuxt-hydration-warn').all()).toHaveLength(1)
  })

  it('shouldn\'t warn if there is no hydration issue', async () => {
    const { page, consoleLogs } = await renderPage('/hydration-ok')
    expect(consoleLogs.find(w => w.text.includes('Hydration completed but contains mismatches'))).toBeFalsy()
    expect(await page.locator('#nuxt-hydration-warn').all()).toHaveLength(0)
  })
})
