<<<<<<< HEAD
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
=======
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
export function min(val, minVal) {
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
export function max(val, maxVal) {
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
export function required(val) {
    if (isUndefinedOrNull(val) || val === '' || isEmpty(val)) {
        return true;
    }
    return false;
}
export function requiredTrue(val) {
    if (String(val) !== 'true') {
        return true;
    }
    return false;
}
export function equal(val, comparedValue) {
    const valIsUndefinedOrNull = isUndefinedOrNull(val) || isEmpty(val);
    const withValIsUndefinedOrNull = !comparedValue ||
        isUndefinedOrNull(comparedValue) ||
        isEmpty(comparedValue);
    if (comparedValue && val !== comparedValue && !valIsUndefinedOrNull && !withValIsUndefinedOrNull) {
        return true;
    }
    return false;
}
export function email(val) {
    if (isUndefinedOrNull(val) || isEmpty(val)) {
        return true;
    }
    if (!EMAIL_PATTERN.test(String(val).toLowerCase())) {
        return true;
    }
    return false;
}
export function minLength(val, minLength) {
    if (isUndefinedOrNull(val) || isEmpty(val)) {
        return true;
    }
    if (String(val).trim().length < minLength) {
        return true;
    }
    return false;
}
export function maxLength(val, maxLength) {
    if (isUndefinedOrNull(val) || isEmpty(val)) {
        return true;
    }
    if (String(val).trim().length > maxLength) {
        return true;
    }
    return false;
}
export function pattern(val, pattern) {
    if (isUndefinedOrNull(val) || isEmpty(val) || !pattern) {
        return true;
    }
    const p = typeof pattern === 'string' ? new RegExp(pattern) : pattern;
    if (!p.test(String(val))) {
        return true;
    }
    return false;
}
export function numeric(val) {
    if (isUndefinedOrNull(val) || isEmpty(val)) {
        return true;
    }
    return String(val).match(/^\-{0,1}[0-9]+$/) ? false : true;
}
export function decimal(val) {
    if (isUndefinedOrNull(val) || isEmpty(val)) {
        return true;
    }
    return String(val).match(/^\d*\.?\d*$/) ? false : true;
}
>>>>>>> 11d383f82e2f2e4084db777572e8f1ed978c8579
