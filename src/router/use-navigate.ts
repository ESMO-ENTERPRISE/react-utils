import { type SyntheticEvent, useCallback } from 'react';

import { getRouterAction } from './get-router-action';
import { useJsonMemo } from './use-json-memo';
import { useRouter } from './use-router';
import {RouterAction} from "./types";

const useNavigate = (action?: RouterAction | number | string): ((event?: SyntheticEvent<Element, any>) => void) => {
  const stableAction = useJsonMemo(action);
  const router = useRouter();

  return useCallback(
    (event) => {
      if (event?.isDefaultPrevented()) {
        return;
      }

      event?.preventDefault();
      router.go({ href: event?.currentTarget.getAttribute('href') || undefined, ...getRouterAction(stableAction) });
    },
    [router, stableAction],
  );
};

export { useNavigate };
