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
