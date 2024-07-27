import { ref, watch } from "./reactivity.js";
// actions to global store defined by dev via `window.$actions`
// they trigger ui updates automatically when changes to the store are made
const $actions = {
    increment: (store) => store.count.value++,
    decrement: (store) => store.count.value--,
    log: (store) => console.log(store)
};
function initVariable(store, text = "") {
    const match = text.match(/([a-z]+):(.+)/);
    const variable = match ? match[1] : text;
    const initValue = match ? match[2] : '';
    if (!store[variable]) {
        store[variable] = ref(initValue);
    }
    return variable;
}
function setupChannel(store, el, attr, output) {
    const text = el.getAttribute(attr);
    if (!text)
        return;
    const variable = initVariable(store, text);
    watch(() => {
        el[output] = `${store[variable].value}`;
    });
    if (attr === 'val') {
        el.addEventListener('input', () => {
            store[variable].value = el.value;
        });
        el.addEventListener('change', () => {
            store[variable].value = el.value;
        });
    }
}
(() => {
    // global store
    const $store = {};
    // initiate signal/reactive value creation from custom attributes
    const cattrs = [['text', 'innerText'], ['html', 'innerHTML'], ['val', 'value']];
    for (const [attrKey, outputKey] of cattrs) {
        document.querySelectorAll(`[${attrKey}]`).forEach(el => {
            setupChannel($store, el, attrKey, outputKey);
        });
    }
    // create triggers for elements with `command` and `event` attributes
    document.querySelectorAll('[command]').forEach(el => {
        const event = el.getAttribute('event');
        const commandText = el.getAttribute('command');
        if (!commandText)
            return;
        const commands = commandText.split(',');
        el.addEventListener(event || 'click', (ev) => {
            ev.preventDefault();
            commands.forEach(cmd => {
                if ($actions[cmd])
                    $actions[cmd]($store);
            });
        });
    });
})();
