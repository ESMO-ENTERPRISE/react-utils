"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EsmoQueryProvider = void 0;
const react_query_1 = require("@tanstack/react-query");
const react_1 = require("react");
function esmoQueryProvider({ children }) {
    const queryClient = new react_query_1.QueryClient();
    return (0, react_1.createElement)(react_query_1.QueryClientProvider, {
        client: queryClient,
    }, [children]);
}
exports.EsmoQueryProvider = esmoQueryProvider;
