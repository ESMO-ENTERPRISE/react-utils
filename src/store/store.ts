import { useEffect, useMemo, useRef, useState } from 'react';

import { hashStoreKey, Maybe, noop } from './utils';
import {
  initStore
} from './subscribe';
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

// Create store
export const createStore = <T extends StoreDataRecord>(
  initializer: StoreInitializer<T>,
  options: InitStoreOptions<T> & {
    defaultDeps?: SelectDeps<T>;
  } = {},
): UseStore<T> => {
  const { get, set, subscribe, getSubscribers } = initStore(initializer, options);
  const { defaultDeps } = options;

  /**
   * IMPORTANT NOTE: selectDeps function must not be changed after initialization.
   */
  const useStore = (selectDeps: SelectDeps<T> = defaultDeps) => {
    const [state, setState] = useState(get);

    useEffect(() => subscribe(setState, selectDeps), []);

    return state;
  };

  useStore.get = get;
  useStore.set = set;
  useStore.subscribe = subscribe;
  useStore.getSubscribers = getSubscribers;

  useStore.setDefaultValues = (value: SetStoreData<T>) => {
    useState(() => {
      const subscribers = getSubscribers();
      if (subscribers.size > 0) {
        console.warn(
          'Put setDefaultValues on the root component or parent component, before any component subscribed!',
        );
      }
      set(value);
    });
  };

  const Watch = ({ selectDeps, render }: WatchProps<T>) => {
    const store = useStore(selectDeps);
    return render(store);
  };
  useStore.Watch = Watch;

  return useStore;
};

export type StoresInitializer<
  TKey extends StoreKey = StoreKey,
  T extends StoreDataRecord = StoreDataRecord,
> = (api: {
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
  Watch: (props: WatchProps<T> & { storeKey?: Maybe<TKey> }) => any;
};

export type CreateStoresOptions<
  TKey extends StoreKey = StoreKey,
  T extends StoreDataRecord = StoreDataRecord,
> = InitStoreOptions<T> & {
  onBeforeChangeKey?: (nextKey: TKey, prevKey: TKey) => void;
  /**
   * Will be triggered when a single store with a specific key was initialized.
   */
  onStoreInitialized?: (key: TKey, keyHash: string) => void;
  defaultDeps?: SelectDeps<T>;
  hashKeyFn?: (obj: TKey) => string;
};

// Create stores
export const createStores = <TKey extends StoreKey = StoreKey, T extends StoreDataRecord = StoreDataRecord>(
  initializer: StoresInitializer<TKey, T>,
  options: CreateStoresOptions<TKey, T> = {},
): UseStores<TKey, T> => {
  const {
    onBeforeChangeKey = noop,
    onStoreInitialized = noop,
    defaultDeps,
    hashKeyFn = hashStoreKey,
  } = options;

  const stores = new Map<string, InitStoreReturn<T>>();

  const getStore = (_key: Maybe<TKey>) => {
    const key = _key || ({} as TKey);
    const keyHash = hashKeyFn(key);
    if (!stores.has(keyHash)) {
      stores.set(
        keyHash,
        initStore((api) => initializer({ key, keyHash, ...api }), options),
      );
      onStoreInitialized(key, keyHash);
    }
    return stores.get(keyHash)!;
  };

  /**
   * IMPORTANT NOTE: selectDeps function must not be changed after initialization.
   */
  const useStores = (...args: [Maybe<TKey>, SelectDeps<T>?] | [SelectDeps<T>?]) => {
    const [_key, selectDeps = defaultDeps] = (
      typeof args[0] === 'function' ? [{}, args[0]] : args
    ) as [TKey, SelectDeps<T>];
    const key = _key || ({} as TKey);

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

  useStores.get = (key?: Maybe<TKey>) => {
    const store = getStore(key);
    return store.get();
  };
  useStores.getAll = () => {
    const allStores: T[] = [];
    stores.forEach((store) => {
      allStores.push(store.get());
    });
    return allStores;
  };
  useStores.getAllWithSubscriber = () => {
    const allStores: T[] = [];
    stores.forEach((store) => {
      const subscribers = store.getSubscribers();
      if (subscribers.size > 0) allStores.push(store.get());
    });
    return allStores;
  };

  useStores.set = (key: Maybe<TKey>, value: SetStoreData<T>, silent?: boolean) => {
    const store = getStore(key);
    store.set(value, silent);
  };
  useStores.setAll = (value: SetStoreData<T>, silent?: boolean) => {
    stores.forEach((store) => {
      store.set(value, silent);
    });
  };

  useStores.subscribe = (
    key: Maybe<TKey>,
    fn: (state: T) => void,
    selectDeps: SelectDeps<T> = defaultDeps,
  ) => {
    const store = getStore(key);
    return store.subscribe(fn, selectDeps);
  };
  useStores.getSubscribers = (key: Maybe<TKey>) => {
    const store = getStore(key);
    return store.getSubscribers();
  };

  useStores.getStore = (key?: Maybe<TKey>) => getStore(key);
  useStores.getStores = () => stores;

  useStores.setDefaultValues = (key: Maybe<TKey>, value: SetStoreData<T>) => {
    useState(() => {
      const store = getStore(key);
      const subscribers = store.getSubscribers();
      if (subscribers.size > 0) {
        console.warn(
          'Put setDefaultValues on the root component or parent component, before any component subscribed!',
        );
      }
      store.set(value);
    });
  };

  const Watch = ({ storeKey, selectDeps, render }: WatchProps<T> & { storeKey?: Maybe<TKey> }) => {
    const store = useStores(storeKey, selectDeps);
    return render(store);
  };
  useStores.Watch = Watch;

  return useStores;
};