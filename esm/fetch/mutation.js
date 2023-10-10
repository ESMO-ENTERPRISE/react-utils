import { noop } from './utils';
import { createStore } from '../store';
// Create mutation
export const createMutation = (mutationFn, options = {}) => {
    const { onMutate = noop, onSuccess = noop, onError = noop, onSettled = noop, ...createStoreOptions } = options;
    const useMutation = createStore(({ set, get }) => ({
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
