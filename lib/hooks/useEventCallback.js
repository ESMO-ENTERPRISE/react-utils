"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEventCallback = void 0;
const react_1 = require("react");
const useIsomorphicLayoutEffect_1 = require("./useIsomorphicLayoutEffect");
function useEventCallback(fn) {
    const ref = (0, react_1.useRef)(() => {
        throw new Error('Cannot call an event handler while rendering.');
    });
    (0, useIsomorphicLayoutEffect_1.useIsomorphicLayoutEffect)(() => {
        ref.current = fn;
    }, [fn]);
    return (0, react_1.useCallback)((...args) => ref.current(...args), [ref]);
}
exports.useEventCallback = useEventCallback;
