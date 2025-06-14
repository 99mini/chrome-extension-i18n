#!/usr/bin/env node
/**
 * Chrome Extension i18n CLI
 * 
 * 사용법:
 * i18n-cli build-locales [옵션]
 */
import { program } from 'commander';
import { buildLocalesSync } from './service';

import pkg from '../package.json';

// CLI 버전 정보
const version = pkg.version;

// CLI 프로그램 설정
program
  .name('i18n-cli')
  .description(pkg.description)
  .version(version);

// build-locales 명령어 설정
program
  .command('build')
  .description('public/_locales 폴더를 기준으로 i18n.json 파일을 생성합니다')
  .option('-w, --watch', '파일 변경 감지 모드로 실행')
  .option('-b, --background', '백그라운드 모드로 실행 (비동기적으로 실행하고 종료하지 않음)')
  .option('--locales-path <path>', '_locales 폴더 경로 지정')
  .option('--output-path <path>', '출력 폴더 경로 지정')
  .action((options) => {
    const args: string[] = [];
    
    if (options.watch) {
      args.push('--watch');
    }
    
    if (options.background) {
      args.push('--background');
    }
    
    if (options.localesPath) {
      args.push('--locales-path', options.localesPath);
    }
    
    if (options.outputPath) {
      args.push('--output-path', options.outputPath);
    }
    
    // buildLocalesSync 함수 실행
    buildLocalesSync(args);
  });

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
