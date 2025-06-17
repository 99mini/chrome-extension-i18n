import { initProject } from './service';

import { actionFn } from '../../type';

/**
 * i18n-cli init 명령어 처리 함수
 * 프로젝트 초기화를 수행합니다.
 */
export const initAction: actionFn = (options) => {
  console.log('🚀 init @99mini/i18n');

  const force = options.force === 'true';

  const ext = options.ext || 'js';
  const outputDir = options.outputDir || './.i18n';
  const localesDir = options.localesDir || './public/_locales';
  const defaultLanguage = options.defaultLanguage || 'en';
  const supportedLanguages = options.supportedLanguages.split(',') || ['en', 'ko'];
  const debug = options.debug === 'true';
  const fallbackLanguage = options.fallbackLanguage || 'en';

  // 프로젝트 초기화 실행
  initProject({ force, ext, outputDir, localesDir, defaultLanguage, supportedLanguages, debug, fallbackLanguage });
};
