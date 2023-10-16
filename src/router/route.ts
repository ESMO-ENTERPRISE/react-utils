import {createElement, type ReactNode} from 'react';

import { RouteMatchContext } from './route-match-context';
import { useRoute } from './use-route';

type RouteProps = {
  readonly children?: ReactNode;
  readonly path?: string[] | string;
};

const Route = ({ path = '/*', children }: RouteProps = {}): JSX.Element | null => {
  const match = useRoute(path);

  // return match ? <RouteMatchContext.Provider value={match}>{children}</RouteMatchContext.Provider> : null;
  return match ? createElement(RouteMatchContext.Provider, { value: match }, [children]) : null;
};

export { type RouteProps, Route };
