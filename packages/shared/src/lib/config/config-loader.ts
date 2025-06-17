/**
 * @see https://github.com/eslint/eslint/blob/main/lib/config/config-loader.js
 *
 */
import fsSync from 'fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

import { I18nConfig } from '../../types';

export const defaultConfig: I18nConfig = {
  outputDir: './.i18n',
  localesDir: './_locales',
  defaultLanguage: 'en',
  supportedLanguages: ['en', 'ko'],
};

const FLAT_CONFIG_FILENAMES = [
  'i18n.config.js',
  'i18n.config.mjs',
  'i18n.config.cjs',
  'i18n.config.ts',
  'i18n.config.mts',
  'i18n.config.cts',
  'i18n.config.json',
  '.i18n.config.json',
  'i18nrc',
  '.i18nrc',
];

const importedConfigFileModificationTime = new Map();

/**
 * Dynamically imports a module from the given file path.
 * @param {string} filePath The absolute file path of the module to import.
 * @param {URL} fileURL The file URL to load.
 * @param {number} mtime The last modified timestamp of the file.
 */
async function dynamicImportConfig(filePath: string, fileURL: URL, mtime: number) {
  const module = await import(fileURL.href);

  importedConfigFileModificationTime.set(filePath, mtime);

  return module.default;
}

function isFileJS(filePath: string): boolean {
  const fileExtension = path.extname(filePath);

  return /^\.[mc]?js$/u.test(fileExtension);
}

/**
 * @description check file is typescript file
 * @param {string} filePath - file path
 * @returns {boolean} - is typescript file
 */
function isFileTS(filePath: string): boolean {
  const fileExtension = path.extname(filePath);

  return /^\.[mc]?ts$/u.test(fileExtension);
}

/**
 * @description check file is json file
 * @param {string} filePath - file path
 * @returns {boolean} - is json file
 */
function isFileJSON(filePath: string): boolean {
  const fileExtension = path.extname(filePath);

  return /^\.json$/u.test(fileExtension);
}

/**
 * @description check file is rc file
 * @param {string} filePath - file path
 * @returns {boolean} - is rc file
 */
function isFileRC(filePath: string): boolean {
  const fileName = path.basename(filePath);

  return /^rc$/u.test(fileName);
}

/**
 * @description internal function
 */
async function loadConfig(): Promise<I18nConfig> {
  try {
    const configPath = FLAT_CONFIG_FILENAMES.find((fileName) => fsSync.existsSync(path.join(process.cwd(), fileName)));

    /**
     * return default config
     */
    if (!configPath) {
      return defaultConfig;
    }

    const fileURL = pathToFileURL(configPath);
    const mtime = (await fs.stat(configPath)).mtime.getTime();

    fileURL.searchParams.append('mtime', mtime.toString());

    if (importedConfigFileModificationTime.get(configPath) !== mtime) {
      delete require.cache[configPath];
    }

    const isTS = isFileTS(configPath);
    const isJS = isFileJS(configPath);

    const isJSON = isFileJSON(configPath);
    const isRC = isFileRC(configPath);

    if (isTS) {
      return dynamicImportConfig(configPath, fileURL, mtime);
    }

    if (isJS) {
      return dynamicImportConfig(configPath, fileURL, mtime);
    }

    if (isJSON || isRC) {
      importedConfigFileModificationTime.set(configPath, mtime);
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      return require(path.join(process.cwd(), configPath));
    }

    console.debug('[INFO] return default config');

    return defaultConfig;
  } catch (error) {
    console.error('[ERR] Failed to load i18n config:', error);
    return defaultConfig;
  }
}

class ConfigLoader {
  private instance: ConfigLoader | null = null;
  private config: I18nConfig | null = null;

  constructor() {
    this.loadConfig();
  }

  private async loadConfig() {
    if (!this.config) {
      this.config = await loadConfig();
    }
    return this.config;
  }

  getInstance(): ConfigLoader {
    if (!this.instance) {
      this.instance = new ConfigLoader();
    }
    return this.instance;
  }

  async getConfig(): Promise<I18nConfig> {
    return await this.loadConfig();
  }
}

export const configLoader = new ConfigLoader();
