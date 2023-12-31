"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMap = void 0;
const react_1 = require("react");
function useMap(initialState = new Map()) {
    const [map, setMap] = (0, react_1.useState)(new Map(initialState));
    const actions = {
        set: (0, react_1.useCallback)((key, value) => {
            setMap(prev => {
                const copy = new Map(prev);
                copy.set(key, value);
                return copy;
            });
        }, []),
        setAll: (0, react_1.useCallback)(entries => {
            setMap(() => new Map(entries));
        }, []),
        remove: (0, react_1.useCallback)(key => {
            setMap(prev => {
                const copy = new Map(prev);
                copy.delete(key);
                return copy;
            });
        }, []),
        reset: (0, react_1.useCallback)(() => {
            setMap(() => new Map());
        }, []),
    };
    return [map, actions];
}
exports.useMap = useMap;
