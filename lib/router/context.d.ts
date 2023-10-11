/// <reference types="react" />
import { RouterParams } from "./types";
export declare const routerInitialState: {
    url: string;
    hash: string;
    action: string;
};
declare const routerContext: import("react").Context<RouterParams>;
declare const Provider: import("react").Provider<RouterParams>, Consumer: import("react").Consumer<RouterParams>;
export { Provider as RouterProvider, Consumer as RouterConsumer, routerContext as RouterContext };
