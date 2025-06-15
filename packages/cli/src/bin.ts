#!/usr/bin/env node
/**
 * Chrome Extension i18n CLI
 *
 * 사용법:
 * i18n-cli build-locales [옵션]
 */
import pkg from '../package.json';
import { buildAction, buildLocalesAction, compileSchemaAction, initAction, statusAction } from './command';
import { program } from 'commander';

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
  .description('초기화: tsconfig.json, .gitignore 설정 및 기본 설정 파일 생성')
  .option('-f, --force', '기존 설정 파일 덮어쓰기')
  .option('-c, --config <path>', '설정 파일 경로 지정')
  .action(initAction);

// 명령어가 없는 경우 도움말 표시
program.on('command:*', () => {
  console.error('알 수 없는 명령어입니다.');
  console.error('도움말을 보려면: i18n-cli --help');
  process.exit(1);
});

// CLI 실행
program.parse(process.argv);

// 명령어가 입력되지 않은 경우 도움말 표시
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
