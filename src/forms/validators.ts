import { UseFormValue } from ".";

function getNumeric(val: UseFormValue): number {
    return parseInt(String(val).trim(), 10);
}

function isUndefinedOrNull(val: UseFormValue): boolean {
    return val === null || val === undefined;
}

function isEmpty(val: UseFormValue): boolean {
    if (typeof val === 'object' && val !== null && Object.keys(val).length === 0) {
        return true;
    }
    if (Array.isArray(val) && !val.length) {
        return true;
    }

    return String(val).trim() === '';
}

const EMAIL_PATTERN =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function min(val: UseFormValue, minVal: number): boolean {
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

export function max(val: UseFormValue, maxVal: number): boolean {
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

export function required(val: UseFormValue): boolean {
    if (isUndefinedOrNull(val) || val === '' || isEmpty(val)) {
        return true;
    }

    return false;
}

export function requiredTrue(val: UseFormValue): boolean {
    if (String(val) !== 'true') {
        return true;
    }

    return false;
}

export function equal(
    val: UseFormValue,
    comparedValue: UseFormValue,
): boolean {
    const valIsUndefinedOrNull = isUndefinedOrNull(val) || isEmpty(val);
    const withValIsUndefinedOrNull =
        !comparedValue ||
        isUndefinedOrNull(comparedValue) ||
        isEmpty(comparedValue);

    if (comparedValue && val !== comparedValue && !valIsUndefinedOrNull && !withValIsUndefinedOrNull) {
        return true;
    }

    return false;
}

export function email(val: UseFormValue): boolean {
    if (isUndefinedOrNull(val) || isEmpty(val)) {
        return true;
    }
    if (!EMAIL_PATTERN.test(String(val).toLowerCase())) {
        return true;
    }

    return false;
}

export function minLength(
    val: UseFormValue,
    minLength: number,
): boolean {
    if (isUndefinedOrNull(val) || isEmpty(val)) {
        return true;
    }
    if (String(val).trim().length < minLength) {
        return true;
    }

    return false;
}

export function maxLength(
    val: UseFormValue,
    maxLength: number,
): boolean {
    if (isUndefinedOrNull(val) || isEmpty(val)) {
        return true;
    }
    if (String(val).trim().length > maxLength) {
        return true;
    }

    return false;
}

export function pattern(val: UseFormValue, pattern: string | RegExp): boolean {
    if (isUndefinedOrNull(val) || isEmpty(val) || !pattern) {
        return true;
    }
    const p = typeof pattern === 'string' ? new RegExp(pattern) : pattern;
    if (!p.test(String(val))) {
        return true;
    }

    return false;
}

export function numeric(val: UseFormValue): boolean {
    if (isUndefinedOrNull(val) || isEmpty(val)) {
        return true;
    }

    return String(val).match(/^\-{0,1}[0-9]+$/) ? false : true;
}

export function decimal(val: UseFormValue): boolean {
    if (isUndefinedOrNull(val) || isEmpty(val)) {
        return true;
    }

    return String(val).match(/^\d*\.?\d*$/) ? false : true;
}