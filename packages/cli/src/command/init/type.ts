export type I18nConfig = {
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
};
