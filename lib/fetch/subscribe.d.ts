export type StoreData = Record<string, any>;
export type SetStoreData<T> = Partial<T> | ((prevState: T) => Partial<T>);
export type SelectDeps<T> = ((state: T) => any[]) | undefined | null;
export type Subscribers<T> = Map<(state: T) => void, SelectDeps<T>>;
export type StoreInitializer<T> = (api: {
    get: () => T;
    set: (value: SetStoreData<T>, silent?: boolean) => void;
}) => T;
export type StoreEvent<T> = (state: T) => void;
export type InitStoreOptions<T> = {
    intercept?: (nextState: T, prevState: T) => Partial<T>;
    onFirstSubscribe?: StoreEvent<T>;
    onSubscribe?: StoreEvent<T>;
    onUnsubscribe?: StoreEvent<T>;
    onLastUnsubscribe?: StoreEvent<T>;
};
export type InitStoreReturn<T> = {
    get: () => T;
    set: (value: SetStoreData<T>, silent?: boolean) => void;
    subscribe: (fn: (state: T) => void, selectDeps?: SelectDeps<T>) => () => void;
    getSubscribers: () => Subscribers<T>;
};
export declare const initStore: <T extends StoreData>(initializer: StoreInitializer<T>, options?: InitStoreOptions<T>) => InitStoreReturn<T>;
