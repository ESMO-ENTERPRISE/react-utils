import { RouterEvents } from "./events";
import { RouteSettings, RouterType, RoutesType, UseNavigation } from "./types";
declare const routerEvents: RouterEvents;
declare function createRouter(settings: RouteSettings): [RouterType, RoutesType];
declare function useNavigation<PropsType = any, StateType = any>(): UseNavigation<PropsType, StateType>;
export { createRouter, useNavigation, routerEvents };
