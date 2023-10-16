import { createContext } from 'react';

import {Router} from "./types";

const RouterContext = createContext<Router | null>(null);

export { RouterContext };
