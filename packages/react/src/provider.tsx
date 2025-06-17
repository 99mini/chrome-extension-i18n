/**
 * I18n 제공자 컴포넌트
 */
import React, { ReactNode, useEffect, useState } from 'react';

import { LocaleMessages, currentLanguage, loadI18nData, setLanguage, t as translate } from '@99mini/i18n';
import { configLoader } from '@99mini/i18n-shared';

import { I18nContext, I18nContextType } from './context';

// I18n 제공자 속성 타입 정의
export interface I18nProviderProps {
  children: ReactNode;
  initialLanguage?: I18n.Language;
}

/**
 * I18n 제공자 컴포넌트
 */
export const I18nProvider = ({ children, initialLanguage }: I18nProviderProps) => {
  // 현재 언어 상태
  const [language, _setLanguage] = useState<I18n.Language>(initialLanguage || currentLanguage());
  // 메시지 상태
  const [messages, setMessages] = useState<LocaleMessages>({ ko: {}, en: {} });

  // 초기 로딩
  useEffect(() => {
    const loadMessages = async () => {
      const config = await configLoader.getConfig();

      const data = await loadI18nData(`${config.outputDir}/i18n.json`);
      if (data) {
        setMessages(data);
      }
    };

    loadMessages();
  }, []);

  // t 함수 래핑 (현재 언어 적용)
  const t: typeof translate = (key, substitutions) => {
    return translate(key, substitutions);
  };

  // 컨텍스트 값
  const contextValue: I18nContextType = {
    t,
    language,
    setLanguage: (lang: I18n.Language) => {
      _setLanguage(lang);
      setLanguage(lang);
    },
    messages,
  };

  return <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>;
};
