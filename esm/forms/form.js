import { useMemo, useState } from 'react';
function useForm({ defaultValues, validation }) {
    const [inputs, setInputs] = useState(defaultValues);
    const errorDefaultValues = {};
    const defaultTouchedFields = {};
    Object.keys(defaultValues).forEach((item) => {
        errorDefaultValues[item] = '';
        defaultTouchedFields[item] = false;
    });
    const [errors, setErrors] = useState(errorDefaultValues);
    const [touchedFields, setTouchedFields] = useState(defaultTouchedFields);
    const [hasError, setHasError] = useState(false);
    const isEmptyObject = (obj) => {
        return !Object.keys(obj).length;
    };
    const dirtyFields = useMemo(() => {
        return Object.keys(inputs).reduce((init, value) => {
            if (defaultValues[value] === undefined || defaultValues[value] !== inputs[value]) {
                init[value] = inputs[value];
            }
            return init;
        }, {});
    }, [inputs, defaultValues]);
    const isDirty = useMemo(() => {
        return !isEmptyObject(dirtyFields);
    }, [dirtyFields]);
    const onChange = (name, value) => {
        setErrors({
            ...errors,
            [name]: '',
        });
        setTouchedFields({
            ...touchedFields,
            [name]: true,
        });
        setInputs({
            ...inputs,
            [name]: value,
        });
    };
    const handleChange = (e) => {
        const { target: { name, value }, } = e;
        onChange(name, value);
    };
    const setFieldValue = (name, value) => {
        onChange(name, value);
    };
    const customErrorValidation = () => {
        const err = {};
        Object.keys(inputs).forEach((item) => {
            if (validation) {
                Object.entries(validation[item] || {}).every(([key, value]) => {
                    if (key === 'required') {
                        if (!inputs[item]) {
                            if (typeof value === 'boolean') {
                                if (value) {
                                    err[item] = 'Field is required';
                                    return false;
                                }
                            }
                            else {
                                const errValue = value(inputs[item], inputs);
                                if (typeof errValue === 'boolean') {
                                    if (errValue) {
                                        err[item] = 'Field is required';
                                        return false;
                                    }
                                }
                                else {
                                    err[item] = errValue;
                                    return false;
                                }
                            }
                        }
                    }
                    else {
                        const errValue = typeof value !== 'boolean' ? value(inputs[item], inputs) : false;
                        if (typeof errValue === 'string') {
                            err[item] = errValue;
                            return false;
                        }
                    }
                    return true;
                });
            }
        });
        return err;
    };
    const handleSubmit = (onSubmit) => {
        const err = customErrorValidation();
        if (!isEmptyObject(err))
            return (e) => {
                e.preventDefault();
                setHasError(true);
                setErrors({
                    ...errors,
                    ...err,
                });
            };
        return (e) => {
            e.preventDefault();
            setHasError(false);
            onSubmit(inputs);
        };
    };
    const reset = () => setInputs(defaultValues);
    const getFieldProps = (inputName) => {
        return {
            name: inputName,
            onChange: handleChange,
            value: inputs[inputName],
        };
    };
    return {
        inputs,
        handleChange,
        setFieldValue,
        errors,
        handleSubmit,
        setInputs,
        reset,
        hasError,
        defaultValues,
        isDirty,
        dirtyFields,
        touchedFields,
        getFieldProps,
    };
}
export default useForm;
