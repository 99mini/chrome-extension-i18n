/**
 * i18n 라이브러리에서 사용하는 공통 타입 정의
 */

// 전역 I18n 네임스페이스 타입을 참조
// 참고: .i18n/schema.d.ts에서 정의된 I18n 네임스페이스와 병합됩니다.
export namespace I18n {
  // 실제 타입은 .i18n/schema.d.ts에서 정의됩니다.
  // 여기서는 기본 타입만 제공합니다.
  export type Key = string;
  export type Language = string;
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
export interface I18nConfig {
  /**
   * output directory
   * @default './.i18n'
   * */
  outputDir?: string;
  /**
   * locales directory
   * @default './public/_locales'
   * */
  localesDir?: string;
  /**
   * default language
   * @default 'en'
   * */
  defaultLanguage?: string;
  /**
   * supported languages
   * @default ['en', 'ko']
   * */
  supportedLanguages?: string[];

  /**
   * debug mode
   * @default false
   * */
  debug?: boolean;
  /**
   * fallback language
   * @default 'en'
   * */
  fallbackLanguage?: string;
}
