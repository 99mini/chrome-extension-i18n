/**
 * i18n 라이브러리에서 사용하는 공통 타입 정의
 */

export namespace I18n {
  export type Language = 'en';
  export type Key = '';
}

/**
 * 지원하는 언어 코드
 */
export type Language = I18n.Language;

/**
 * 메시지 키워드
 */
export type I18nKey = I18n.Key;

/**
 * 메시지 객체 타입
 */
export type Messages = Record<string, string>;

/**
 * 언어별 메시지 객체 타입
 */
export type LocaleMessages = Record<Language, Messages>;

/**
 * Chrome Extension의 messages.json 파일에서 사용하는 메시지 항목 타입
 */
export interface ChromeI18nMessage {
  message: string;
  description?: string;
  placeholders?: Record<
    string,
    {
      content: string;
      example?: string;
    }
  >;
}

/**
 * Chrome Extension의 messages.json 파일 타입
 */
export type ChromeI18nMessages = Record<string, ChromeI18nMessage>;

/**
 * 번역 함수 타입
 */
export type TranslateFunction = (key: string, substitutions?: string | string[], language?: Language) => string;

/**
 * I18n 설정 옵션
 */
export interface I18nOptions {
  /** 초기 언어 */
  initialLanguage?: Language;
  /** i18n 데이터 경로 */
  i18nPath?: string;
  /** 디버그 모드 활성화 여부 */
  debug?: boolean;
  /** 기본 언어 (번역이 없을 때 사용) */
  fallbackLanguage?: Language;
}
