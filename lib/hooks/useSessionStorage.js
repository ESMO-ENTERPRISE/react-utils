"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSessionStorage = void 0;
const react_1 = require("react");
const useEventCallback_1 = require("./useEventCallback");
const useEventListener_1 = require("./useEventListener");
function useSessionStorage(key, initialValue) {
    // Get from session storage then
    // parse stored json or return initialValue
    const readValue = (0, react_1.useCallback)(() => {
        // Prevent build error "window is undefined" but keep keep working
        if (typeof window === 'undefined') {
            return initialValue;
        }
        try {
            const item = window.sessionStorage.getItem(key);
            return item ? parseJSON(item) : initialValue;
        }
        catch (error) {
            console.warn(`Error reading sessionStorage key “${key}”:`, error);
            return initialValue;
        }
    }, [initialValue, key]);
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = (0, react_1.useState)(readValue);
    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to sessionStorage.
    const setValue = (0, useEventCallback_1.useEventCallback)(value => {
        // Prevent build error "window is undefined" but keeps working
        if (typeof window == 'undefined') {
            console.warn(`Tried setting sessionStorage key “${key}” even though environment is not a client`);
        }
        try {
            // Allow value to be a function so we have the same API as useState
            const newValue = value instanceof Function ? value(storedValue) : value;
            // Save to session storage
            window.sessionStorage.setItem(key, JSON.stringify(newValue));
            // Save state
            setStoredValue(newValue);
            // We dispatch a custom event so every useSessionStorage hook are notified
            window.dispatchEvent(new Event('session-storage'));
        }
        catch (error) {
            console.warn(`Error setting sessionStorage key “${key}”:`, error);
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
    // this is a custom event, triggered in writeValueTosessionStorage
    (0, useEventListener_1.useEventListener)('session-storage', handleStorageChange);
    return [storedValue, setValue];
}
exports.useSessionStorage = useSessionStorage;
// A wrapper for "JSON.parse()"" to support "undefined" value
function parseJSON(value) {
    try {
        return value === 'undefined' ? undefined : JSON.parse(value ?? '');
    }
    catch {
        return undefined;
    }
}
