/**
 * i18n 라이브러리에서 사용하는 공통 상수 정의
 */

/**
 * 기본 언어 코드
 */
export const DEFAULT_LANGUAGE = 'en';

/**
 * 개발 환경에서 사용하는 i18n 데이터 경로
 */
export const DEFAULT_I18N_PATH = './.i18n/i18n.json';

/**
 * 언어 변경 이벤트 이름
 */
export const LANGUAGE_CHANGE_EVENT = 'i18n-language-change';

/**
 * i18n 속성 이름 (DOM 요소에 사용)
 */
export const I18N_ATTRIBUTE = 'data-i18n';

/**
 * i18n 파라미터 속성 이름 (DOM 요소에 사용)
 */
export const I18N_PARAMS_ATTRIBUTE = 'data-i18n-params';

/**
 * 지원하는 언어 목록
 */
export const SUPPORTED_LANGUAGES = ['en', 'ko'];

/**
 * 개발 환경 여부
 */
export const IS_DEVELOPMENT = process.env.NODE_ENV !== 'production';
