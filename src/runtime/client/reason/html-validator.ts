import { BaseDetails, Reason } from '../../types/reason'

export const hydrationMismatchRules = [
  'element-permitted-content',
  'element-permitted-occurrences',
  'element-permitted-order'
  // not sure if this cause hydration issues
  // 'element-permitted-parent'
]

export interface THtmlValidatorDetail extends BaseDetails {
    source?: string|null,
    filePath?: string|null,
    message: string,
    selector?: string|null,
    type: 'Invalid html'
}

export function getHtmlValidatorReason (): Reason | null {
  const results = window.__NUXT_HYDRATION_HTMLVALIDATOR_REASON__ || []

  const details = []
  for (const result of results) {
    const { messages, source, filePath } = result
    const allowedRulesMessage = messages.filter(m => hydrationMismatchRules.includes(m.ruleId))

    for (const issue of allowedRulesMessage) {
      details.push({
        source,
        filePath,
        message: issue.message,
        selector: issue.selector,
        type: 'Invalid html'
      } as const)
    }
  }

  if (details.length) {
    return {
      reason: 'Invalid html',
      details
    }
  }
  return null
}
