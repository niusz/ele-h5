import { onUnmounted } from "vue"

export function useInterval(fn: () => void, delay: number) {
    const timer = setInterval(() => {
        fn()
    }, delay)
    const clear = () => {
        clearTimeout(timer)
    }
    onUnmounted(clear)
    return clear
}