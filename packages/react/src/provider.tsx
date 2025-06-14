/**
 * I18n 제공자 컴포넌트
 */
import React, { ReactNode, useEffect, useState } from 'react';

import { I18nContext, I18nContextType } from './context';
import { Language, LocaleMessages, getCurrentLanguage, loadI18nData, t as translate } from '@99mini/i18n';

// I18n 제공자 속성 타입 정의
export interface I18nProviderProps {
  children: ReactNode;
  initialLanguage?: Language;
  i18nPath?: string;
}

/**
 * I18n 제공자 컴포넌트
 */
export const I18nProvider = ({ children, initialLanguage, i18nPath = './.i18n/i18n.json' }: I18nProviderProps) => {
  // 현재 언어 상태
  const [language, setLanguage] = useState<Language>(initialLanguage || getCurrentLanguage());
  // 메시지 상태
  const [messages, setMessages] = useState<LocaleMessages>({ ko: {}, en: {} });

  // 초기 로딩
  useEffect(() => {
    const loadMessages = async () => {
      const data = await loadI18nData(i18nPath);
      if (data) {
        setMessages(data);
      }
    };

    loadMessages();
  }, [i18nPath]);

  // t 함수 래핑 (현재 언어 적용)
  const t = (key: string, substitutions?: string | string[]): string => {
    return translate(key, substitutions);
  };

  // 컨텍스트 값
  const contextValue: I18nContextType = {
    t,
    language,
    setLanguage,
    messages,
  };

  return <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>;
};
