import { ref } from 'vue'

export default function useTestHydration () {
  const isTesting = ref(false)

  function testPath (path: string, query?: string) {
    isTesting.value = true

    if (query) {
      path = path + '?' + query
    }

    const iframe = document.createElement('iframe')
    iframe.src = path
    iframe.width = '0'
    iframe.height = '0'
    const listener = (e: Event) => {
      if (e instanceof MessageEvent && e.data && e.data === '__nuxt__hydration' && e.source === iframe.contentWindow) {
        document.body.removeChild(iframe)
        window.removeEventListener('message', listener)
        isTesting.value = false
      }
    }
    document.body.appendChild(iframe)
    window.addEventListener('message', listener)
  }

  return {
    isTesting,
    testPath
  }
}
