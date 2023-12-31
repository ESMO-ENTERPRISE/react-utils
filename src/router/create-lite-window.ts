import {LiteWindow} from "./types";

type Listener = { readonly callback: () => void; readonly capture: boolean };
type Entry = { readonly data: {} | null; readonly href: string };

const isListenerMatch = (a: Listener, b: Listener): boolean => {
  return a.capture === b.capture && a.callback === b.callback;
};

const createLiteWindow = (initialLocation: string, state: {} | null): LiteWindow => {
  let listeners: readonly Listener[] = [];
  let index = 0;
  let current: Entry = {
    data: state,
    href: new URL(initialLocation, 'http://localhost').href,
  };

  const stack: [Entry, ...Entry[]] = [current];
  const createEntry = (url: URL, data: {} | null = null) => ({ data, href: url.href });

  const self: LiteWindow = {
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
          current = stack[index] as Entry;
          listeners.forEach((listener) => listener.callback());
        });
      },
      get length() {
        return stack.length;
      },
      pushState: (data = null, _unused, url) => {
        stack.splice(++index, 1, createEntry(url, data));
        current = stack[index] as Entry;
      },
      replaceState: (data, _unused, url) => {
        stack[index] = createEntry(url, data);
        current = stack[index] as Entry;
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

export { createLiteWindow };
