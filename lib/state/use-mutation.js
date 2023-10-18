"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMutation = void 0;
const react_1 = require("react");
/**
 * Use to mutate remote data and will not cache
 * @param {*} mutator function that make the network request with POST method
 * @param {*} callbacks an object that contains callback methods such as onSuccess, onError, onSettled and onMutate
 * @returns
 */
const useMutation = (mutator, callbacks) => {
    const [status, setStatus] = (0, react_1.useState)({
        isMutating: false,
        isSuccess: false,
        isError: false,
    });
    const [error, setError] = (0, react_1.useState)(null);
    const [data, setData] = (0, react_1.useState)(null);
    const { onSuccess, onError, onSettled, onMutate } = callbacks || {};
    const mutate = async (newData) => {
        setStatus({ isMutating: true, isSuccess: false, isError: false });
        if (!status.isMutating) {
            let isError = false;
            let error = null;
            let context = null;
            let data = null;
            try {
                if (typeof onMutate === "function") {
                    context = await onMutate(newData);
                }
                data = await mutator(newData);
                typeof onSuccess === "function" && onSuccess(data, context);
            }
            catch (err) {
                isError = true;
                error = err;
                typeof onError === "function" &&
                    onError(error, newData, context);
            }
            finally {
                setError(error);
                setStatus({ isMutating: false, isError, isSuccess: !isError });
                setData(data);
                typeof onSettled === "function" && onSettled(newData, error, context);
            }
        }
    };
    return Object.freeze({
        data,
        ...status,
        error,
        mutate,
    });
};
exports.useMutation = useMutation;
