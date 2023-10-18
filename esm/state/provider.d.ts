/// <reference types="react" />
import { DefaultOptionsContextType, ProviderPropsType } from "./types";
export { ProviderPropsType };
export declare const QueryProvider: ({ options, children, }: ProviderPropsType) => import("react").FunctionComponentElement<import("react").ProviderProps<DefaultOptionsContextType>>;
export declare const useQueryContext: () => DefaultOptionsContextType;
