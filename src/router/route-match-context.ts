import { createContext } from 'react';

import {RouteMatch} from "./types";

const RouteMatchContext = createContext<RouteMatch | null>(null);

export { RouteMatchContext };
