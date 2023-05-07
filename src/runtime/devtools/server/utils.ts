export function isRouteWithParams (route: string) {
  return route.split('/').some(section => section.includes('()'))
}
