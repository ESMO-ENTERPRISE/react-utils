import { useState } from "react";
/**
 * Use to mutate remote data and will not cache
 * @param {*} mutator function that make the network request with POST method
 * @param {*} callbacks an object that contains callback methods such as onSuccess, onError, onSettled and onMutate
 * @returns
 */
export const useMutation = (mutator, callbacks) => {
    const [status, setStatus] = useState({
        isMutating: false,
        isSuccess: false,
        isError: false,
    });
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
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
                    onError(error, error, context);
            }
            finally {
                setError(error);
                setStatus({ isMutating: false, isError, isSuccess: !isError });
                setData(data);
                typeof onSettled === "function" && onSettled(data, error, context);
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
