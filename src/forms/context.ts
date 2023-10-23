import { createContext, useContext } from "react";
import { Form } from ".";

const formContext = createContext<Form<any>>(undefined!);

export const FormProvider = formContext.Provider;

export const useFormContext = <T extends object>(): Form<T> => {
    const context = useContext(formContext);
    if (context === undefined) {
        throw new Error('useFormContext must be used within a FormProvider');
    }

    return context;
};