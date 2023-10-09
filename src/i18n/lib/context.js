import { createContext, createElement, useContext, useMemo, useState } from 'react';
import { I18n } from 'vira-i18n';
const esmoI18Context = createContext({
    language: '',
    locales: [],
    t: () => '',
    setLanguage: () => { },
});
const esmoI18nProvider = ({ language, locales, children }) => {
    const [lang, setLang] = useState(language);
    useMemo(() => {
        setLang(language);
    }, [language]);
    const translator = new I18n(lang, locales);
    const t = (resourcesKey) => {
        return translator.i18n(resourcesKey);
    };
    return createElement(esmoI18Context.Provider, {
        value: {
            language: lang,
            locales,
            t,
            setLanguage: setLang,
        },
    }, [children]);
};
export const useEsmoI18n = () => {
    const context = useContext(esmoI18Context);
    if (context === undefined)
        throw new Error('I18n context is undefined');
    return context;
};
export { esmoI18nProvider as EsmoI18nProvider };
