"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLiteWindow = void 0;
const isListenerMatch = (a, b) => {
    return a.capture === b.capture && a.callback === b.callback;
};
const createLiteWindow = (initialLocation, state) => {
    let listeners = [];
    let index = 0;
    let current = {
        data: state,
        href: new URL(initialLocation, 'http://localhost').href,
    };
    const stack = [current];
    const createEntry = (url, data = null) => ({ data, href: url.href });
    const self = {
        addEventListener: (event, callback, options = {}) => {
            const newListener = { callback, capture: options.capture ?? false, event };
            if (event === 'popstate' && !listeners.some((listener) => isListenerMatch(listener, newListener))) {
                listeners = [...listeners, newListener];
            }
        },
        history: {
            go: (delta = 0) => {
                void Promise.resolve().then(() => {
                    index = Math.max(0, Math.min(stack.length - 1, index + delta));
                    current = stack[index];
                    listeners.forEach((listener) => listener.callback());
                });
            },
            get length() {
                return stack.length;
            },
            pushState: (data = null, _unused, url) => {
                stack.splice(++index, 1, createEntry(url, data));
                current = stack[index];
            },
            replaceState: (data, _unused, url) => {
                stack[index] = createEntry(url, data);
                current = stack[index];
            },
            get state() {
                return current.data;
            },
        },
        location: {
            assign: (url) => {
                self.history.pushState(null, '', url);
            },
            get href() {
                return current.href;
            },
            replace: (url) => {
                self.history.replaceState(null, '', url);
            },
        },
        removeEventListener: (event, callback, options) => {
            if (event === 'popstate') {
                const testListener = { callback, capture: options?.capture ?? false, event };
                listeners = listeners.filter((listener) => isListenerMatch(listener, testListener));
            }
        },
        scrollTo: () => undefined,
    };
    return self;
};
exports.createLiteWindow = createLiteWindow;
