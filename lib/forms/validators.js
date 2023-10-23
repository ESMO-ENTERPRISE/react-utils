"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decimal = exports.numeric = exports.pattern = exports.maxLength = exports.minLength = exports.email = exports.equal = exports.requiredTrue = exports.required = exports.max = exports.min = exports.EMAIL_PATTERN = exports.isEmpty = exports.isUndefinedOrNull = exports.getNumeric = void 0;
function getNumeric(val) {
    return parseInt(String(val).trim(), 10);
}
exports.getNumeric = getNumeric;
function isUndefinedOrNull(val) {
    return val === null || val === undefined;
}
exports.isUndefinedOrNull = isUndefinedOrNull;
function isEmpty(val) {
    if (typeof val === 'object' && val !== null && Object.keys(val).length === 0) {
        return true;
    }
    if (Array.isArray(val) && !val.length) {
        return true;
    }
    return String(val).trim() === '';
}
exports.isEmpty = isEmpty;
exports.EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
function min(minVal, message = `Min ${minVal}`) {
    return (val) => {
        if (isUndefinedOrNull(val) || isEmpty(val)) {
            return null;
        }
        const vNumeric = numeric()(val);
        if (vNumeric) {
            return vNumeric;
        }
        if (getNumeric(val) < minVal) {
            return message;
        }
        return null;
    };
}
exports.min = min;
function max(maxVal, message = `Max ${maxVal}`) {
    return (val) => {
        if (isUndefinedOrNull(val) || isEmpty(val)) {
            return null;
        }
        const vNumeric = numeric()(val);
        if (vNumeric) {
            return vNumeric;
        }
        if (getNumeric(val) > maxVal) {
            return message;
        }
        return null;
    };
}
exports.max = max;
function required(message = 'Value is required') {
    return (val) => {
        if (isUndefinedOrNull(val) || val === '' || isEmpty(val)) {
            return message;
        }
        return null;
    };
}
exports.required = required;
function requiredTrue(message = 'Value must be true') {
    return (val) => {
        if (String(val) !== 'true') {
            return message;
        }
        return null;
    };
}
exports.requiredTrue = requiredTrue;
function equal(withName, message = 'Values must be equal') {
    return (val, data) => {
        const valIsUndefinedOrNull = isUndefinedOrNull(val) || isEmpty(val);
        const withValIsUndefinedOrNull = !data ||
            isUndefinedOrNull(data[withName]) ||
            isEmpty(data[withName]);
        if (data && val !== data[withName] && !valIsUndefinedOrNull && !withValIsUndefinedOrNull) {
            return message;
        }
        return null;
    };
}
exports.equal = equal;
function email(message = 'Invalid email') {
    return (val) => {
        if (isUndefinedOrNull(val) || isEmpty(val)) {
            return null;
        }
        if (!exports.EMAIL_PATTERN.test(String(val).toLowerCase())) {
            return message;
        }
        return null;
    };
}
exports.email = email;
function minLength(minLength, message = `Min length ${minLength}`) {
    return (val) => {
        if (isUndefinedOrNull(val) || isEmpty(val)) {
            return null;
        }
        if (String(val).trim().length < minLength) {
            return message;
        }
        return null;
    };
}
exports.minLength = minLength;
function maxLength(maxLength, message = `Max length ${maxLength}`) {
    return (val) => {
        if (isUndefinedOrNull(val) || isEmpty(val)) {
            return null;
        }
        if (String(val).trim().length > maxLength) {
            return message;
        }
        return null;
    };
}
exports.maxLength = maxLength;
function pattern(pattern, message = 'Invalid pattern') {
    return (val) => {
        if (isUndefinedOrNull(val) || isEmpty(val) || !pattern) {
            return null;
        }
        const p = typeof pattern === 'string' ? new RegExp(pattern) : pattern;
        if (!p.test(String(val))) {
            return message;
        }
        return null;
    };
}
exports.pattern = pattern;
function numeric(message = 'Value must be numeric') {
    return (val) => {
        if (isUndefinedOrNull(val) || isEmpty(val)) {
            return null;
        }
        return String(val).match(/^\-{0,1}[0-9]+$/) ? null : message;
    };
}
exports.numeric = numeric;
function decimal(message = 'Value must be decimal') {
    return (val) => {
        if (isUndefinedOrNull(val) || isEmpty(val)) {
            return null;
        }
        return String(val).match(/^\d*\.?\d*$/) ? null : message;
    };
}
exports.decimal = decimal;
