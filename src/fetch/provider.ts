import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, createElement } from "react";

function esmoQueryProvider({ children }: { children: ReactNode}) {
    const queryClient = new QueryClient();
    
    return createElement(
        QueryClientProvider,
        {
            client: queryClient,
        },
        [children]
    );
}

export { esmoQueryProvider as EsmoQueryProvider }