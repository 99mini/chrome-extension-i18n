/**
 * I18n 제공자 컴포넌트
 */
import React, { ReactNode, useEffect, useState } from 'react';

import { currentLanguage, loadI18nData, setLanguage, t as translate } from '@99mini/i18n';

import { I18nContext, I18nContextType } from './context';

// t 함수 래핑 (현재 언어 적용)
const t: typeof translate = (key, substitutions) => {
  return translate(key, substitutions);
};

// 컨텍스트 값

// I18n 제공자 속성 타입 정의
export interface I18nProviderProps {
  children: ReactNode;
}

/**
 * I18n 제공자 컴포넌트
 */
export const I18nProvider = ({ children }: I18nProviderProps) => {
  const [language, _setLanguage] = useState(() => currentLanguage());
  // 초기 로딩
  useEffect(() => {
    const loadMessages = async () => {
      await loadI18nData('./.i18n/i18n.json');
    };

    loadMessages();
  }, []);

  const contextValue: I18nContextType = {
    t,
    language,
    setLanguage: (lang: I18n.Language) => {
      setLanguage(lang);
      _setLanguage(lang);
    },
  };

  return <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>;
};
