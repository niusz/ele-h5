import type { InjectionKey } from "vue"
import { reactive, provide } from 'vue'

export function useChildren<T>(key: InjectionKey<T>) {
    const children = reactive([])
    const linkChildren = () => {

        provide(key, {
            link,
            unlink
        })
    }
    return {
        children,
        linkChildren
    }
}