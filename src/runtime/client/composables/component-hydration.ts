import { getFragmentHTML } from '#app/components/utils'
import { useNuxtApp, useState } from '#app'
import { getCurrentInstance, onMounted, VNode, isVNode, watch } from 'vue'
import { USESTATE_SHOW_KEY } from '../const'

type ExtendedVnode = VNode & { __hydrationMismatched?: boolean }

const BORDER_STYLE = '2px solid red'

export function useComponentHydration (filePath: string) {
  if (process.server) { return }

  const showComponentHydration = useState(USESTATE_SHOW_KEY, () => true)
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

    watch(showComponentHydration, (show) => {
      if (instance.vnode.el) {
        instance.vnode.el.style = instance.vnode.el.style || {}
        instance.vnode.el.style.border = show ? BORDER_STYLE : null
      }
    })

    app.hook('nuxt-hydration:component-hydration', (list) => {
      if (filePath.includes('nuxt-root')) { return }

      if (isHydrationMismatched && !VNodeChildrenHasMismatch(instance.vnode)) {
        instance.vnode.el!.style.border = BORDER_STYLE
        list.push({
          path: filePath
        })
      }
    })
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
}
