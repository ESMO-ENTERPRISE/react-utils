export const validateGreaterThanOrEqualToMin = (min) => (value) => {
    const numberValue = Number(value);
    if (value === null || value === '' || !numberValue) {
        return {
            type: 'min',
            isValid: false,
        };
    }
    return {
        type: 'min',
        isValid: numberValue >= min,
    };
};
export const validateLessThanOrEqualToMax = (max) => (value) => {
    const numberValue = Number(value);
    if (value === null || value === '' || !numberValue) {
        return {
            type: 'max',
            isValid: false,
        };
    }
    return {
        type: 'max',
        isValid: numberValue <= max,
    };
};
export const validateLengthIsGreaterThanOrEqualToMin = (minLength) => (value) => {
    if (typeof value !== 'string') {
        return {
            type: 'minLength',
            isValid: false,
        };
    }
    return {
        type: 'minLength',
        isValid: value.length >= minLength,
    };
};
export const validateLengthIsLessThanOrEqualToMax = (maxLength) => (value) => {
    if (typeof value !== 'string') {
        return {
            type: 'maxLength',
            isValid: false,
        };
    }
    return {
        type: 'maxLength',
        isValid: value.length <= maxLength,
    };
};
export const validateIsRequired = (value) => {
    if (typeof value === 'string' && value === '') {
        return {
            type: 'required',
            isValid: false,
        };
    }
    return {
        type: 'required',
        isValid: value !== null && typeof value !== 'undefined',
    };
};
export const validatePattern = (pattern) => (value) => {
    return {
        type: 'pattern',
        isValid: pattern.test(String(value)),
    };
};
