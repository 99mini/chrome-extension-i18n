import { I18nConfig } from '@99mini/i18n-cli';

const config: I18nConfig = {
  /** output directory */
  outputDir: './.i18n',

  /** locales directory */
  localesDir: 'public/_locales',

  /** default language */
  defaultLanguage: 'en',

  /** supported languages */
  supportedLanguages: ['en', 'ko'],
};

export default config;
