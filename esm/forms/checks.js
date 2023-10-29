export const checkIfFieldIsValid = (validationRules, value) => {
    let hasError = false;
    const errors = [];
    validationRules.forEach((validation) => {
        // validation function should return true if valid
        const { type, isValid } = validation(value);
        if (!isValid) {
            hasError = true;
            errors.push(type);
        }
    });
    return { hasError, errors };
};
export const checkIfAllFieldsAreValid = (formState) => {
    const { fields, values, validationRules } = formState;
    Object.keys(fields).forEach((name) => {
        const value = values[name];
        const { hasError, errors } = checkIfFieldIsValid(validationRules[name], value);
        formState.fields[name] = {
            ...formState.fields[name],
            hasError,
            errors: hasError ? errors.map((error) => formState.errorMessages[name][error]) : [],
            showError: hasError,
            dirty: true,
        };
    });
    formState.isValid = checkIfFormIsValid(formState);
    return formState;
};
export const checkIfFormIsValid = (formState) => {
    const { fields } = formState;
    return Object.values(fields).every((field) => {
        if (field.isRequired) {
            // For required fields, also need to check if a value was entered (dirty)
            return !field.hasError && field.dirty;
        }
        return !field.hasError;
    });
};
