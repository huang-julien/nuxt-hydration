import { getFragmentHTML } from '#app/components/utils'
import { useNuxtApp } from '#app'
import { getCurrentInstance, onMounted, VNode, isVNode } from 'vue'

type ExtendedVnode = VNode & { __hydrationMismatched?: boolean }

export function useComponentHydration (filePath: string) {
  if (process.server) { return }

  const instance = getCurrentInstance()!
  const app = useNuxtApp()
  if (app.isHydrating) {
    const html = getFragmentHTML(instance.vnode.el).join('')

    let isHydrationMismatched = false

    /**
     * the mounted hook should be called before the suspense resolved
     */
    onMounted(() => {
      if (html !== getFragmentHTML(instance.vnode.el).join('')) {
        isHydrationMismatched = true;
        (instance.vnode as ExtendedVnode).__hydrationMismatched = true
      }
    })

    app.hook('nuxt-hydration:component-hydration', (list) => {
      if (filePath.includes('nuxt-root')) { return }

      if (isHydrationMismatched && !VNodeChildrenHasMismatch(instance.vnode)) {
        instance.vnode.el!.style.border = '2px solid red'
        list.push({
          path: filePath
        })
      }
    })
  }
}

function VNodeChildrenHasMismatch (vnode: VNode) {
  if (isVNode(vnode)) {
    if (vnode.component && vnode.component.subTree) {
      return traverseChildrenForMismatch(vnode.component.subTree)
    }
  }
  return false
}

function traverseChildrenForMismatch (subtree?: VNode) {
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
