import chokidar from 'chokidar';
import fs from 'fs';
import path from 'path';

// import { configLoader } from '@99mini/i18n-shared';

function compileSchemaSync(basePath: string, outputPath: string) {
  const i18nJsonPath = path.join(basePath, 'i18n.json');

  const i18nJson = fs.readFileSync(i18nJsonPath, 'utf-8');

  const i18nJsonObj = JSON.parse(i18nJson);

  const languages = Object.keys(i18nJsonObj);
  const keys = Object.keys(i18nJsonObj[languages[0]]);

  const schemaPath = path.join(outputPath, 'schema.d.ts');

  const schema = `declare global {
  namespace I18n {
    type Key = ${keys.map((key) => `'${key}'`).join(' | ')};
    type Language = ${languages.map((language) => `'${language}'`).join(' | ')};
  }
}

export {}`;

  fs.writeFileSync(schemaPath, schema);
}

/**
 * @description
 * compile .i18n/i18n.json to .i18n/schema.d.ts
 * @param {string[]} args - args
 * @example
 * ```bash
 * i18n-cli compile-schema
 * ```
 *
 * ```json
 * // .i18n/i18n.json
 * {
 *   "en": {"hello": "Hello", "welcome": "Welcome"},
 *   "ko": {"hello": "안녕하세요", "welcome": "환영합니다"},
 *   "ja": {"hello": "こんにちは", "welcome": "ようこそ"}
 * }
 * ```
 *
 * ```typescript
 * // .i18n/schema.d.ts
 * namespace I18n {
 *   type Key = 'hello' | 'welcome';
 *   type Language = 'en' | 'ko' | 'ja';
 * }
 *
 * ```
 */
export async function compileSchema(args: string[]) {
  // const config = await configLoader.getConfig();
  // const basePath = config.outputDir || args.find((arg) => arg === '--base-path' || arg === '-b') || './.i18n';
  // const outputPath = config.outputDir || args.find((arg) => arg === '--output-path' || arg === '-o') || './.i18n';
  const basePath = args.find((arg) => arg === '--base-path' || arg === '-b') || './.i18n';
  const outputPath = args.find((arg) => arg === '--output-path' || arg === '-o') || './.i18n';

  const watchMode = args.includes('--watch');
  const backgroundMode = args.includes('--background');

  if (watchMode) {
    const watcher = chokidar.watch(path.join(basePath, 'i18n.json'), {
      persistent: true,
      ignoreInitial: true,
    });

    watcher.on('change', () => {
      compileSchemaSync(basePath, outputPath);
    });

    watcher.on('add', () => {
      compileSchemaSync(basePath, outputPath);
    });

    watcher.on('error', (error) => {
      console.error(error);
    });

    if (!backgroundMode) {
      process.on('SIGINT', () => {
        console.log('\n🔔 schema compile watch mode stopped');
        watcher.close().then(() => process.exit(0));
      });

      setInterval(() => {}, 1000);
    }
  } else {
    compileSchemaSync(basePath, outputPath);
    process.exit(0);
  }
}
