import { Path } from "../object-path/types";

export type StandardFieldRef = {
  focus: () => void;
};

export type StandardFieldProps<T = any> = {
  value: T;
  onChange: (value: T) => void;
  // use for validate after touched
  onBlur?: () => void;
  // use for auto focus
  ref?: any;
};

export type CovertToStandardFieldProps<T, P = any> = Override<
  T,
  StandardFieldProps<P>
>;

// use map (not object) to keep errors order
export type FormErrors<T extends object> = Map<Path<T>, any>;
export type FormFieldRefs<T extends object> = {
  [K in Path<T>]?: any;
};

export type PromiseAble<T> = T | Promise<T>;
export type Override<T, P> = Omit<T, keyof P> & P;