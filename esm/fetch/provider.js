import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createElement } from "react";
function esmoQueryProvider({ children }) {
    const queryClient = new QueryClient();
    return createElement(QueryClientProvider, {
        client: queryClient,
    }, [children]);
}
export { esmoQueryProvider as EsmoQueryProvider };
