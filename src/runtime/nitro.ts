import { HtmlValidate, ConfigData } from 'html-validate'
import type { NuxtRenderHTMLContext } from 'nuxt/dist/core/runtime/nitro/renderer'
import { allowedRules } from './client/reason/html-validator'

const config: ConfigData = {
  rules: allowedRules.reduce((obj, rule) => Object.assign(obj, { [rule]: 'error' }), {})
}

export default defineNitroPlugin((nitro) => {
  const validator = new HtmlValidate(config)

  nitro.hooks.hook('render:html', (ctx: NuxtRenderHTMLContext) => {
    let html = ctx.body.join('')
    // remove data-v- attributes
    html = html.replace(/ ?data-v-[-A-Za-z0-9]+(=["']([^'"]*["'])?)?/g, '')
    const { valid, results } = validator.validateString(html)

    // todo ask if we do have 2 different context with `addDevServerhandler`
    if (!valid) {
      ctx.bodyAppend.push(`<script>
      window.__NUXT_HYDRATION_HTMLVALIDATOR_REASON__ = JSON.parse( "${JSON.stringify(results).replace(/[\u00A0-\u9999<>\\&]/g, function (i) {
        return '&#' + i.charCodeAt(0) + ';'
     }).replaceAll('"', '\\"')}".replaceAll('\\"', '"').replace(/&#([0-9]{1,3});/gi, function(match, numStr) {
      const num = parseInt(numStr, 10);
      return String.fromCharCode(num);
  }))</script>`)
    }
  })
})
