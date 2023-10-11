"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useClickOutside = void 0;
const useEventListener_1 = require("./useEventListener");
function useClickOutside(ref, handler, mouseEvent = 'mousedown') {
    (0, useEventListener_1.useEventListener)(mouseEvent, event => {
        const el = ref?.current;
        // Do nothing if clicking ref's element or descendent elements
        if (!el || el.contains(event.target)) {
            return;
        }
        handler(event);
    });
}
exports.useClickOutside = useClickOutside;
