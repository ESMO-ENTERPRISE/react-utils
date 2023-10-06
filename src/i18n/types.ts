import { ReactNode } from 'react';
import { ILocale } from 'vira-i18n';

export interface I18nContextProps {
    language: string;
    locales: Array<ILocale>;
    
    setLanguage(language: string): void;
    t: (resourcesKey: string) => string;
}

export interface I18nProviderProps {
    language: string;
    locales: Array<ILocale>;
    children?: ReactNode
}