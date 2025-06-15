import { actionFn } from '../../type';
import { buildLocalesSync } from './service';
import { spawn } from 'child_process';

export const buildLocalesAction: actionFn = (options) => {
  const args: string[] = [];

  if (options.watch) {
    args.push('--watch');
  }

  if (options.localesPath) {
    args.push('--locales-path', options.localesPath);
  }

  if (options.outputPath) {
    args.push('--output-path', options.outputPath);
  }

  if (options.background) {
    // 현재 스크립트 경로
    const scriptPath = __filename;

    // 같은 명령어를 백그라운드 옵션 없이 실행
    const childArgs = ['build'];

    if (options.watch) {
      childArgs.push('--watch');
    }

    if (options.localesPath) {
      childArgs.push('--locales-path', options.localesPath);
    }

    if (options.outputPath) {
      childArgs.push('--output-path', options.outputPath);
    }

    // 자식 프로세스 실행
    const child = spawn(process.execPath, [scriptPath, ...childArgs], {
      detached: true,
      stdio: 'ignore',
    });

    // 부모 프로세스와 연결 해제
    child.unref();
    return;
  }

  // buildLocalesSync 함수 실행
  buildLocalesSync(args);
};
