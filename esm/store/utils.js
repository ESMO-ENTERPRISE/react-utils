export const noop = () => { };
export const identityFn = (value) => value;
export const hasValue = (value) => value !== undefined && value !== null;
export const hashStoreKey = (obj) => JSON.stringify(obj, Object.keys(obj).sort());
export const getValueOrComputedValue = (valueOrComputeValueFn, ...params) => {
    if (typeof valueOrComputeValueFn === 'function') {
        return valueOrComputeValueFn(...params);
    }
    return valueOrComputeValueFn;
};
export const isClient = typeof window !== 'undefined' && !('Deno' in window);
