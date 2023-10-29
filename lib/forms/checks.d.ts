import { ValidatorFn, FormState, ErrorTypes } from './types';
export declare const checkIfFieldIsValid: <T, K extends keyof T>(validationRules: ValidatorFn<T, K>[], value: "" | T[K]) => {
    hasError: boolean;
    errors: ErrorTypes[];
};
export declare const checkIfAllFieldsAreValid: <T>(formState: FormState<T>) => FormState<T>;
export declare const checkIfFormIsValid: <T>(formState: FormState<T>) => boolean;
