import { ChangeEventHandler, FormEventHandler } from 'react';
import { UseFormTypes, ValueOf } from './types';
declare function useForm<Type>({ defaultValues, validation }: UseFormTypes<Type>): {
    inputs: Type;
    handleChange: ChangeEventHandler<HTMLInputElement>;
    setFieldValue: (name: keyof Type, value: ValueOf<Type>) => void;
    errors: { [x in keyof Type]: string; };
    handleSubmit: (onSubmit: (data: Type) => void) => FormEventHandler<HTMLFormElement>;
    setInputs: import("react").Dispatch<import("react").SetStateAction<Type>>;
    reset: () => void;
    hasError: boolean;
    defaultValues: Type;
    isDirty: boolean;
    dirtyFields: any;
    touchedFields: { [x_1 in keyof Type]: boolean; };
    getFieldProps: (inputName: string) => {
        name: string;
        onChange: ChangeEventHandler<HTMLInputElement>;
        value: any;
    };
};
export default useForm;
