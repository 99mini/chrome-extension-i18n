/**
 * Chrome Extension의 i18n API를 사용하는 React 컴포넌트 및 훅
 */
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import i18nCore, { t as translate, getCurrentLanguage, loadI18nData, Language, LocaleMessages } from "@99mini/i18n";

// I18n 컨텍스트 타입 정의
interface I18nContextType {
  t: typeof translate;
  language: Language;
  setLanguage: (lang: Language) => void;
  messages: LocaleMessages;
}

// I18n 컨텍스트 생성
const I18nContext = createContext<I18nContextType | null>(null);

// I18n 제공자 속성 타입 정의
interface I18nProviderProps {
  children: ReactNode;
  initialLanguage?: Language;
  i18nPath?: string;
}

/**
 * I18n 제공자 컴포넌트
 */
export const I18nProvider = ({ children, initialLanguage, i18nPath = "./.i18n/i18n.json" }: I18nProviderProps) => {
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
    return translate(key, substitutions, language);
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

/**
 * i18n 훅
 * @returns i18n 기능 (t, language, setLanguage, messages)
 */
export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
};

/**
 * 번역 훅
 * @returns 번역 함수 (t)
 */
export const useTranslation = () => {
  const { t } = useI18n();
  return t;
};

/**
 * 번역된 텍스트를 표시하는 컴포넌트
 */
interface TransProps {
  id: string;
  substitutions?: string | string[];
}

export const Trans = ({ id, substitutions }: TransProps) => {
  const { t } = useI18n();
  return <>{t(id, substitutions)}</>;
};

// 코어 기능도 내보내기
export { translate as t, getCurrentLanguage, loadI18nData };

// 기본 내보내기
export default {
  I18nProvider,
  useI18n,
  useTranslation,
  Trans,
  t: translate,
  getCurrentLanguage,
  loadI18nData,
};
