import { useCallback } from 'react';
import { getRouterAction } from './get-router-action';
import { useJsonMemo } from './use-json-memo';
import { useRouter } from './use-router';
const useNavigate = (action) => {
    const stableAction = useJsonMemo(action);
    const router = useRouter();
    return useCallback((event) => {
        if (event?.isDefaultPrevented()) {
            return;
        }
        event?.preventDefault();
        router.go({ href: event?.currentTarget.getAttribute('href') || undefined, ...getRouterAction(stableAction) });
    }, [router, stableAction]);
};
export { useNavigate };
