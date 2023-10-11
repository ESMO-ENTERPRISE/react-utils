import { Dispatch, SetStateAction } from "react";
declare global {
    interface WindowEventMap {
        'local-storage': CustomEvent;
    }
}
export type SetValue<T> = Dispatch<SetStateAction<T>>;
export type Handler = (event: MouseEvent) => void;
export type MapOrEntries<K, V> = Map<K, V> | [K, V][];
export interface Actions<K, V> {
    set: (key: K, value: V) => void;
    setAll: (entries: MapOrEntries<K, V>) => void;
    remove: (key: K) => void;
    reset: Map<K, V>['clear'];
}
export type Return<K, V> = [Omit<Map<K, V>, 'set' | 'clear' | 'delete'>, Actions<K, V>];
declare global {
    interface WindowEventMap {
        'session-storage': CustomEvent;
    }
}
