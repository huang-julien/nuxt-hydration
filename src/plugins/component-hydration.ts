import { createUnplugin } from 'unplugin'
import MagicString from 'magic-string'

const SCRIPT_RE = /<(script[^>]*)>([\s|\S]*)<\/script>/

export const SFCComponentHydrationPlugin = createUnplugin(() => {
  return {
    name: 'nuxt-hydration:sfc-hook',
    enforce: 'pre',
    transformInclude (id) {
      return id.endsWith('.vue')
    },
    transform (code, id) {
      const s = new MagicString(code)

      s.replace(SCRIPT_RE, (_full, tag, content) => {
        if (!tag.includes('setup')) { return _full }

        return `<${tag}>
import { useComponentHydration } from "#build/nuxt-hydration-composables";
useComponentHydration(${JSON.stringify(id)});
            
${content}
</script>`
      })

      if (s.hasChanged()) {
        return {
          code: s.toString(),
          map: s.generateMap({ hires: true })
        }
      }
    }
  }
})
