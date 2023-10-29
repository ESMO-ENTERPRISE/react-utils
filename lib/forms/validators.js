"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
<<<<<<< HEAD
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
=======
exports.decimal = exports.numeric = exports.pattern = exports.maxLength = exports.minLength = exports.email = exports.equal = exports.requiredTrue = exports.required = exports.max = exports.min = void 0;
function getNumeric(val) {
    return parseInt(String(val).trim(), 10);
}
function isUndefinedOrNull(val) {
    return val === null || val === undefined;
}
function isEmpty(val) {
    if (typeof val === 'object' && val !== null && Object.keys(val).length === 0) {
        return true;
    }
    if (Array.isArray(val) && !val.length) {
        return true;
    }
    return String(val).trim() === '';
}
const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
function min(val, minVal) {
    if (isUndefinedOrNull(val) || isEmpty(val)) {
        return true;
    }
    const vNumeric = numeric(val);
    if (vNumeric) {
        return vNumeric;
    }
    if (getNumeric(val) < minVal) {
        return true;
    }
    return false;
}
exports.min = min;
function max(val, maxVal) {
    if (isUndefinedOrNull(val) || isEmpty(val)) {
        return true;
    }
    const vNumeric = numeric(val);
    if (vNumeric) {
        return vNumeric;
    }
    if (getNumeric(val) > maxVal) {
        return true;
    }
    return false;
}
exports.max = max;
function required(val) {
    if (isUndefinedOrNull(val) || val === '' || isEmpty(val)) {
        return true;
    }
    return false;
}
exports.required = required;
function requiredTrue(val) {
    if (String(val) !== 'true') {
        return true;
    }
    return false;
}
exports.requiredTrue = requiredTrue;
function equal(val, comparedValue) {
    const valIsUndefinedOrNull = isUndefinedOrNull(val) || isEmpty(val);
    const withValIsUndefinedOrNull = !comparedValue ||
        isUndefinedOrNull(comparedValue) ||
        isEmpty(comparedValue);
    if (comparedValue && val !== comparedValue && !valIsUndefinedOrNull && !withValIsUndefinedOrNull) {
        return true;
    }
    return false;
}
exports.equal = equal;
function email(val) {
    if (isUndefinedOrNull(val) || isEmpty(val)) {
        return true;
    }
    if (!EMAIL_PATTERN.test(String(val).toLowerCase())) {
        return true;
    }
    return false;
}
exports.email = email;
function minLength(val, minLength) {
    if (isUndefinedOrNull(val) || isEmpty(val)) {
        return true;
    }
    if (String(val).trim().length < minLength) {
        return true;
    }
    return false;
}
exports.minLength = minLength;
function maxLength(val, maxLength) {
    if (isUndefinedOrNull(val) || isEmpty(val)) {
        return true;
    }
    if (String(val).trim().length > maxLength) {
        return true;
    }
    return false;
}
exports.maxLength = maxLength;
function pattern(val, pattern) {
    if (isUndefinedOrNull(val) || isEmpty(val) || !pattern) {
        return true;
    }
    const p = typeof pattern === 'string' ? new RegExp(pattern) : pattern;
    if (!p.test(String(val))) {
        return true;
    }
    return false;
}
exports.pattern = pattern;
function numeric(val) {
    if (isUndefinedOrNull(val) || isEmpty(val)) {
        return true;
    }
    return String(val).match(/^\-{0,1}[0-9]+$/) ? false : true;
}
exports.numeric = numeric;
function decimal(val) {
    if (isUndefinedOrNull(val) || isEmpty(val)) {
        return true;
    }
    return String(val).match(/^\d*\.?\d*$/) ? false : true;
}
exports.decimal = decimal;
>>>>>>> 11d383f82e2f2e4084db777572e8f1ed978c8579
