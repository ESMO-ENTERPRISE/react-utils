"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLocalStorage = void 0;
const react_1 = require("react");
const useEventCallback_1 = require("./useEventCallback");
const useEventListener_1 = require("./useEventListener");
function useLocalStorage(key, initialValue) {
    // Get from local storage then
    // parse stored json or return initialValue
    const readValue = (0, react_1.useCallback)(() => {
        // Prevent build error "window is undefined" but keeps working
        if (typeof window === 'undefined') {
            return initialValue;
        }
        try {
            const item = window.localStorage.getItem(key);
            return item ? parseJSON(item) : initialValue;
        }
        catch (error) {
            console.warn(`Error reading localStorage key “${key}”:`, error);
            return initialValue;
        }
    }, [initialValue, key]);
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = (0, react_1.useState)(readValue);
    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = (0, useEventCallback_1.useEventCallback)(value => {
        // Prevent build error "window is undefined" but keeps working
        if (typeof window === 'undefined') {
            console.warn(`Tried setting localStorage key “${key}” even though environment is not a client`);
        }
        try {
            // Allow value to be a function so we have the same API as useState
            const newValue = value instanceof Function ? value(storedValue) : value;
            // Save to local storage
            window.localStorage.setItem(key, JSON.stringify(newValue));
            // Save state
            setStoredValue(newValue);
            // We dispatch a custom event so every useLocalStorage hook are notified
            window.dispatchEvent(new Event('local-storage'));
        }
        catch (error) {
            console.warn(`Error setting localStorage key “${key}”:`, error);
        }
    });
    (0, react_1.useEffect)(() => {
        setStoredValue(readValue());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleStorageChange = (0, react_1.useCallback)((event) => {
        if (event?.key && event.key !== key) {
            return;
        }
        setStoredValue(readValue());
    }, [key, readValue]);
    // this only works for other documents, not the current one
    (0, useEventListener_1.useEventListener)('storage', handleStorageChange);
    // this is a custom event, triggered in writeValueToLocalStorage
    (0, useEventListener_1.useEventListener)('local-storage', handleStorageChange);
    return [storedValue, setValue];
}
exports.useLocalStorage = useLocalStorage;
// A wrapper for "JSON.parse()"" to support "undefined" value
function parseJSON(value) {
    try {
        return value === 'undefined' ? undefined : JSON.parse(value ?? '');
    }
    catch {
        return undefined;
    }
}
