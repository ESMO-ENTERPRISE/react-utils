import { type ReactNode } from 'react';
type RouteProps = {
    readonly children?: ReactNode;
    readonly path?: string[] | string;
};
declare const Route: ({ path, children }?: RouteProps) => JSX.Element | null;
export { type RouteProps, Route };
