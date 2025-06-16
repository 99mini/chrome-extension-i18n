#!/usr/bin/env node
/**
 * Chrome Extension i18n CLI
 *
 * 사용법:
 * i18n-cli build-locales [옵션]
 */
import { program } from 'commander';

import { buildAction, buildLocalesAction, compileSchemaAction, initAction, statusAction } from './command';

import pkg from '../package.json';

// CLI 버전 정보
const version = pkg.version;

// CLI 프로그램 설정
program.name('i18n-cli').description(pkg.description).version(version);

// build-locales 명령어 설정
program
  .command('build-locales')
  .description('build locales json')
  .option('-w, --watch', 'watch mode')
  .option('-b, --background', 'background mode')
  .option('--locales-path <path>', '_locales path', 'public/_locales')
  .option('--output-path <path>', 'output path', './.i18n')
  .action(buildLocalesAction);

program
  .command('compile-schema')
  .description('compile .i18n/i18n.json to .i18n/schema.d.ts')
  .option('-w, --watch', 'watch mode')
  .option('-b, --background', 'background mode')
  .option('--base-path <path>', 'base path', './.i18n')
  .option('--output-path <path>', 'output path', './.i18n')
  .action(compileSchemaAction);

program
  .command('build')
  .description('build locales json and compile schema')
  .option('-w, --watch', 'watch mode')
  .option('-b, --background', 'background mode')
  .option('--locales-path <path>', '_locales path', 'public/_locales')
  .option('--output-path <path>', 'output path', './.i18n')
  .option('--base-path <path>', 'base path', './.i18n')
  .action(buildAction);

program.command('status').description('check translation status').action(statusAction);

program
  .command('init')
  .description('initialize: tsconfig.json, .gitignore settings and default config file')
  .option('-f, --force', 'force overwrite')
  .option('-e, --ext <ext>', 'config file extension (supported: js, ts, mjs, cjs, json, rc)', 'js')
  .option('-o, --output-dir <path>', 'output directory', './.i18n')
  .option('-l, --locales-dir <path>', 'locales directory', 'public/_locales')
  .option('-d, --default-language <language>', 'default language', 'en')
  .option('-s, --supported-languages <languages>', 'supported languages', 'en,ko')
  .action(initAction);

// 명령어가 없는 경우 도움말 표시
program.on('command:*', () => {
  console.error('Unknown command');
  console.error('Run `i18n-cli --help` to see available commands');
  process.exit(1);
});

// CLI 실행
program.parse(process.argv);

// 명령어가 입력되지 않은 경우 도움말 표시
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
