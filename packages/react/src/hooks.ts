/**
 * I18n 관련 React 훅
 */
import { useContext } from 'react';

import { I18nContext } from './context';

/**
 * i18n 훅
 * @returns i18n 기능 (t, language, setLanguage, messages)
 */
export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
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
