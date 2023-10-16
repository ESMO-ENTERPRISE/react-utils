import {createElement, type ReactNode, useMemo} from 'react';

import { createRouter } from './create-router';
import { RouterContext } from './router-context';

type BrowserHashRouterProps = {
  children?: ReactNode;
};

const BrowserHashRouter = ({ children }: BrowserHashRouterProps): JSX.Element => {
  const router = useMemo(
    () => createRouter({ decodeUrl: (url) => new URL(url.hash.slice(1), 'http://localhost'), window }),
    [],
  );

  // return <RouterContext.Provider value={router}>{children}</RouterContext.Provider>;

  return createElement(RouterContext.Provider, { value: router }, [children]);
};

export { type BrowserHashRouterProps, BrowserHashRouter };
