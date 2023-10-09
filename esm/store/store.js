import { create } from "zustand";
import { INITIAL_DATA } from "./types";
const storeDefinition = create((set) => ({
    data: INITIAL_DATA,
    setData: (arg) => set(() => ({
        data: arg
    }))
}));
export const useEsmoStore = storeDefinition;
