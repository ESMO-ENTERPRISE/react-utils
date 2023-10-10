"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMutation = void 0;
const utils_1 = require("./utils");
const store_1 = require("../store");
// Create mutation
const createMutation = (mutationFn, options = {}) => {
    const { onMutate = utils_1.noop, onSuccess = utils_1.noop, onError = utils_1.noop, onSettled = utils_1.noop, ...createStoreOptions } = options;
    const useMutation = (0, store_1.createStore)(({ set, get }) => ({
        isWaiting: false,
        isSuccess: false,
        isError: false,
        response: undefined,
        responseUpdatedAt: undefined,
        error: undefined,
        errorUpdatedAt: undefined,
        mutate: ((variables) => {
            set({ isWaiting: true });
            const stateBeforeMutate = get();
            onMutate(variables, stateBeforeMutate);
            return new Promise((resolve) => {
                mutationFn(variables, stateBeforeMutate)
                    .then((response) => {
                    set({
                        isWaiting: false,
                        isSuccess: true,
                        isError: false,
                        response,
                        responseUpdatedAt: Date.now(),
                        error: undefined,
                        errorUpdatedAt: undefined,
                    });
                    onSuccess(response, variables, stateBeforeMutate);
                    resolve({ response, variables });
                })
                    .catch((error) => {
                    set({
                        isWaiting: false,
                        isSuccess: false,
                        isError: true,
                        error,
                        errorUpdatedAt: Date.now(),
                    });
                    onError(error, variables, stateBeforeMutate);
                    resolve({ error, variables });
                })
                    .finally(() => {
                    onSettled(variables, stateBeforeMutate);
                });
            });
        }),
    }), createStoreOptions);
    return useMutation;
};
exports.createMutation = createMutation;
