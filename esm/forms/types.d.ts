import { Path } from "../object-path/types";
export type StandardFieldRef = {
    focus: () => void;
};
export type StandardFieldProps<T = any> = {
    value: T;
    onChange: (value: T) => void;
    onBlur?: () => void;
    ref?: any;
};
export type CovertToStandardFieldProps<T, P = any> = Override<T, StandardFieldProps<P>>;
export type FormErrors<T extends object> = Map<Path<T>, any>;
export type FormFieldRefs<T extends object> = {
    [K in Path<T>]?: any;
};
export type PromiseAble<T> = T | Promise<T>;
export type Override<T, P> = Omit<T, keyof P> & P;
export type UseFormValue = undefined | null | string | number | boolean | string[] | number[] | Record<string, unknown>;
