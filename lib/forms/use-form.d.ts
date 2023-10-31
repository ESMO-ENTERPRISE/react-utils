/// <reference types="react" />
import { ValidatorSetup, Field } from "./types";
type UseFormValidator<T> = {
    fields: {
        [K in keyof T]: Field;
    };
    handleBlur: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    isValid: boolean;
    reset: () => void;
    setupComplete: boolean;
    setValues: React.Dispatch<React.SetStateAction<{
        [K in keyof T]?: T[K] | undefined;
    } | null>>;
    validate: () => void;
    values: {
        [K in keyof T]: T[K] | "";
    };
};
export declare const useForm: <T>(setup: ValidatorSetup<T>) => UseFormValidator<T>;
export {};
