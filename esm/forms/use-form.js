import { useState, useEffect } from 'react';
import { validateGreaterThanOrEqualToMin, validateLessThanOrEqualToMax, validateLengthIsGreaterThanOrEqualToMin, validateLengthIsLessThanOrEqualToMax, validateIsRequired, validatePattern, } from './validators';
import { checkIfFieldIsValid, checkIfAllFieldsAreValid, checkIfFormIsValid } from './checks';
const cloneFormState = (formState) => ({
    values: { ...formState.values },
    fields: { ...formState.fields },
    validationRules: { ...formState.validationRules },
    isValid: formState.isValid,
    errorMessages: { ...formState.errorMessages },
});
const defaultFormState = {
    values: {},
    fields: {},
    validationRules: {},
    isValid: false,
    errorMessages: {},
};
const defaultErrorMessages = {
    required: 'This field is required',
    pattern: 'This field is does not match the correct pattern',
    min: 'This field does not exceed the min value',
    max: 'This field exceeds the max value',
    minLength: 'This field does not exceed the min length',
    maxLength: 'This field exceeds the max length',
};
const getErrorMessages = (errors, errorMessages) => errors.map((error) => errorMessages[error]);
const getValidationFns = (validations) => {
    const { max, maxLength, min, minLength, pattern, required } = validations;
    const validatorFns = [];
    if (required) {
        validatorFns.push(validateIsRequired);
    }
    if (pattern) {
        validatorFns.push(validatePattern(pattern));
    }
    if (min) {
        validatorFns.push(validateGreaterThanOrEqualToMin(min));
    }
    if (max) {
        validatorFns.push(validateLessThanOrEqualToMax(max));
    }
    if (minLength) {
        validatorFns.push(validateLengthIsGreaterThanOrEqualToMin(minLength));
    }
    if (maxLength) {
        validatorFns.push(validateLengthIsLessThanOrEqualToMax(maxLength));
    }
    return validatorFns;
};
const useFormValidator = (setup) => {
    const [formState, setFormState] = useState(defaultFormState);
    const [initialSetup, setInitialSetup] = useState({});
    const [setupComplete, setSetupComplete] = useState(false);
    const [newValues, setNewValues] = useState(null);
    useEffect(() => {
        setInitialSetup(setup);
        const newFormState = runSetup(setup);
        setFormState(newFormState);
        setSetupComplete(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setup]);
    useEffect(() => {
        if (setupComplete && newValues && formState) {
            const newFormState = cloneFormState(formState);
            Object.entries(newValues).forEach(([name, value]) => {
                // Check if field is valid
                const { hasError, errors } = checkIfFieldIsValid(newFormState.validationRules[name], value);
                // Set new value
                newFormState.values[name] = value;
                // Set the field
                newFormState.fields[name] = {
                    ...newFormState.fields[name],
                    dirty: true,
                    hasError,
                    showError: hasError,
                    isValid: !hasError,
                    errors: hasError ? getErrorMessages(errors, newFormState.errorMessages[name]) : [],
                };
            });
            // Check if the form is valid
            newFormState.isValid = checkIfFormIsValid(newFormState);
            setFormState(newFormState);
            setNewValues(null);
        }
    }, [setupComplete, newValues, formState]);
    const runSetup = (validatorSetup) => {
        const newFormState = {
            values: {},
            fields: {},
            validationRules: {},
            isValid: false,
            errorMessages: {},
        };
        Object.entries(validatorSetup).forEach(([name, validations]) => {
            const { defaultValue = '', errorMessages, max, maxLength, min, minLength, required } = validations;
            // A field cannot have both max and maxLength or min and minLength
            if ((min || max) && (minLength || maxLength)) {
                throw new Error('A field can only have min/max OR minLength/maxLength validation');
            }
            // Setup validator functions
            newFormState.validationRules[name] = getValidationFns(validations);
            // Setup error messages
            newFormState.errorMessages[name] = { ...defaultErrorMessages, ...errorMessages };
            // Check if field is valid
            const { hasError, errors } = checkIfFieldIsValid(newFormState.validationRules[name], defaultValue);
            // Set isDirty true if defaultValue is anything other than null or empty string
            const isDirty = defaultValue !== null && defaultValue !== '';
            // Set value to default value
            newFormState.values[name] = defaultValue;
            // Set the field
            newFormState.fields[name] = {
                touched: false,
                dirty: isDirty,
                hasError,
                showError: isDirty && hasError,
                isRequired: Boolean(required),
                isValid: !hasError && isDirty,
                errors: hasError ? getErrorMessages(errors, newFormState.errorMessages[name]) : [],
            };
        });
        // Check if the form is valid
        newFormState.isValid = checkIfFormIsValid(newFormState);
        return newFormState;
    };
    const reset = () => {
        const newFormState = runSetup(initialSetup);
        setFormState(newFormState);
    };
    const handleChange = (event) => {
        const newFormState = cloneFormState(formState);
        const { name, value } = event.target;
        // Update value
        newFormState.values[name] = value;
        // Check if field has any errors
        const { hasError, errors } = checkIfFieldIsValid(newFormState.validationRules[name], value);
        // Grab the previous state of the field
        const previousFieldState = newFormState.fields[name];
        // Determine if we should show any errors
        const shouldShowError = (previousFieldState.showError || // Show error if previously true
            previousFieldState.touched) && // OR show error if field has been touched (blurred once)
            hasError; // AND hasError
        // Determine if the field is dirty
        const isDirty = previousFieldState.dirty || // Dirty if previously dirty
            (!previousFieldState.dirty && // OR not previously dirty
                value !== '' &&
                value !== null); // AND has a potentially valid value
        // Set the field
        const newFieldState = {
            ...previousFieldState,
            touched: previousFieldState.touched,
            dirty: isDirty,
            isValid: !hasError && isDirty,
            hasError,
            errors: hasError ? getErrorMessages(errors, newFormState.errorMessages[name]) : [],
            showError: shouldShowError,
        };
        // Set new field state
        newFormState.fields[name] = newFieldState;
        // Check if form is valid
        newFormState.isValid = checkIfFormIsValid(newFormState);
        setFormState(newFormState);
    };
    const handleBlur = (event) => {
        const newFormState = cloneFormState(formState);
        const { name } = event.target;
        const field = newFormState.fields[name];
        // Only need to run on blur if the field has not been blurred once (touched === false)
        // Validations run onChange
        if (!field.touched) {
            // Set new field state
            newFormState.fields[name] = {
                ...newFormState.fields[name],
                showError: field.hasError,
                touched: true,
            };
            setFormState(newFormState);
        }
    };
    return {
        fields: { ...formState.fields },
        handleBlur,
        handleChange,
        isValid: formState.isValid,
        reset,
        setupComplete,
        setValues: setNewValues,
        validate: () => setFormState(checkIfAllFieldsAreValid(cloneFormState(formState))),
        values: { ...formState.values },
    };
};
export default useFormValidator;
