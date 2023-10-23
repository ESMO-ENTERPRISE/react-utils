"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const register = (props) => {
    return {
        ...props,
        value: props.value ?? '',
        // use any to support native like event
        onChange: (event) => {
            props.onChange(event.target.value);
        },
    };
};
exports.register = register;
