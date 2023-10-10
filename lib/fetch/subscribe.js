"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initStore = void 0;
const utils_1 = require("./utils");
const initStore = (initializer, options = {}) => {
    const { intercept, onFirstSubscribe = utils_1.noop, onSubscribe = utils_1.noop, onUnsubscribe = utils_1.noop, onLastUnsubscribe = utils_1.noop, } = options;
    const subscribers = new Map();
    const getSubscribers = () => subscribers;
    let data;
    const get = () => data;
    const set = (value, silent = false) => {
        const prevData = data;
        data = { ...data, ...(0, utils_1.getValueOrComputedValue)(value, data) };
        if (intercept) {
            data = { ...data, ...intercept(data, prevData) };
        }
        if (silent)
            return;
        const keys = Object.keys(data);
        subscribers.forEach((selectDeps, fn) => {
            if (!selectDeps) {
                for (let i = 0, n = keys.length; i < n; i++) {
                    if (prevData[keys[i]] !== data[keys[i]]) {
                        fn(data);
                        break;
                    }
                }
                return;
            }
            const prevs = selectDeps(prevData);
            const nexts = selectDeps(data);
            for (let i = 0, n = prevs.length; i < n; i++) {
                if (prevs[i] !== nexts[i]) {
                    fn(data);
                    break;
                }
            }
        });
    };
    const subscribe = (fn, selectDeps) => {
        subscribers.set(fn, selectDeps);
        if (subscribers.size === 1)
            onFirstSubscribe(data);
        onSubscribe(data);
        return () => {
            subscribers.delete(fn);
            onUnsubscribe(data);
            if (subscribers.size === 0)
                onLastUnsubscribe(data);
        };
    };
    data = initializer({ get, set });
    return { get, set, subscribe, getSubscribers };
};
exports.initStore = initStore;
