import { ChangeEvent, FormEvent, useCallback, useState } from "react";

interface IArgs<T> {
  initialValues: T;
  resetOnSubmit?: boolean;
}

type IErrors<T> = Record<keyof T, string> | undefined;
type IHandleSubmit<T> = (values: T) => void;

interface IGetInputOptions {
  includeError?: boolean;
  type?: "text" | "checkbox" | "textarea";
  placeholder?: string;
}

interface IGetInputProps<T> extends Omit<IGetInputOptions, "includeError"> {
  onChange: (evt: ChangeEvent<unknown>) => void;
  error?: string;
  checked?: boolean;
  value?: number | string;
  name: keyof T;
}

export const useForm = <T extends Record<string, any>>({
  initialValues,
  resetOnSubmit = true,
}: IArgs<T>) => {
  const [values, _setValues] = useState<T>(initialValues);
  const [errors, _setErrors] = useState<IErrors<T>>(undefined);

  const _instanceOf = <T>(value: any, fieldName: string): value is T => fieldName in value;

  const reset = useCallback(() => {
    _setErrors(undefined);
    _setValues(initialValues);
  }, []);

  const _onChange = useCallback(({ target }: ChangeEvent<unknown>) => {
    let finalValue: string | boolean;
    let key: string;
    if (target instanceof HTMLInputElement) {
      const { type, checked, value, name } = target;
      finalValue = type === "checkbox" ? checked : value;
      key = name;
    } else if (target instanceof HTMLTextAreaElement) {
      const { value, name } = target;
      finalValue = value;
      key = name;
    }
    _setValues((currentValues) => ({ ...currentValues, [key]: finalValue }));
  }, []);

  const _validate = useCallback(() => {
    try {
        for (const [key, value] of Object.entries(values)) {
            console.log(`${key}: ${value}`);
            if (_instanceOf(value, key)) console.log(`${key} is type of`)
        }
    } catch (error) {
    //   if (error instanceof StructError) {
    //     const errorObj = error.failures().reduce(
    //       (acc, { key, message }) => ({
    //         ...acc,
    //         [key]: message,
    //       }),
    //       {}
    //     );
    // }
    _setErrors(error as IErrors<T>);

    return error;
    }
    return {};
  }, [values]);

  const getInputProps = useCallback(
    (
      name: keyof T,
      { includeError, type = "text", placeholder }: IGetInputOptions = {}
    ) => {
      const props: IGetInputProps<T> = { onChange: _onChange, name };
      if (includeError) props.error = errors?.[name];
      if (type === "checkbox") {
        props.checked = values?.[name];
        props.type = "checkbox";
      } else {
        props.value = values?.[name];
        props.type = type ?? "text";
        if (placeholder) props.placeholder = placeholder;
      }
      return props;
    },
    [errors, values]
  );

  const submitForm = useCallback(
    (handleSubmit: IHandleSubmit<T>) => (evt: FormEvent) => {
      evt.preventDefault();
      const validationErrors = _validate();
      if (validationErrors) {
        handleSubmit(values);
        if (resetOnSubmit) reset();
      }
    },
    [values, resetOnSubmit]
  );

  return {
    values,
    errors,
    getInputProps,
    submitForm,
    reset,
  };
};