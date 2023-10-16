import { useContext } from 'react';

import { RouteMatchContext } from './route-match-context';
import {RouteMatch} from "./types";

const useRouteMatch = (): RouteMatch | null => {
  return useContext(RouteMatchContext);
};

export { useRouteMatch };
