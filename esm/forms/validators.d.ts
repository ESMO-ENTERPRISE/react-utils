<<<<<<< HEAD
export declare const validateGreaterThanOrEqualToMin: (min: number) => <T>(value: "" | T[keyof T] | null) => {
    type: 'min';
    isValid: boolean;
};
export declare const validateLessThanOrEqualToMax: (max: number) => <T>(value: "" | T[keyof T] | null) => {
    type: 'max';
    isValid: boolean;
};
export declare const validateLengthIsGreaterThanOrEqualToMin: (minLength: number) => <T>(value: "" | T[keyof T] | null) => {
    type: 'minLength';
    isValid: boolean;
};
export declare const validateLengthIsLessThanOrEqualToMax: (maxLength: number) => <T>(value: "" | T[keyof T] | null) => {
    type: 'maxLength';
    isValid: boolean;
};
export declare const validateIsRequired: <T>(value: "" | T[keyof T] | null) => {
    type: 'required';
    isValid: boolean;
};
export declare const validatePattern: <T>(pattern: RegExp) => (value: "" | T[keyof T] | null) => {
    type: 'pattern';
    isValid: boolean;
};
=======
import { UseFormValue } from ".";
export declare function min(val: UseFormValue, minVal: number): boolean;
export declare function max(val: UseFormValue, maxVal: number): boolean;
export declare function required(val: UseFormValue): boolean;
export declare function requiredTrue(val: UseFormValue): boolean;
export declare function equal(val: UseFormValue, comparedValue: UseFormValue): boolean;
export declare function email(val: UseFormValue): boolean;
export declare function minLength(val: UseFormValue, minLength: number): boolean;
export declare function maxLength(val: UseFormValue, maxLength: number): boolean;
export declare function pattern(val: UseFormValue, pattern: string | RegExp): boolean;
export declare function numeric(val: UseFormValue): boolean;
export declare function decimal(val: UseFormValue): boolean;
>>>>>>> 11d383f82e2f2e4084db777572e8f1ed978c8579
