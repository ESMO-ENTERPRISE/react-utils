import { FC, createContext, createElement, useContext, useMemo, useState } from 'react';
import { I18n } from 'vira-i18n';

import { I18nContextProps, I18nProviderProps } from './types';

const I18Context = createContext<I18nContextProps>({
    language: '',
    locales: [],
    
    i18n: () => '',
    setLanguage: () => {},
});

export const I18nProvider: FC<I18nProviderProps> = ({ language, locales, children }) => {
    const [lang, setLang] = useState(language);

    useMemo(() => {
        setLang(language);
    }, [language]);

    const translator = new I18n(lang, locales);

    const i18n = (resourcesKey: string) => {
        return translator.i18n(resourcesKey);
    }

    return createElement(
        I18Context.Provider,
        {
            value: {
                language: lang,
                locales,
                i18n,
                setLanguage: setLang,
            },
        },
        [children]
    );
};

export const useI18n = (): I18nContextProps => {
    const context = useContext(I18Context);

    if (context === undefined)
        throw new Error('I18n context is undefined');
        
    return context;
}