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
        return false;
    }
    const vNumeric = numeric(val);
    if (vNumeric) {
        return vNumeric;
    }
    if (getNumeric(val) < minVal) {
        return false;
    }
    return false;
}
export function max(val, maxVal) {
    if (isUndefinedOrNull(val) || isEmpty(val)) {
        return false;
    }
    const vNumeric = numeric(val);
    if (vNumeric) {
        return vNumeric;
    }
    if (getNumeric(val) > maxVal) {
        return false;
    }
    return true;
}
export function required(val) {
    if (isUndefinedOrNull(val) || val === '' || isEmpty(val)) {
        return false;
    }
    return true;
}
export function requiredTrue(val) {
    if (String(val) !== 'true') {
        return false;
    }
    return true;
}
export function equal(val, comparedValue) {
    const valIsUndefinedOrNull = isUndefinedOrNull(val) || isEmpty(val);
    const withValIsUndefinedOrNull = !comparedValue ||
        isUndefinedOrNull(comparedValue) ||
        isEmpty(comparedValue);
    if (comparedValue && val !== comparedValue && !valIsUndefinedOrNull && !withValIsUndefinedOrNull) {
        return false;
    }
    return true;
}
export function email(val) {
    if (isUndefinedOrNull(val) || isEmpty(val)) {
        return false;
    }
    if (!EMAIL_PATTERN.test(String(val).toLowerCase())) {
        return false;
    }
    return true;
}
export function minLength(val, minLength) {
    if (isUndefinedOrNull(val) || isEmpty(val)) {
        return false;
    }
    if (String(val).trim().length < minLength) {
        return false;
    }
    return true;
}
export function maxLength(val, maxLength) {
    if (isUndefinedOrNull(val) || isEmpty(val)) {
        return false;
    }
    if (String(val).trim().length > maxLength) {
        return false;
    }
    return true;
}
export function pattern(val, pattern) {
    if (isUndefinedOrNull(val) || isEmpty(val) || !pattern) {
        return false;
    }
    const p = typeof pattern === 'string' ? new RegExp(pattern) : pattern;
    if (!p.test(String(val))) {
        return false;
    }
    return true;
}
export function numeric(val) {
    if (isUndefinedOrNull(val) || isEmpty(val)) {
        return false;
    }
    return String(val).match(/^\-{0,1}[0-9]+$/) ? true : false;
}
export function decimal(val) {
    if (isUndefinedOrNull(val) || isEmpty(val)) {
        return false;
    }
    return String(val).match(/^\d*\.?\d*$/) ? true : false;
}
