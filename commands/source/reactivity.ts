import type { Observer, Reactive } from "./types"

// basic reactivity implementation

let instances: Observer[] = []

const getListener = () => instances[instances.length - 1]

export function ref<T = unknown>(value: T): Reactive<T> {
	const cb: Set<Observer> = new Set()
	return {
		get value() {
			let listener: Observer | undefined = getListener()
			if (listener) {
				cb.add(listener)
				listener = undefined
			}
			return value
		},
		set value(v) {
			value = v
			cb.forEach(fn => fn.call(undefined))
		}
	}
}

export function watch(fn: Observer): void {
	try {
		instances.push(fn)
		fn()
	} finally {
		instances.pop()
	}
}

// const count = ref(0)
// watch(() => console.log('count:', count.value))
// count.value++
// count.value++
// count.value++
// count.value++