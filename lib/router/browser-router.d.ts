import { type ReactNode } from 'react';
type BrowserRouterProps = {
    children?: ReactNode;
};
declare const BrowserRouter: ({ children }: BrowserRouterProps) => JSX.Element;
export { type BrowserRouterProps, BrowserRouter };
