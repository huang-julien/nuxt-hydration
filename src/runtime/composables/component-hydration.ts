import { getFragmentHTML } from '#app/components/utils'
import { useNuxtApp, useState } from '#imports'
import { getCurrentInstance, onMounted, type VNode, isVNode, watch, onBeforeUnmount } from 'vue'
type ExtendedVnode = VNode & { __hydrationMismatched?: boolean }

const BORDER_STYLE = '2px solid red'

export function useComponentHydration(filePath: string, componentName: string) {
  if (process.server) { return }

  const showComponentHydration = useState('nuxt-hydration_show-component', () => true)
  const instance = getCurrentInstance()
  const app = useNuxtApp()
  const mismatchedComponents = useMismatchedComponents()

  if (app.isHydrating && instance && instance.vnode.el) {
    const html = (getFragmentHTML(instance.vnode?.el) || []).join('')

    let isHydrationMismatched = false

    /**
     * the mounted hook should be called before the suspense resolved
     */
    onMounted(() => {
      if (html !== (getFragmentHTML(instance.vnode?.el) || []).join('')) {
        isHydrationMismatched = true;
        (instance.vnode as ExtendedVnode).__hydrationMismatched = true
        if (!instance.vnode.el!.style) {
          instance.vnode.el!.style = {}
        }
        instance.vnode.el!.style.border = BORDER_STYLE
      }
    })

    app.hook('app:suspense:resolve', () => {
      if (filePath.includes('nuxt-root')) return;
      if (isHydrationMismatched && !VNodeChildrenHasMismatch(instance.vnode)) {

        mismatchedComponents.value.push({
          path: filePath,
          name: instance.type.displayName || instance.type.name || instance.type.__name || 'Unknown',
          initialHtml: html,
          mountHtml: (getFragmentHTML(instance.vnode?.el) || []).join(''),
          node: instance.vnode?.el
        })
      }
    })

    watch(showComponentHydration, (show) => {
      if (instance.vnode.el && isHydrationMismatched && !VNodeChildrenHasMismatch(instance.vnode)) {
        instance.vnode.el.style = instance.vnode.el.style || {}
        instance.vnode.el.style.border = show ? BORDER_STYLE : null
      }
    })
  }
}


function VNodeChildrenHasMismatch(vnode: VNode) {
  if (isVNode(vnode)) {
    if (vnode.component && vnode.component.subTree) {
      return traverseChildrenForMismatch(vnode.component.subTree)
    }
  }
  return false
}

function traverseChildrenForMismatch(subtree?: VNode) {
  if (!subtree) {
    return false
  }
  if (Array.isArray(subtree.children)) {
    for (const child of subtree.children) {
      if (isVNode(child)) {
        if ((child as ExtendedVnode).__hydrationMismatched) {
          return true
        }
        if (child.component && child.component.subTree) {
          const result = traverseChildrenForMismatch(child.component.subTree)
          if (result) {
            return true
          }
        }
      }
    }
  }
  return false
}

export type TMismatchedComponentInfo = {
  path: string
  name: string
  initialHtml: string
  node: {
    [key: string]: any;
  } | null
  mountHtml: string
}

export function useMismatchedComponents() {
  return useState<TMismatchedComponentInfo[]>('nuxt-hydration_mismatched-components', () => [])
}