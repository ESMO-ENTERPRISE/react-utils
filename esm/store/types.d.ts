export type StoreData<T> = {
    setData: (data: T[]) => void;
    data: T[];
};
export declare const INITIAL_DATA: StoreData<{}>["data"];
