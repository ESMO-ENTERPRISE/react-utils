import { type ReactNode } from 'react';
type MemoryRouterProps = {
    readonly children?: ReactNode;
    readonly initialState?: {} | null;
    readonly initialUrl?: string;
};
declare const MemoryRouter: ({ children, ...props }: MemoryRouterProps) => JSX.Element;
export { type MemoryRouterProps, MemoryRouter };
