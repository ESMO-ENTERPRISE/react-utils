import { useEffect } from 'react';
import { useJsonMemo } from './use-json-memo';
import { useRouter } from './use-router';
const Redirect = (props) => {
    const { href, state } = useJsonMemo(props);
    const router = useRouter();
    useEffect(() => router.go({ href, replace: true, state }), [router, href, state]);
    return null;
};
export { Redirect };
