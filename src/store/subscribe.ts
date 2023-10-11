import { InitStoreOptions, InitStoreReturn, SelectDeps, SetStoreData, StoreDataRecord, StoreInitializer } from './types';
import { getValueOrComputedValue, noop } from './utils';

export const initStore = <T extends StoreDataRecord>(
    initializer: StoreInitializer<T>,
    options: InitStoreOptions<T> = {},
): InitStoreReturn<T> => {
    const {
        intercept,
        onFirstSubscribe = noop,
        onSubscribe = noop,
        onUnsubscribe = noop,
        onLastUnsubscribe = noop,
    } = options;

    const subscribers = new Map<(state: T) => void, SelectDeps<T>>();

    const getSubscribers = () => subscribers;

    let data: T;

    const get = () => data;

    const set = (value: SetStoreData<T>, silent = false) => {
        const prevData = data;
        data = { ...data, ...getValueOrComputedValue(value, data) };

        if (intercept) {
            data = { ...data, ...intercept(data, prevData) };
        }

        if (silent) return;

        const keys = Object.keys(data) as (keyof T)[];
        subscribers.forEach((selectDeps, fn) => {
            if (!selectDeps) {
                for (let i = 0, n = keys.length; i < n; i++) {
                    if (prevData[keys[i]] !== data[keys[i]]) {
                        fn(data);
                        break;
                    }
                }
                return;
            }
            const prevs = selectDeps(prevData);
            const nexts = selectDeps(data);
            for (let i = 0, n = prevs.length; i < n; i++) {
                if (prevs[i] !== nexts[i]) {
                    fn(data);
                    break;
                }
            }
        });
    };

    const subscribe = (fn: (state: T) => void, selectDeps?: SelectDeps<T>) => {
        subscribers.set(fn, selectDeps);
        if (subscribers.size === 1) onFirstSubscribe(data);
        onSubscribe(data);
        return () => {
            subscribers.delete(fn);
            onUnsubscribe(data);
            if (subscribers.size === 0) onLastUnsubscribe(data);
        };
    };

    data = initializer({ get, set });

    return { get, set, subscribe, getSubscribers };
};