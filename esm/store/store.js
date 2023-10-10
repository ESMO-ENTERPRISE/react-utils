import { useEffect, useMemo, useRef, useState } from 'react';
import { hashStoreKey, noop } from './utils';
import { initStore, } from './subscribe';
// Create store
export const createStore = (initializer, options = {}) => {
    const { get, set, subscribe, getSubscribers } = initStore(initializer, options);
    const { defaultDeps } = options;
    /**
     * IMPORTANT NOTE: selectDeps function must not be changed after initialization.
     */
    const useStore = (selectDeps = defaultDeps) => {
        const [state, setState] = useState(get);
        useEffect(() => subscribe(setState, selectDeps), []);
        return state;
    };
    useStore.get = get;
    useStore.set = set;
    useStore.subscribe = subscribe;
    useStore.getSubscribers = getSubscribers;
    useStore.setDefaultValues = (value) => {
        useState(() => {
            const subscribers = getSubscribers();
            if (subscribers.size > 0) {
                console.warn('Put setDefaultValues on the root component or parent component, before any component subscribed!');
            }
            set(value);
        });
    };
    const Watch = ({ selectDeps, render }) => {
        const store = useStore(selectDeps);
        return render(store);
    };
    useStore.Watch = Watch;
    return useStore;
};
// Create stores
export const createStores = (initializer, options = {}) => {
    const { onBeforeChangeKey = noop, onStoreInitialized = noop, defaultDeps, hashKeyFn = hashStoreKey, } = options;
    const stores = new Map();
    const getStore = (_key) => {
        const key = _key || {};
        const keyHash = hashKeyFn(key);
        if (!stores.has(keyHash)) {
            stores.set(keyHash, initStore((api) => initializer({ key, keyHash, ...api }), options));
            onStoreInitialized(key, keyHash);
        }
        return stores.get(keyHash);
    };
    /**
     * IMPORTANT NOTE: selectDeps function must not be changed after initialization.
     */
    const useStores = (...args) => {
        const [_key, selectDeps = defaultDeps] = (typeof args[0] === 'function' ? [{}, args[0]] : args);
        const key = _key || {};
        const keyHash = hashKeyFn(key);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        const { get, subscribe } = useMemo(() => getStore(key), [keyHash]);
        const [state, setState] = useState(get);
        const isFirstRender = useRef(true);
        const prevKey = useRef(key);
        useEffect(() => {
            if (!isFirstRender.current) {
                onBeforeChangeKey(key, prevKey.current);
                setState(get);
            }
            isFirstRender.current = false;
            prevKey.current = key;
            const unsubs = subscribe(setState, selectDeps);
            return unsubs;
        }, [keyHash]);
        return state;
    };
    useStores.get = (key) => {
        const store = getStore(key);
        return store.get();
    };
    useStores.getAll = () => {
        const allStores = [];
        stores.forEach((store) => {
            allStores.push(store.get());
        });
        return allStores;
    };
    useStores.getAllWithSubscriber = () => {
        const allStores = [];
        stores.forEach((store) => {
            const subscribers = store.getSubscribers();
            if (subscribers.size > 0)
                allStores.push(store.get());
        });
        return allStores;
    };
    useStores.set = (key, value, silent) => {
        const store = getStore(key);
        store.set(value, silent);
    };
    useStores.setAll = (value, silent) => {
        stores.forEach((store) => {
            store.set(value, silent);
        });
    };
    useStores.subscribe = (key, fn, selectDeps = defaultDeps) => {
        const store = getStore(key);
        return store.subscribe(fn, selectDeps);
    };
    useStores.getSubscribers = (key) => {
        const store = getStore(key);
        return store.getSubscribers();
    };
    useStores.getStore = (key) => getStore(key);
    useStores.getStores = () => stores;
    useStores.setDefaultValues = (key, value) => {
        useState(() => {
            const store = getStore(key);
            const subscribers = store.getSubscribers();
            if (subscribers.size > 0) {
                console.warn('Put setDefaultValues on the root component or parent component, before any component subscribed!');
            }
            store.set(value);
        });
    };
    const Watch = ({ storeKey, selectDeps, render }) => {
        const store = useStores(storeKey, selectDeps);
        return render(store);
    };
    useStores.Watch = Watch;
    return useStores;
};
