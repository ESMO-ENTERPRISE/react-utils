import { SetValue } from './types';
export declare function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>];
