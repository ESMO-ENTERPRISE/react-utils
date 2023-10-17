import { useMemo } from 'react';
const useJsonMemo = (value) => {
    const json = value == null ? value : JSON.stringify(value);
    return useMemo(() => (json == null ? json : JSON.parse(json)), [json]);
};
export { useJsonMemo };
