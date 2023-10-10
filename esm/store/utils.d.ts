export declare const noop: () => void;
export declare const identityFn: <T>(value: T) => T;
export declare const hasValue: (value: any) => boolean;
export declare const hashStoreKey: (obj?: any) => string;
export declare const getValueOrComputedValue: <T, P extends any[]>(valueOrComputeValueFn: T | ((...params: P) => T), ...params: P) => T;
export type Maybe<T> = T | null | undefined;
export declare const isClient: boolean;
