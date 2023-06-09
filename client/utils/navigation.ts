import { navigateTo } from '#imports'

export function navigateToRoute (route: string) {
  navigateTo({
    path: '/route',
    query: {
      route
    }
  })
}
