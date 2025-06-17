/**
 * Chrome Extension의 i18n API를 사용하는 국제화 모듈
 */
import { I18n, I18nConfig, configLoader, defaultConfig } from '@99mini/i18n-shared';

let config: I18nConfig = defaultConfig;

configLoader.getConfig().then((_config) => (config = _config));

const store = {
  _language: (config.defaultLanguage || navigator.language.split('-')[0]) as I18n.Language,
  _messages: {} as Record<I18n.Language, Record<I18n.Key, string>>,
  get language() {
    return this._language;
  },
  set language(lang: I18n.Language) {
    this._language = lang;
  },
  get messages() {
    return this._messages;
  },
  set messages(messages: Record<I18n.Language, Record<I18n.Key, string>>) {
    this._messages = messages;
  },
};

// 현재 브라우저 언어 설정 가져오기 (기본값: en)
export const currentLanguage: () => I18n.Language = () => store.language;

export const setLanguage = (lang: I18n.Language): void => {
  store.language = lang;
};

// 개발 환경에서 .i18n.json 파일 로드 함수
export const loadI18nData = async (jsonPath: string = './.i18n/i18n.json') => {
  if (process.env.NODE_ENV === 'development' || config.debug) {
    try {
      const response = await fetch(`${config.outputDir ? `${config.outputDir}/i18n.json` : jsonPath}`);
      if (response.ok) {
        store.messages = await response.json();
        console.debug('✅ 개발환경에서 i18n 모킹 데이터가 로드되었습니다.');
      } else {
        console.warn('⚠️ .i18n.json 파일을 가져오는데 실패했습니다:', response.status);
      }
    } catch (error) {
      console.warn('⚠️ .i18n.json 파일을 로드할 수 없습니다. @99mini/i18n-cli를 사용해주세요.', error);
    }
  }

  return store.messages;
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
  if (store.messages[currentLanguage()]?.[key]) {
    let result = store.messages[currentLanguage()][key];

    // 간단한 대체문자열 처리
    if (substitutions) {
      const subs = Array.isArray(substitutions) ? substitutions : [substitutions];
      subs.forEach((sub, index) => {
        result = result.replace(`$${index + 1}`, sub);
      });
    }

    return result;
  }

  // 현재 언어에 없으면 fallbackLanguage -> defaultLanguage -> 'en' 순서로 사용
  if (store.messages[config.fallbackLanguage || config.defaultLanguage || 'en']?.[key]) {
    return store.messages[config.fallbackLanguage || config.defaultLanguage || 'en'][key];
  }

  // 개발 환경이나 API를 사용할 수 없는 경우 키 반환
  return key;
};

export default { t, currentLanguage, setLanguage };
