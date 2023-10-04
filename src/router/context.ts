import { createContext } from "react"
import { RouterParams } from "./types"

export const routerInitialState = {
    url: window.location.pathname,
    hash: window.location.hash,
    action: 'initNavigation'
}

const RouterContext = createContext<RouterParams>({
    state: routerInitialState,
    matchedRoutes: [],
    navigate: () => undefined,
    params: []
})

const { Provider, Consumer } = RouterContext

export { Provider as RouterProvider, Consumer as RouterConsumer, RouterContext }