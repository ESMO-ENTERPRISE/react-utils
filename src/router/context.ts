import { createContext } from "react"
import { RouterParams } from "./types"

export const routerInitialState = {
    url: window.location.pathname,
    hash: window.location.hash,
    action: 'initNavigation'
}

const routerContext = createContext<RouterParams>({
    state: routerInitialState,
    matchedRoutes: [],
    navigate: () => undefined,
    params: []
})

const { Provider, Consumer } = routerContext

export { Provider as RouterProvider, Consumer as RouterConsumer, routerContext as RouterContext }