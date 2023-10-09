import { StoreData } from "./types";
export declare const useEsmoStore: {
    <T>(): StoreData<T>;
    <T_1, U>(selector: (s: StoreData<T_1>) => U): U;
};
