import { spawn } from 'child_process';

import { compileSchema } from './service';

import { actionFn } from '../../type';

export const compileSchemaAction: actionFn = (options) => {
  const args: string[] = [];

  if (options.watch) {
    args.push('--watch');
  }

  if (options.background) {
    const scriptPath = __filename;
    const childArgs = ['compile-schema'];
    const child = spawn(process.execPath, [scriptPath, ...childArgs], {
      detached: true,
      stdio: 'ignore',
    });
    child.unref();
    return;
  }

  compileSchema(args);
};
