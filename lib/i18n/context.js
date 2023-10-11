"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.I18nProvider = exports.useI18n = void 0;
const react_1 = require("react");
const vira_i18n_1 = require("vira-i18n");
const i18nContext = (0, react_1.createContext)({
    language: '',
    locales: [],
    t: () => '',
    setLanguage: () => { },
});
const i18nProvider = ({ language, locales, children }) => {
    const [lang, setLang] = (0, react_1.useState)(language);
    (0, react_1.useMemo)(() => {
        setLang(language);
    }, [language]);
    const translator = new vira_i18n_1.I18n(lang, locales);
    const t = (resourcesKey) => {
        return translator.i18n(resourcesKey);
    };
    return (0, react_1.createElement)(i18nContext.Provider, {
        value: {
            language: lang,
            locales,
            t,
            setLanguage: setLang,
        },
    }, [children]);
};
exports.I18nProvider = i18nProvider;
const useI18n = () => {
    const context = (0, react_1.useContext)(i18nContext);
    if (context === undefined)
        throw new Error('I18n context is undefined');
    return context;
};
exports.useI18n = useI18n;
