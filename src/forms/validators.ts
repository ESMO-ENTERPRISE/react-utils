<<<<<<< HEAD
export const validateGreaterThanOrEqualToMin = (min: number) => <T>(value: T[keyof T] | null | ''): { type: 'min'; isValid: boolean } => {
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

export const validateLessThanOrEqualToMax = (max: number) => <T>(value: T[keyof T] | null | ''): { type: 'max'; isValid: boolean } => {
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

export const validateLengthIsGreaterThanOrEqualToMin = (minLength: number) => <T>(value: T[keyof T] | null | ''): { type: 'minLength'; isValid: boolean } => {
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

export const validateLengthIsLessThanOrEqualToMax = (maxLength: number) => <T>(value: T[keyof T] | null | ''): { type: 'maxLength'; isValid: boolean } => {
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

export const validateIsRequired = <T>(value: T[keyof T] | null | ''): { type: 'required'; isValid: boolean } => {
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

export const validatePattern = <T>(pattern: RegExp) => (value: T[keyof T] | null | ''): { type: 'pattern'; isValid: boolean } => {
  return {
    type: 'pattern',
    isValid: pattern.test(String(value)),
  };
};
=======
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
>>>>>>> 11d383f82e2f2e4084db777572e8f1ed978c8579
