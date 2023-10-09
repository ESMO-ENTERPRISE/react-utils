"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useForm = void 0;
const react_1 = require("react");
const utils_1 = require("./utils");
function useForm(config, options) {
    const ref = (0, react_1.useRef)(null);
    const inputRefs = (0, react_1.useRef)({});
    const [submitted, setSubmitted] = (0, react_1.useState)(false);
    const [values, setValues] = (0, react_1.useState)({});
    const [errors, setErrors] = (0, react_1.useState)({});
    const [valid, setValid] = (0, react_1.useState)(false);
    const validate = (0, react_1.useCallback)((d) => {
        const { valid, errors } = (0, utils_1.validateFn)(config, d || values || {});
        setErrors(errors);
        setValid(valid);
        ref.current?.classList[valid ? 'remove' : 'add']('uf-invalid');
        Object.entries(inputRefs.current).forEach(([prop, els]) => {
            els.forEach((el) => {
                el.classList[errors[prop] ? 'add' : 'remove']('uf-invalid');
            });
        });
        return { valid, errors };
    }, [config, values]);
    const change = (0, react_1.useCallback)((e) => {
        const { type, checked, value, name, classList } = e.target;
        const val = type === 'checkbox' ? !!checked : value;
        if (!name) {
            throw Error('Name is required for a Form Element');
        }
        const instantUpdate = options?.validateOn !== 'submit';
        if (!classList.contains('uf-touched')) {
            classList.add('uf-touched');
        }
        if (instantUpdate) {
            classList.add('uf-changed');
            ref.current?.classList.add('uf-changed');
        }
        let newData;
        setValues((prevData) => {
            newData = { ...(prevData || {}), [name]: val };
            if (instantUpdate) {
                const { errors: errs } = validate(newData);
                classList[errs[name] ? 'add' : 'remove']('uf-invalid');
            }
            return newData;
        });
    }, [setValues, validate]);
    const setData = (d, replace = false, keepSubmit = false) => {
        setSubmitted(keepSubmit);
        setErrors({});
        const newData = replace ? { ...d } : { ...(values || {}), ...d };
        setValues(newData);
        inputRefs.current = (0, utils_1.updateValuesForFormInputs)(ref.current, newData);
    };
    // const submit = useCallback((fn: () => any): { valid: boolean; errors: UseFormErrors<T> } => {
    const handleSubmit = (0, react_1.useCallback)((fn) => (e) => {
        e.preventDefault();
        const { valid } = validate();
        if (valid) {
            setSubmitted(true);
            fn();
        }
    }, [validate, setSubmitted]);
    // SET DATA, RESET DATA
    const i = JSON.stringify((0, utils_1.extractData)(config));
    (0, react_1.useEffect)(() => {
        const d = JSON.parse(i) || {};
        setValues(d);
        inputRefs.current = (0, utils_1.updateValuesForFormInputs)(ref.current, d);
        function handleReset(e) {
            e.preventDefault();
            ref.current?.classList.remove('uf-submitted');
            ref.current?.classList.remove('uf-invalid');
            ref.current?.classList.remove('uf-touched');
            ref.current?.classList.remove('uf-changed');
            setSubmitted(false);
            setValues(d);
            setErrors({});
            inputRefs.current = (0, utils_1.updateValuesForFormInputs)(ref.current, d);
            Object.values(inputRefs.current).forEach((els) => {
                els.forEach((el) => {
                    el.classList.remove('uf-invalid');
                    el.classList.remove('uf-touched');
                    el.classList.remove('uf-changed');
                });
            });
        }
        const rc = ref.current;
        if (rc) {
            rc.addEventListener('reset', handleReset);
        }
        return () => {
            if (rc) {
                rc.removeEventListener('reset', handleReset);
            }
        };
    }, [i, setValues, setErrors, setSubmitted]);
    // ELEMENT CHANGE
    (0, react_1.useEffect)(() => {
        if (!ref.current) {
            return;
        }
        const eventName = options?.validateOn === 'change' ? 'input' : 'change';
        const rc = ref.current;
        (0, utils_1.getFormInputs)(rc).forEach((el) => el.addEventListener(eventName, change));
        return () => {
            if (rc) {
                (0, utils_1.getFormInputs)(rc).forEach((el) => el.removeEventListener(eventName, change));
            }
        };
    }, [options, change]);
    // ELEMENT FOCUS
    (0, react_1.useEffect)(() => {
        const rc = ref.current;
        function focus(e) {
            ref.current?.classList.add('uf-touched');
            (e?.target).classList.add('uf-touched');
            const instantUpdate = options?.validateOn !== 'submit';
            if (instantUpdate) {
                const { type, checked, value, name } = e.target;
                const val = type === 'checkbox' ? !!checked : value;
                let newData;
                setValues((prevData) => {
                    newData = { ...(prevData || {}), [name]: val };
                    if (instantUpdate) {
                        validate(newData);
                    }
                    return newData;
                });
            }
        }
        (0, utils_1.getFormInputs)(rc).forEach((el) => el.addEventListener('focus', focus));
        return () => {
            if (rc) {
                (0, utils_1.getFormInputs)(rc).forEach((el) => el.removeEventListener('focus', focus));
            }
        };
    });
    //SUBMIT
    // useEffect(() => {
    //   function handleSubmit() {
    //     ref.current?.classList.add('uf-submitted');
    //     submit();
    //   }
    //   const rc = ref.current;
    //   if (rc) {
    //     rc.addEventListener('submit', handleSubmit);
    //   }
    //   return () => {
    //     if (rc) {
    //       rc.removeEventListener('submit', handleSubmit);
    //     }
    //   };
    // }, [submit]);
    return {
        ref,
        submitted,
        // valid: !Object.keys(errors).length,
        valid: valid,
        data: values,
        errors,
        // change,
        // validate,
        setData,
        handleSubmit,
    };
}
exports.useForm = useForm;
