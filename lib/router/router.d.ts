import { EsmoRouterEvents } from "./events";
import { RouteSettings, RouterType, RoutesType, UseNavigation } from "./types";
declare const routerEvents: EsmoRouterEvents;
declare function createEsmoRouter(settings: RouteSettings): [RouterType, RoutesType];
declare function useEsmoNavigation<PropsType = any, StateType = any>(): UseNavigation<PropsType, StateType>;
export { createEsmoRouter, useEsmoNavigation, routerEvents };
