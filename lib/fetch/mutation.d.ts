import { InitStoreOptions } from './subscribe';
import { UseStore } from '../store';
export type MutationState<TVar, TResponse = any, TError = unknown> = {
    /**
     * Network fetching status.
     */
    isWaiting: boolean;
    isSuccess: boolean;
    isError: boolean;
    response: TResponse | undefined;
    responseUpdatedAt: number | undefined;
    error: TError | undefined;
    errorUpdatedAt: number | undefined;
    /**
     * Mutate function.
     *
     * @returns Promise that will always get resolved.
     */
    mutate: TVar extends undefined ? () => Promise<{
        response?: TResponse;
        error?: TError;
        variables?: TVar;
    }> : (variables: TVar) => Promise<{
        response?: TResponse;
        error?: TError;
        variables?: TVar;
    }>;
};
export type UseMutation<TVar, TResponse = any, TError = unknown> = UseStore<MutationState<TVar, TResponse, TError>>;
export type CreateMutationOptions<TVar, TResponse = any, TError = unknown> = InitStoreOptions<MutationState<TVar, TResponse, TError>> & {
    onMutate?: (variables: TVar, stateBeforeMutate: MutationState<TVar, TResponse, TError>) => void;
    onSuccess?: (response: TResponse, variables: TVar, stateBeforeMutate: MutationState<TVar, TResponse, TError>) => void;
    onError?: (error: TError, variables: TVar, stateBeforeMutate: MutationState<TVar, TResponse, TError>) => void;
    onSettled?: (variables: TVar, stateBeforeMutate: MutationState<TVar, TResponse, TError>) => void;
};
export declare const createMutation: <TVar, TResponse = any, TError = unknown>(mutationFn: (variables: TVar, state: MutationState<TVar, TResponse, TError>) => Promise<TResponse>, options?: CreateMutationOptions<TVar, TResponse, TError>) => UseMutation<TVar, TResponse, TError>;
