import { FC } from 'react';
import { I18nContextProps, I18nProviderProps } from './types';
declare const esmoI18nProvider: FC<I18nProviderProps>;
export declare const useEsmoI18n: () => I18nContextProps;
export { esmoI18nProvider as EsmoI18nProvider };
