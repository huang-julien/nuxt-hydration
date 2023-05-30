import { Result } from 'html-validate'

export const allowedRules = [
  'element-permitted-content',
  'element-permitted-occurrences',
  'element-permitted-order'
  // not sure if this cause hydration issues
  // 'element-permitted-parent'
]

export type THtmlValidatorDetail = {
    source?: string|null,
    filePath?: string|null,
    message: string,
    selector?: string|null,
    type: 'Invalid html'
}

export function getHtmlValidatorDetails (results: Result[]): THtmlValidatorDetail[] {
  const details = []
  for (const result of results) {
    const { messages, source, filePath } = result
    const allowedRulesMessage = messages.filter(m => allowedRules.includes(m.ruleId))

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

  return details
}
