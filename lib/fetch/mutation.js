"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEsmoMutation = void 0;
const react_query_1 = require("@tanstack/react-query");
const useEsmoMutation = (mutationKey, mutationFn) => (options) => {
    const client = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)(mutationFn, {
        onSuccess: () => client.invalidateQueries([mutationKey]),
        ...options
    });
};
exports.useEsmoMutation = useEsmoMutation;
