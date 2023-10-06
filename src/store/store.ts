import { create } from "zustand";
import { INITIAL_DATA, StoreData } from "./types";

const storeDefinition = create<StoreData<unknown>>((set) => ({
    data: INITIAL_DATA,
    setData: (arg: unknown[]) =>
        set(() => ({
            data: arg
        }))
}));

export const useEsmoStore = storeDefinition as {
    <T>(): StoreData<T>;
    <T, U>(selector: (s: StoreData<T>) => U): U;
};
