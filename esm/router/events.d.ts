import { RouterState } from './types';
type Callback = (state: RouterState & {
    params?: {};
}) => void;
export declare class RouterEvents {
    private listener;
    dispatch(data: RouterState & {
        params?: {};
    }): void;
    addListener(callback: Callback): void;
    removeListener(callback: Callback): void;
}
export {};
