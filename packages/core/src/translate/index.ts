/**
 * Chrome Extension의 i18n API를 사용하는 국제화 모듈
 */
import { I18n } from '@99mini/i18n-shared';

// 현재 브라우저 언어 설정 가져오기 (기본값: en)
export let currentLanguage = (navigator.language.split('-')[0] || 'en') as I18n.Language;

// 개발 환경에서 사용할 번역 데이터
let messages: Record<I18n.Language, Record<I18n.Key, string>> = { en: { '': '' } };

export const getCurrentLanguage = () => currentLanguage;

// 개발 환경에서 .i18n.json 파일 로드 함수
export const loadI18nData = async (path: string = './.i18n/i18n.json') => {
  if (process.env.NODE_ENV === 'development') {
    try {
      const response = await fetch(path);
      if (response.ok) {
        messages = await response.json();
        console.log('✅ 개발환경에서 i18n 모킹 데이터가 로드되었습니다.');
      } else {
        console.warn('⚠️ .i18n.json 파일을 가져오는데 실패했습니다:', response.status);
      }
    } catch (error) {
      console.warn('⚠️ .i18n.json 파일을 로드할 수 없습니다. 먼저 build-locales.js 스크립트를 실행해주세요.', error);
    }
  }

  return messages;
};

/**
 * 국제화된 텍스트 가져오기
 * @param key {I18n.Key | string} 키워드
 * @param substitutions 대체할 문자열 배열 (선택적)
 * @returns 번역된 텍스트
 */
export const t = (key: I18n.Key, substitutions?: string | string[]): string => {
  // Chrome Extension의 i18n API가 있는지 확인
  if (chrome?.i18n) {
    return chrome.i18n.getMessage(key, substitutions);
  }

  // 개발 환경에서는 로컬 .i18n.json 파일 사용
  if (messages[currentLanguage]?.[key]) {
    let result = messages[currentLanguage][key];

    // 간단한 대체문자열 처리
    if (substitutions) {
      const subs = Array.isArray(substitutions) ? substitutions : [substitutions];
      subs.forEach((sub, index) => {
        result = result.replace(`$${index + 1}`, sub);
      });
    }

    return result;
  }

  // 현재 언어에 없으면 영어 시도
  if (currentLanguage !== 'en' && messages['en']?.[key]) {
    return messages['en'][key];
  }

  // 개발 환경이나 API를 사용할 수 없는 경우 키 반환
  return key;
};

export default { t, currentLanguage, getCurrentLanguage };
