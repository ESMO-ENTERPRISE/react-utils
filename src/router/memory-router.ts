import {createElement, type ReactNode, useMemo} from 'react';

import { createLiteWindow } from './create-lite-window';
import { createRouter } from './create-router';
import { useJsonMemo } from './use-json-memo';
import { RouterContext } from './router-context';

type MemoryRouterProps = {
  readonly children?: ReactNode;
  readonly initialState?: {} | null;
  readonly initialUrl?: string;
};

const MemoryRouter = ({ children, ...props }: MemoryRouterProps): JSX.Element => {
  const { initialUrl = '/', initialState = null } = useJsonMemo(props);
  const router = useMemo(
    () =>
      createRouter({
        decodeUrl: (url) => url,
        window: createLiteWindow(initialUrl, initialState),
      }),
    [initialUrl, initialState],
  );

  // return <RouterContext.Provider value={router}>{children}</RouterContext.Provider>;
    return createElement(RouterContext.Provider, { value: router }, [children]);
};

export { type MemoryRouterProps, MemoryRouter };
