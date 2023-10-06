export type StoreData<T> = {
    setData: (data: T[]) => void; // type changed from T to T[]
    data: T[];
};

export const INITIAL_DATA: StoreData<{}>["data"] = [];