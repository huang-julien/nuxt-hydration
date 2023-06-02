import type { Result } from 'html-validate'
import { RenderResponse } from 'nitropack'

export default (nitro) => {
  nitro.hooks.hook('html-validator:check', ({ results }: { valid:boolean, results: Result[] }, response: RenderResponse) => {
    response.body = response.body.replace('</body>', (`<script>
    window.__NUXT_HYDRATION_HTMLVALIDATOR_REASON__ = JSON.parse( "${JSON.stringify(results).replace(/[\u00A0-\u9999<>\\&]/g, function (i) {
      return '&#' + i.charCodeAt(0) + ';'
   }).replaceAll('"', '\\"')}".replaceAll('\\"', '"').replace(/&#([0-9]{1,3});/gi, function(match, numStr) {
    const num = parseInt(numStr, 10);
    return String.fromCharCode(num);
}))</script></body>`))
  })
}
