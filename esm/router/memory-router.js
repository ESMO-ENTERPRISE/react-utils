import { createElement, useMemo } from 'react';
import { createLiteWindow } from './create-lite-window';
import { createRouter } from './create-router';
import { useJsonMemo } from './use-json-memo';
import { RouterContext } from './router-context';
const MemoryRouter = ({ children, ...props }) => {
    const { initialUrl = '/', initialState = null } = useJsonMemo(props);
    const router = useMemo(() => createRouter({
        decodeUrl: (url) => url,
        window: createLiteWindow(initialUrl, initialState),
    }), [initialUrl, initialState]);
    // return <RouterContext.Provider value={router}>{children}</RouterContext.Provider>;
    return createElement(RouterContext.Provider, { value: router }, [children]);
};
export { MemoryRouter };
