import { Maybe } from './utils';
import { InitStoreOptions, InitStoreReturn, SelectDeps, SetStoreData, StoreDataRecord, StoreInitializer, StoreKey, Subscribers, WatchProps } from './types';
export type UseStore<T extends StoreDataRecord> = {
    /**
     * @param selectDeps A function that return the dependency array (just like in `useEffect`), to trigger reactivity.
     * Defaults to `undefined` (reactive to all state change) if you didn't set `defaultDeps` on `createStore`.
     *
     * IMPORTANT NOTE: `selectDeps` must not be changed after initialization.
     */
    (selectDeps?: SelectDeps<T>): T;
    get: () => T;
    set: (value: SetStoreData<T>, silent?: boolean) => void;
    subscribe: (fn: (state: T) => void, selectDeps?: SelectDeps<T>) => () => void;
    getSubscribers: () => Subscribers<T>;
    /**
     * Set default values inside a component.
     *
     * IMPORTANT NOTE: Put this on the root component or parent component, before any component subscribed!
     */
    setDefaultValues: (values: SetStoreData<T>) => void;
    Watch: (props: WatchProps<T>) => any;
};
export declare const createStore: <T extends StoreDataRecord>(initializer: StoreInitializer<T>, options?: InitStoreOptions<T> & {
    defaultDeps?: SelectDeps<T>;
}) => UseStore<T>;
export type StoresInitializer<TKey extends StoreKey = StoreKey, T extends StoreDataRecord = StoreDataRecord> = (api: {
    get: () => T;
    set: (value: SetStoreData<T>, silent?: boolean) => void;
    key: TKey;
    keyHash: string;
}) => T;
export type UseStores<TKey extends StoreKey = StoreKey, T extends StoreDataRecord = StoreDataRecord> = {
    /**
     * @param key (Optional) Store key, an object that will be hashed into a string as a store identifier.
     *
     * @param selectDeps A function that return the dependency array (just like in `useEffect`), to trigger reactivity.
     * Defaults to `undefined` (reactive to all state change) if you didn't set `defaultDeps` on `createStores`.
     *
     * IMPORTANT NOTE: `selectDeps` must not be changed after initialization.
     */
    (...args: [Maybe<TKey>, SelectDeps<T>?] | [SelectDeps<T>?]): T;
    get: (key?: Maybe<TKey>) => T;
    getAll: () => T[];
    getAllWithSubscriber: () => T[];
    set: (key: Maybe<TKey>, value: SetStoreData<T>, silent?: boolean) => void;
    setAll: (value: SetStoreData<T>, silent?: boolean) => void;
    subscribe: (key: Maybe<TKey>, fn: (state: T) => void, selectDeps?: SelectDeps<T>) => () => void;
    getSubscribers: (key: Maybe<TKey>) => Subscribers<T>;
    getStore: (key?: Maybe<TKey>) => InitStoreReturn<T>;
    getStores: () => Map<string, InitStoreReturn<T>>;
    /**
     * Set default values inside a component.
     *
     * IMPORTANT NOTE: Put this on the root component or parent component, before any component subscribed!
     */
    setDefaultValues: (key: Maybe<TKey>, values: SetStoreData<T>) => void;
    Watch: (props: WatchProps<T> & {
        storeKey?: Maybe<TKey>;
    }) => any;
};
export type CreateStoresOptions<TKey extends StoreKey = StoreKey, T extends StoreDataRecord = StoreDataRecord> = InitStoreOptions<T> & {
    onBeforeChangeKey?: (nextKey: TKey, prevKey: TKey) => void;
    /**
     * Will be triggered when a single store with a specific key was initialized.
     */
    onStoreInitialized?: (key: TKey, keyHash: string) => void;
    defaultDeps?: SelectDeps<T>;
    hashKeyFn?: (obj: TKey) => string;
};
export declare const createStores: <TKey extends StoreKey = StoreKey, T extends StoreDataRecord = StoreDataRecord>(initializer: StoresInitializer<TKey, T>, options?: CreateStoresOptions<TKey, T>) => UseStores<TKey, T>;
