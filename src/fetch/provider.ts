import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, createElement } from "react";

export function EsmoQueryProvider({ children }: { children: ReactNode}) {
    const queryClient = new QueryClient();
    
    return createElement(
        QueryClientProvider,
        {
            client: queryClient,
        },
        [children]
    );
}