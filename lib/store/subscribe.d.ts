import { InitStoreOptions, InitStoreReturn, StoreDataRecord, StoreInitializer } from './types';
export declare const initStore: <T extends StoreDataRecord>(initializer: StoreInitializer<T>, options?: InitStoreOptions<T>) => InitStoreReturn<T>;
