"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRouter = void 0;
const get_router_action_1 = require("./get-router-action");
const isState = (value) => {
    return (value != null &&
        typeof value === 'object' &&
        'state' in value &&
        'isPushed' in value &&
        typeof value.isPushed === 'boolean');
};
const createRouter = ({ window, decodeUrl }) => {
    let current;
    const subscribers = new Set();
    const update = () => {
        const { pathname: path, search, hash } = decodeUrl(new URL(window.location.href));
        current = {
            hash,
            href: window.location.href,
            path,
            search,
            state: isState(window.history.state) ? window.history.state.state : null,
        };
        subscribers.forEach((subscriber) => subscriber());
    };
    const self = {
        go: (action) => {
            action = (0, get_router_action_1.getRouterAction)(action);
            if ('delta' in action) {
                window.history.go(action.delta);
            }
            else {
                const { href = current.href, state = null, replace = false } = action;
                const newUrl = new URL(href, current.href);
                const newState = {
                    isPushed: replace ? (isState(window.history.state) ? window.history.state.isPushed : false) : true,
                    state,
                };
                if (newUrl.href === window.location.href && JSON.stringify(newState) === JSON.stringify(window.history.state)) {
                    return;
                }
                try {
                    window.history[replace ? 'replaceState' : 'pushState'](newState, '', newUrl);
                }
                catch (_error) {
                    // An error may be thrown when...
                    // - URLs have an origin that doesn't match the current page.
                    // - Browser specific (eg. iOS Safari) state change limits are exceeded.
                    // - States are too large or not serializable.
                    console.warn(`History state change failed. Falling back to location change (state will be lost).`);
                    window.location[replace ? 'replace' : 'assign'](newUrl);
                    return;
                }
                update();
                window.scrollTo({ behavior: 'instant', left: 0, top: 0 });
            }
        },
        get isPushed() {
            return isState(window.history.state) ? window.history.state.isPushed : false;
        },
        get location() {
            return current;
        },
        subscribe: (handler) => {
            handler = handler.bind(null);
            subscribers.add(handler);
            window.addEventListener('popstate', update, { capture: true });
            return () => {
                subscribers.delete(handler);
                if (subscribers.size === 0) {
                    window.removeEventListener('popstate', update, { capture: true });
                }
            };
        },
    };
    update();
    return self;
};
exports.createRouter = createRouter;
