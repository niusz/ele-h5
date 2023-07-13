import { ref, computed } from 'vue'
import { rAF, cancelRAF } from '@/utils/raf'

type CurrentTime = {
    days: number
    hours: number
    minutes: number
    seconds: number
    milliseconds: number
    total: number
}

type UseCountDownOptions = {
    time: number
    millisecond?: boolean
    onChange?: (current: CurrentTime) => void
    onFinish?: () => void
}

const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

const parseTime = (time: number) => {
    const days = Math.floor(time / DAY)
    const hours = Math.floor((time % DAY) / HOUR)
    const minutes = Math.floor((time % HOUR) / MINUTE)
    const seconds = Math.floor((time % MINUTE) / SECOND)
    const milliseconds = Math.floor(time % SECOND)

    return {
        days,
        hours,
        minutes,
        seconds,
        milliseconds,
        total: time,
    }
}

// 判断是否是同一秒
const isSameSecond = (time1: number, time2: number) => {
    return Math.floor(time1 / SECOND) === Math.floor(time2 / SECOND)
}

export function useCountDown(options: UseCountDownOptions) {
    let rafId: number
    let endTime: number // 倒计时结束的事件戳
    let counting: boolean  // 表示是不是正在计时中
    const remain = ref(options.time)
    const current = computed(() => parseTime(remain.value))

    const pause = () => {
        counting = false
        cancelRAF(rafId)
    }

    const getCurrentRemain = () => Math.max(endTime - Date.now(), 0)

    const setRemain = (value: number) => {
        remain.value = value
        options.onChange?.(current.value)

        if (value === 0) {
            pause()
            options.onFinish?.()
        }
    }

    const microTick = () => {
        rafId = rAF(() => {
            // 判断正在计时
            if (counting) {
                const remainRemain = getCurrentRemain()
                setRemain(remainRemain)

                if (remain.value > 0) {
                    microTick()
                }
            }
        })
    }

    const macroTick = () => {
        rafId = rAF(() => {
            if (counting) {
                const remainRemain = getCurrentRemain()
                if (!isSameSecond(remainRemain, remain.value) || remainRemain === 0) {
                    setRemain(remainRemain)
                }

                if (remain.value > 0) {
                    macroTick()
                }
            }
        })
    }

    const tick = () => {
        // 毫秒级别的tick
        if (options.millisecond) {
            microTick()
            // 非毫秒级别的tick
        } else {
            macroTick()
        }
    }
    const start = () => {
        if (!counting) {
            endTime = Date.now() + remain.value
            counting = true
            tick()
        }
    }
    const reset = (totalTime = options.time) => {
        pause()
        remain.value = totalTime
    }
    return {
        start,
        pause,
        reset,
        current,
    }
}