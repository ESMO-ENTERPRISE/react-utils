"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFormContext = exports.FormProvider = void 0;
const react_1 = require("react");
const formContext = (0, react_1.createContext)(undefined);
exports.FormProvider = formContext.Provider;
const useFormContext = () => {
    const context = (0, react_1.useContext)(formContext);
    if (context === undefined) {
        throw new Error('useFormContext must be used within a FormProvider');
    }
    return context;
};
exports.useFormContext = useFormContext;
