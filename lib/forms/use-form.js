"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useForm = void 0;
const react_1 = require("react");
const validators_1 = require("./validators");
const checks_1 = require("./checks");
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
    required: "This field is required",
    pattern: "This field is does not match the correct pattern",
    min: "This field does not exceed the min value",
    max: "This field exceeds the max value",
    minLength: "This field does not exceed the min length",
    maxLength: "This field exceeds the max length",
};
const getErrorMessages = (errors, errorMessages) => errors.map((error) => errorMessages[error]);
const getValidationFns = (validations) => {
    const { max, maxLength, min, minLength, pattern, required } = validations;
    const validatorFns = [];
    if (required) {
        validatorFns.push(validators_1.validateIsRequired);
    }
    if (pattern) {
        validatorFns.push((0, validators_1.validatePattern)(pattern));
    }
    if (min) {
        validatorFns.push((0, validators_1.validateGreaterThanOrEqualToMin)(min));
    }
    if (max) {
        validatorFns.push((0, validators_1.validateLessThanOrEqualToMax)(max));
    }
    if (minLength) {
        validatorFns.push((0, validators_1.validateLengthIsGreaterThanOrEqualToMin)(minLength));
    }
    if (maxLength) {
        validatorFns.push((0, validators_1.validateLengthIsLessThanOrEqualToMax)(maxLength));
    }
    return validatorFns;
};
const useForm = (setup) => {
    const [formState, setFormState] = (0, react_1.useState)(defaultFormState);
    const [initialSetup, setInitialSetup] = (0, react_1.useState)({});
    const [setupComplete, setSetupComplete] = (0, react_1.useState)(false);
    const [newValues, setNewValues] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        setInitialSetup(setup);
        const newFormState = runSetup(setup);
        setFormState(newFormState);
        setSetupComplete(true);
    }, [setup]);
    (0, react_1.useEffect)(() => {
        if (setupComplete && newValues && formState) {
            const newFormState = cloneFormState(formState);
            Object.entries(newValues).forEach(([name, value]) => {
                // Check if field is valid
                const { hasError, errors } = (0, checks_1.checkIfFieldIsValid)(newFormState.validationRules[name], value);
                // Set new value
                newFormState.values[name] = value;
                // Set the field
                newFormState.fields[name] = {
                    ...newFormState.fields[name],
                    dirty: true,
                    hasError,
                    showError: hasError,
                    isValid: !hasError,
                    errors: hasError
                        ? getErrorMessages(errors, newFormState.errorMessages[name])
                        : [],
                };
            });
            // Check if the form is valid
            newFormState.isValid = (0, checks_1.checkIfFormIsValid)(newFormState);
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
            const { defaultValue = "", errorMessages, max, maxLength, min, minLength, required, } = validations;
            // A field cannot have both max and maxLength or min and minLength
            if ((min || max) && (minLength || maxLength)) {
                throw new Error("A field can only have min/max OR minLength/maxLength validation");
            }
            // Setup validator functions
            newFormState.validationRules[name] =
                getValidationFns(validations);
            // Setup error messages
            newFormState.errorMessages[name] = {
                ...defaultErrorMessages,
                ...errorMessages,
            };
            // Check if field is valid
            const { hasError, errors } = (0, checks_1.checkIfFieldIsValid)(newFormState.validationRules[name], defaultValue);
            // Set isDirty true if defaultValue is anything other than null or empty string
            const isDirty = defaultValue !== null && defaultValue !== "";
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
                errors: hasError
                    ? getErrorMessages(errors, newFormState.errorMessages[name])
                    : [],
            };
        });
        // Check if the form is valid
        newFormState.isValid = (0, checks_1.checkIfFormIsValid)(newFormState);
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
        const { hasError, errors } = (0, checks_1.checkIfFieldIsValid)(newFormState.validationRules[name], value);
        // Grab the previous state of the field
        const previousFieldState = newFormState.fields[name];
        // Determine if we should show any errors
        const shouldShowError = (previousFieldState.showError || // Show error if previously true
            previousFieldState.touched) && // OR show error if field has been touched (blurred once)
            hasError; // AND hasError
        // Determine if the field is dirty
        const isDirty = previousFieldState.dirty || // Dirty if previously dirty
            (!previousFieldState.dirty && // OR not previously dirty
                value !== "" &&
                value !== null); // AND has a potentially valid value
        // Set the field
        const newFieldState = {
            ...previousFieldState,
            touched: previousFieldState.touched,
            dirty: isDirty,
            isValid: !hasError && isDirty,
            hasError,
            errors: hasError
                ? getErrorMessages(errors, newFormState.errorMessages[name])
                : [],
            showError: shouldShowError,
        };
        // Set new field state
        newFormState.fields[name] = newFieldState;
        // Check if form is valid
        newFormState.isValid = (0, checks_1.checkIfFormIsValid)(newFormState);
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
        validate: () => setFormState((0, checks_1.checkIfAllFieldsAreValid)(cloneFormState(formState))),
        values: { ...formState.values },
    };
};
exports.useForm = useForm;
