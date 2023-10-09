export function extractData(config) {
    const result = Object.keys(config).reduce((curr, key, _i) => {
        curr[key] = config[key][0];
        return curr;
    }, {});
    return result;
}
export function getFormInputs(form) {
    if (!form) {
        return [];
    }
    return Array.from(form.querySelectorAll('input, select, textarea') || []);
}
export function getInputElements(form, prop) {
    if (!form) {
        return null;
    }
    const elements = Array.from(form.querySelectorAll(`[name="${prop}"]`));
    if (!elements.length) {
        return null;
    }
    return elements;
}
export function updateValuesForFormInputs(form, data) {
    if (!form) {
        return {};
    }
    const newRefs = {};
    Object.keys(data).forEach((prop) => {
        const els = getInputElements(form, prop);
        if (!els) {
            return;
        }
        newRefs[prop] = els;
        switch (els[0].type) {
            case 'checkbox':
                els[0].checked = Boolean(data[prop]);
                break;
            case 'radio':
                els.forEach((f) => (f.checked = f.value === data[prop]));
                break;
            case 'file':
                //file cannot be set programmatically
                els[0].value = '';
                break;
            case 'submit':
            case 'reset':
            case 'image':
                break;
            default:
                els[0].value = data[prop] !== null && data[prop] !== undefined ? String(data[prop]) : '';
                break;
        }
    });
    return newRefs;
}
export function validateFn(config, data) {
    const errors = {};
    Object.keys(config).forEach((prop) => {
        const validators = config[prop][1];
        let valid = true;
        (validators || []).forEach((validator) => {
            if (typeof validator === 'function') {
                const r = validator.call(null, data[prop], data);
                if (valid && r) {
                    valid = false;
                    errors[prop] = r;
                }
            }
        });
    });
    const valid = Object.keys(errors).length === 0;
    return { valid, errors };
}
