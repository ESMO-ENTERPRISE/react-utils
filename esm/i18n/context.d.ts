import { FC } from 'react';
import { I18nContextProps, I18nProviderProps } from './types';
declare const i18nProvider: FC<I18nProviderProps>;
export declare const useI18n: () => I18nContextProps;
export { i18nProvider };
