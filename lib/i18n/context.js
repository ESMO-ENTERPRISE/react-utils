"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EsmoI18nProvider = exports.useEsmoI18n = void 0;
const react_1 = require("react");
const vira_i18n_1 = require("vira-i18n");
const esmoI18Context = (0, react_1.createContext)({
    language: '',
    locales: [],
    t: () => '',
    setLanguage: () => { },
});
const esmoI18nProvider = ({ language, locales, children }) => {
    const [lang, setLang] = (0, react_1.useState)(language);
    (0, react_1.useMemo)(() => {
        setLang(language);
    }, [language]);
    const translator = new vira_i18n_1.I18n(lang, locales);
    const t = (resourcesKey) => {
        return translator.i18n(resourcesKey);
    };
    return (0, react_1.createElement)(esmoI18Context.Provider, {
        value: {
            language: lang,
            locales,
            t,
            setLanguage: setLang,
        },
    }, [children]);
};
exports.EsmoI18nProvider = esmoI18nProvider;
const useEsmoI18n = () => {
    const context = (0, react_1.useContext)(esmoI18Context);
    if (context === undefined)
        throw new Error('I18n context is undefined');
    return context;
};
exports.useEsmoI18n = useEsmoI18n;
