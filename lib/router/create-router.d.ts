import { Router, LiteWindow } from './types';
type Route = {
    readonly hash: string;
    readonly pathname: string;
    readonly search: string;
};
type Options = {
    readonly decodeUrl: (url: URL) => Route;
    readonly window: LiteWindow;
};
declare const createRouter: ({ window, decodeUrl }: Options) => Router;
export { createRouter };
