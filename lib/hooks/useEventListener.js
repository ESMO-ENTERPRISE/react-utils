"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEventListener = void 0;
const react_1 = require("react");
const useIsomorphicLayoutEffect_1 = require("./useIsomorphicLayoutEffect");
function useEventListener(eventName, handler, element, options) {
    // Create a ref that stores handler
    const savedHandler = (0, react_1.useRef)(handler);
    (0, useIsomorphicLayoutEffect_1.useIsomorphicLayoutEffect)(() => {
        savedHandler.current = handler;
    }, [handler]);
    (0, react_1.useEffect)(() => {
        // Define the listening target
        const targetElement = element?.current ?? window;
        if (!(targetElement && targetElement.addEventListener))
            return;
        // Create event listener that calls handler function stored in ref
        const listener = event => savedHandler.current(event);
        targetElement.addEventListener(eventName, listener, options);
        // Remove event listener on cleanup
        return () => {
            targetElement.removeEventListener(eventName, listener, options);
        };
    }, [eventName, element, options]);
}
exports.useEventListener = useEventListener;
