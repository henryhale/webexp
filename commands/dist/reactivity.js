// basic reactivity implementation
let instances = [];
const getListener = () => instances[instances.length - 1];
export function ref(value) {
    const cb = new Set();
    return {
        get value() {
            let listener = getListener();
            if (listener) {
                cb.add(listener);
                listener = undefined;
            }
            return value;
        },
        set value(v) {
            value = v;
            cb.forEach(fn => fn.call(undefined));
        }
    };
}
export function watch(fn) {
    try {
        instances.push(fn);
        fn();
    }
    finally {
        instances.pop();
    }
}
// const count = ref(0)
// watch(() => console.log('count:', count.value))
// count.value++
// count.value++
// count.value++
// count.value++
