import { useEffect, useRef, useState } from 'react';
import { pathGet, pathSetImmutable, } from '../object-path';
export const useForm = (options) => {
    const { defaultValues, onValidate, onSubmit, isValidateOnChange, isValidateAfterTouch, isAutoFocus, } = options || {};
    const [formState, setFormState] = useState({
        values: (defaultValues ?? {}),
        errors: new Map(),
        touched: [],
        isSubmitted: false,
        isSubmitting: false,
    });
    const fieldRefs = useRef({});
    const getValue = (path) => pathGet(formState.values, path);
    const setValue = (path, value) => {
        setFormState((formState) => {
            return {
                ...formState,
                values: pathSetImmutable(formState.values, path, value),
            };
        });
    };
    const setValues = (values) => {
        setFormState((formState) => {
            return { ...formState, values };
        });
    };
    const touch = (path) => {
        setFormState((formState) => {
            if (formState.touched.includes(path)) {
                return formState;
            }
            else {
                return { ...formState, touched: [...formState.touched, path] };
            }
        });
    };
    const getError = (path) => formState.errors.get(path);
    const hasError = (path) => Boolean(getError(path));
    const setError = (path, error) => {
        setFormState((formState) => {
            // if error is false, remove it, else set to errors
            const newErrors = new Map(formState.errors);
            if (error) {
                newErrors.set(path, error);
            }
            else {
                newErrors.delete(path);
            }
            return {
                ...formState,
                errors: newErrors,
            };
        });
    };
    const setErrors = (errors) => {
        setFormState((formState) => {
            return { ...formState, errors };
        });
    };
    const getFieldRef = (path) => fieldRefs.current[path];
    const setFieldRef = (path, ref) => {
        if (ref) {
            fieldRefs.current[path] = ref;
        }
        else {
            delete fieldRefs.current[path];
        }
    };
    const setIsSubmitted = (isSubmitted) => {
        setFormState((formState) => {
            return { ...formState, isSubmitted };
        });
    };
    const setIsSubmitting = (isSubmitting) => {
        setFormState((formState) => {
            return { ...formState, isSubmitting };
        });
    };
    const submit = async (event) => {
        event?.preventDefault?.();
        try {
            setIsSubmitting(true);
            const errors = (await onValidate?.(formState.values)) || new Map();
            setErrors(errors);
            if (errors.size === 0) {
                await onSubmit?.(formState.values);
            }
            else if (isAutoFocus) {
                // focus first invalid field
                const firstInvalidPath = errors.keys().next().value;
                getFieldRef(firstInvalidPath)?.focus?.();
            }
        }
        finally {
            setIsSubmitted(true);
            setIsSubmitting(false);
        }
    };
    // validate on change
    useEffect(() => {
        (async () => {
            if (isValidateOnChange && onValidate) {
                const errors = await onValidate(formState.values);
                if (formState.isSubmitted) {
                    setErrors(errors);
                }
                else {
                    // if is not submitted, only set errors on touched fields
                    const touchedErrors = new Map();
                    formState.touched.forEach((path) => {
                        const pathError = errors.get(path);
                        if (pathError) {
                            touchedErrors.set(path, pathError);
                        }
                    });
                    setErrors(touchedErrors);
                }
            }
        })();
    }, [formState.isSubmitted, formState.touched, formState.values]);
    const field = (path, options) => {
        const props = {
            value: getValue(path),
            onChange: (value) => setValue(path, value),
        };
        if (options?.isValidateAfterTouch ?? isValidateAfterTouch) {
            props.onBlur = () => touch(path);
        }
        if (options?.isAutoFocus ?? isAutoFocus) {
            props.ref = (ref) => setFieldRef(path, ref);
        }
        return props;
    };
    return {
        ...formState,
        field,
        getValue,
        setValue,
        setValues,
        touch,
        getError,
        hasError,
        setError,
        setErrors,
        fieldRefs: fieldRefs.current,
        getFieldRef,
        setFieldRef,
        setIsSubmitted,
        setIsSubmitting,
        submit,
    };
};
