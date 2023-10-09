import { useMutation, useQueryClient } from "@tanstack/react-query";
export const useEsmoMutation = (mutationKey, mutationFn) => (options) => {
    const client = useQueryClient();
    return useMutation(mutationFn, {
        onSuccess: () => client.invalidateQueries([mutationKey]),
        ...options
    });
};
