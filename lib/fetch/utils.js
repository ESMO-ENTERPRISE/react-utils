"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isClient = exports.getValueOrComputedValue = exports.hashStoreKey = exports.hasValue = exports.identityFn = exports.noop = void 0;
const noop = () => { };
exports.noop = noop;
const identityFn = (value) => value;
exports.identityFn = identityFn;
const hasValue = (value) => value !== undefined && value !== null;
exports.hasValue = hasValue;
const hashStoreKey = (obj) => JSON.stringify(obj, Object.keys(obj).sort());
exports.hashStoreKey = hashStoreKey;
const getValueOrComputedValue = (valueOrComputeValueFn, ...params) => {
    if (typeof valueOrComputeValueFn === 'function') {
        return valueOrComputeValueFn(...params);
    }
    return valueOrComputeValueFn;
};
exports.getValueOrComputedValue = getValueOrComputedValue;
exports.isClient = typeof window !== 'undefined' && !('Deno' in window);
