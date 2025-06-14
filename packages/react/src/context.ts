import { createContext } from 'react';

import { Language, LocaleMessages } from '@99mini/i18n';

/**
 * I18n 컨텍스트 타입 정의
 */
export interface I18nContextType {
  t: (key: I18n.Key, substitutions?: string | string[]) => string;
  language: Language;
  setLanguage: (lang: Language) => void;
  messages: LocaleMessages;
}

/**
 * I18n 컨텍스트 생성
 */
export const I18nContext = createContext<I18nContextType | null>(null);
