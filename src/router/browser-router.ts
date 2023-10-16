import {createElement, type ReactNode, useMemo} from 'react';

import { createRouter } from './create-router';
import { RouterContext } from './router-context';

type BrowserRouterProps = {
  children?: ReactNode;
};

const BrowserRouter = ({ children }: BrowserRouterProps): JSX.Element => {
  const router = useMemo(() => createRouter({ decodeUrl: (url) => url, window }), []);

  // return <RouterContext.Provider value={router}>{children}</RouterContext.Provider>;

  return createElement(RouterContext.Provider, { value: router }, [children]);
};

export { type BrowserRouterProps, BrowserRouter };
