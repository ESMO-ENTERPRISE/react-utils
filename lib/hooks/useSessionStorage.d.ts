import { SetValue } from './types';
export declare function useSessionStorage<T>(key: string, initialValue: T): [T, SetValue<T>];
