/**
 * Chrome Extension의 i18n API를 사용하는 React 컴포넌트 및 훅
 */

// 컨텍스트 내보내기
export { I18nContext, type I18nContextType } from './context';

// 제공자 컴포넌트 내보내기
export { I18nProvider, type I18nProviderProps } from './provider';

// 훅 내보내기
export { useI18n, useTranslation } from './hooks';

// 컴포넌트 내보내기
export { Trans } from './components';

// 코어 기능도 내보내기
export { t, getCurrentLanguage, loadI18nData } from '@99mini/i18n';
