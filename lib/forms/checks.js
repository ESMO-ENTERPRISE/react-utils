"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfFormIsValid = exports.checkIfAllFieldsAreValid = exports.checkIfFieldIsValid = void 0;
const checkIfFieldIsValid = (validationRules, value) => {
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
exports.checkIfFieldIsValid = checkIfFieldIsValid;
const checkIfAllFieldsAreValid = (formState) => {
    const { fields, values, validationRules } = formState;
    Object.keys(fields).forEach((name) => {
        const value = values[name];
        const { hasError, errors } = (0, exports.checkIfFieldIsValid)(validationRules[name], value);
        formState.fields[name] = {
            ...formState.fields[name],
            hasError,
            errors: hasError ? errors.map((error) => formState.errorMessages[name][error]) : [],
            showError: hasError,
            dirty: true,
        };
    });
    formState.isValid = (0, exports.checkIfFormIsValid)(formState);
    return formState;
};
exports.checkIfAllFieldsAreValid = checkIfAllFieldsAreValid;
const checkIfFormIsValid = (formState) => {
    const { fields } = formState;
    return Object.values(fields).every((field) => {
        if (field.isRequired) {
            // For required fields, also need to check if a value was entered (dirty)
            return !field.hasError && field.dirty;
        }
        return !field.hasError;
    });
};
exports.checkIfFormIsValid = checkIfFormIsValid;
