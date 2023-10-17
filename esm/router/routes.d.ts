import React, { type ReactElement, type ReactNode } from 'react';
type RoutesProps = {
    readonly children?: ReactNode;
};
declare const Routes: ({ children }?: RoutesProps) => (React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | Iterable<React.ReactNode> | React.ReactPortal | boolean | undefined | null)[];
export { type RoutesProps, Routes };
