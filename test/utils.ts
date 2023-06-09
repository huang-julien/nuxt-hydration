import { getBrowser, url, useTestContext } from '@nuxt/test-utils'

export async function renderPage (path = '/') {
  const ctx = useTestContext()
  if (!ctx.options.browser) {
    throw new Error('`renderPage` require `options.browser` to be set')
  }

  const browser = await getBrowser()
  const page = await browser.newPage({})
  const pageErrors: Error[] = []
  const consoleLogs: { type: string, text: string }[] = []
  const getWarnings = () => {
    return consoleLogs.filter(c => c.type === 'warning')
  }

  page.on('console', (message) => {
    consoleLogs.push({
      type: message.type(),
      text: message.text()
    })
  })
  page.on('pageerror', (err) => {
    pageErrors.push(err)
  })

  if (path) {
    await page.goto(url(path), { waitUntil: 'networkidle' })
  }

  return {
    page,
    pageErrors,
    consoleLogs,
    getWarnings
  }
}
