/**
 * Chrome Extension의 i18n API를 사용하는 국제화 모듈 (코어)
 */

export type Language = 'ko' | 'en' | string;
export type Messages = Record<string, string>;
export type LocaleMessages = Record<Language, Messages>;

// 현재 브라우저 언어 설정 가져오기 (기본값: ko)
export const getCurrentLanguage = (): Language => {
  return (navigator.language.split('-')[0] || 'ko');
};

// 개발 환경에서 사용할 번역 데이터
let messages: LocaleMessages = {
  ko: {},
  en: {},
};

// 개발 환경에서 .i18n.json 파일 로드 함수
export const loadI18nData = async (path: string = './.i18n/i18n.json'): Promise<LocaleMessages | null> => {
  if (typeof window === 'undefined') return null;
  
  if (process.env.NODE_ENV === 'development') {
    try {
      const response = await fetch(path);
      if (response.ok) {
        const data = await response.json();
        messages = data;
        console.log('✅ 개발환경에서 i18n 모킹 데이터가 로드되었습니다.');
        return data;
      } else {
        console.warn('⚠️ .i18n.json 파일을 가져오는데 실패했습니다:', response.status);
      }
    } catch (error) {
      console.warn('⚠️ .i18n.json 파일을 로드할 수 없습니다. 먼저 build-locales.js 스크립트를 실행해주세요.', error);
    }
  }
  return null;
};

/**
 * 대체 문자열 처리 함수
 * @param message 원본 메시지
 * @param substitutions 대체할 문자열 배열 (선택적)
 * @returns 대체된 메시지
 */
export const processSubstitutions = (message: string, substitutions?: string | string[]): string => {
  if (!substitutions) return message;
  
  let result = message;
  const subs = Array.isArray(substitutions) ? substitutions : [substitutions];
  
  subs.forEach((sub, index) => {
    result = result.replace(`$${index + 1}`, sub);
  });
  
  return result;
};

/**
 * 국제화된 텍스트 가져오기
 * @param key 키워드
 * @param substitutions 대체할 문자열 배열 (선택적)
 * @param language 사용할 언어 (선택적, 기본값: 현재 브라우저 언어)
 * @returns 번역된 텍스트
 */
export const t = (key: string, substitutions?: string | string[], language?: Language): string => {
  const currentLanguage = language || getCurrentLanguage();
  
  // Chrome Extension의 i18n API가 있는지 확인
  if (typeof chrome !== 'undefined' && chrome?.i18n) {
    return chrome.i18n.getMessage(key, substitutions);
  }

  // 개발 환경에서는 로컬 .i18n.json 파일 사용
  if (messages[currentLanguage]?.[key]) {
    return processSubstitutions(messages[currentLanguage][key], substitutions);
  }

  // 현재 언어에 없으면 영어 시도
  if (currentLanguage !== 'en' && messages['en']?.[key]) {
    return processSubstitutions(messages['en'][key], substitutions);
  }

  // 개발 환경이나 API를 사용할 수 없는 경우 키 반환
  return key;
};

export default { t, getCurrentLanguage, loadI18nData };
