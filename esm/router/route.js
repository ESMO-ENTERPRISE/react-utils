import { createElement } from 'react';
import { RouteMatchContext } from './route-match-context';
import { useRoute } from './use-route';
const Route = ({ path = '/*', children } = {}) => {
    const match = useRoute(path);
    // return match ? <RouteMatchContext.Provider value={match}>{children}</RouteMatchContext.Provider> : null;
    return match ? createElement(RouteMatchContext.Provider, { value: match }, [children]) : null;
};
export { Route };
