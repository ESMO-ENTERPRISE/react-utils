import { MutationFunction, MutationKey, UseMutationOptions, useMutation, useQueryClient } from "@tanstack/react-query";

export const useEsmoMutation = <
  TMutationFnData = unknown, TError = unknown, TData = TMutationFnData, TMutationKey extends MutationKey = MutationKey,
  TVariables = unknown, TContext = unknown
>(
  mutationKey: TMutationKey,
  mutationFn: MutationFunction<TData, TVariables>,
) => (
  options?: Omit<UseMutationOptions<TData, TError, TVariables, TContext>, 'mutationFn'>
) => {
    const client = useQueryClient();

    return useMutation(mutationFn, {
      onSuccess: () => client.invalidateQueries([mutationKey]),
      ...options
    })
  }