import { Reactive } from "./types";
import { ref, watch } from "./reactivity.js";

type Store = Record<string, Reactive>

interface Action {
	(store: Store): void
}

// actions to global store defined by dev via `window.$actions`
// they trigger ui updates automatically when changes to the store are made
const $actions: Record<string, Action> = {
	increment: (store) => (store.count.value as number)++,
	decrement: (store) => (store.count.value as number)--,
	log: (store) => console.log(store)
}

function initVariable(store: Store, text = ""): string {
	const match = text.match(/([a-z]+):(.+)/)
	const variable = match ? match[1] : text
	const initValue = match ? match[2] : ''
	if (!store[variable]) {
		store[variable] = ref(initValue)
	}
	return variable
}

function setupChannel(store: Store, el: HTMLElement, attr: string, output: string) {
	const text = el.getAttribute(attr)
	if (!text) return
	const variable = initVariable(store, text)
	watch(() => {
		(el as any)[output] = `${store[variable].value}`
	})
	if (attr === 'val') {
		el.addEventListener('input', () => {
			store[variable].value = (el as any).value
		})
		el.addEventListener('change', () => {
			store[variable].value = (el as any).value
		})
	}
}

(() => {
	// global store
	const $store: Store = {}
	
	// initiate signal/reactive value creation from custom attributes
	const cattrs = [['text', 'innerText'], ['html', 'innerHTML'], ['val', 'value']]
	for (const [attrKey, outputKey] of cattrs) {
		document.querySelectorAll<HTMLElement>(`[${attrKey}]`).forEach(el => {
			setupChannel($store, el, attrKey, outputKey)
		})
	}

	// create triggers for elements with `command` and `event` attributes
	document.querySelectorAll('[command]').forEach(el => {
		const event = el.getAttribute('event')
		const commandText = el.getAttribute('command')
		if (!commandText) return
		const commands = commandText.split(',')
		el.addEventListener(event || 'click', (ev) => {
			ev.preventDefault()
			commands.forEach(cmd => {
				if ($actions[cmd]) $actions[cmd]($store)
			})
		})
	})

})()
