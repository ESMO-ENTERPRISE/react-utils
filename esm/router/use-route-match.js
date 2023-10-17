import { useContext } from 'react';
import { RouteMatchContext } from './route-match-context';
const useRouteMatch = () => {
    return useContext(RouteMatchContext);
};
export { useRouteMatch };
