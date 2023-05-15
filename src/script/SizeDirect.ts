const map = new WeakMap();
const ob = new ResizeObserver((entries) => {
    for (const entry of entries) {
        const handle = map.get(entry.target);
        if (handle) {
            const box = entry.borderBoxSize[0];
            handle({
                width: box.inlineSize,
                height: box.blockSize,
            });
        }
    }
})

export default {
    mounted(el, binding) {
        // 监听尺寸变化
        ob.observe(el);
        map.set(el, binding.value);
    },

    unmounted(el) {
        // 取消监听
        ob.unobserve(el);
    }
}