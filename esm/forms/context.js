import { createContext, useContext } from "react";
const formContext = createContext(undefined);
export const FormProvider = formContext.Provider;
export const useFormContext = () => {
    const context = useContext(formContext);
    if (context === undefined) {
        throw new Error('useFormContext must be used within a FormProvider');
    }
    return context;
};
