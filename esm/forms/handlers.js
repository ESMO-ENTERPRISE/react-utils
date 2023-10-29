export const register = (props) => {
    return {
        ...props,
        value: props.value ?? '',
        // use any to support native like event
        onChange: (event) => {
            props.onChange(event.target.value);
        },
    };
};
