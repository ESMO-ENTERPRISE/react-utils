import { MutatorFunType } from "./types";
export type MutationCallbacksType<MutatorInput, ReturnedData, ErrorResponse, Context> = {
    onSuccess?: (data: ReturnedData | null | undefined, context: Context) => void;
    onError?: (err: Error, data: ErrorResponse | null | undefined, context: Context) => void;
    onSettled?: (data: ReturnedData | null | undefined, err: Error | null, context: Context) => void;
    onMutate?: (newData: MutatorInput) => Promise<Context>;
};
/**
 * Use to mutate remote data and will not cache
 * @param {*} mutator function that make the network request with POST method
 * @param {*} callbacks an object that contains callback methods such as onSuccess, onError, onSettled and onMutate
 * @returns
 */
export declare const useMutation: <MutatorInput = any, ReturnedData = any, ErrorResponse = any, Context = any>(mutator: MutatorFunType<MutatorInput>, callbacks?: MutationCallbacksType<MutatorInput, ReturnedData, ErrorResponse, Context> | undefined) => Readonly<{
    error: Error | null;
    mutate: (newData: MutatorInput) => Promise<void>;
    isMutating: boolean;
    isSuccess: boolean;
    isError: boolean;
    data: ReturnedData | null | undefined;
}>;
