"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePattern = exports.validateIsRequired = exports.validateLengthIsLessThanOrEqualToMax = exports.validateLengthIsGreaterThanOrEqualToMin = exports.validateLessThanOrEqualToMax = exports.validateGreaterThanOrEqualToMin = void 0;
const validateGreaterThanOrEqualToMin = (min) => (value) => {
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
exports.validateGreaterThanOrEqualToMin = validateGreaterThanOrEqualToMin;
const validateLessThanOrEqualToMax = (max) => (value) => {
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
exports.validateLessThanOrEqualToMax = validateLessThanOrEqualToMax;
const validateLengthIsGreaterThanOrEqualToMin = (minLength) => (value) => {
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
exports.validateLengthIsGreaterThanOrEqualToMin = validateLengthIsGreaterThanOrEqualToMin;
const validateLengthIsLessThanOrEqualToMax = (maxLength) => (value) => {
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
exports.validateLengthIsLessThanOrEqualToMax = validateLengthIsLessThanOrEqualToMax;
const validateIsRequired = (value) => {
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
exports.validateIsRequired = validateIsRequired;
const validatePattern = (pattern) => (value) => {
    return {
        type: 'pattern',
        isValid: pattern.test(String(value)),
    };
};
exports.validatePattern = validatePattern;
