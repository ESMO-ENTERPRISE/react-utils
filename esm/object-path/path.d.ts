import { Path, PathValue } from './types';
declare enum PathItemType {
    Object = 0,
    Array = 1
}
type PathItem = {
    type: PathItemType;
    key: string;
};
export declare const getPathItems: (path: string) => PathItem[];
export declare const pathGet: <T, P extends Path<T>>(object: T, path: P) => PathValue<T, P>;
export declare const pathSet: <T, P extends Path<T>>(object: T, path: P, value: PathValue<T, P>) => void;
export declare const pathSetImmutable: <T, P extends Path<T>>(object: T, path: P, value: PathValue<T, P>) => T;
export {};
