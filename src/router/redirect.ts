import { useEffect } from 'react';

import { useJsonMemo } from './use-json-memo';
import { useRouter } from './use-router';

type RedirectProps = {
  readonly href?: string;
  readonly state?: {} | null;
};

const Redirect = (props: RedirectProps): null => {
  const { href, state } = useJsonMemo(props);
  const router = useRouter();

  useEffect(() => router.go({ href, replace: true, state }), [router, href, state]);

  return null;
};

export { type RedirectProps, Redirect };
