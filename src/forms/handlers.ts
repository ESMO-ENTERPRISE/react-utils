import { StandardFieldProps } from ".";

export const register = (props: StandardFieldProps) => {
    return {
        ...props,
        value: props.value ?? '',
        // use any to support native like event
        onChange: (event: any) => {
            props.onChange(event.target.value);
        },
    };
};