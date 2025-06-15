import { spawn } from 'child_process';

import { status } from './service';

import { actionFn } from '../../type';

export const statusAction: actionFn = (options) => {
  const args: string[] = [];

  if (options.watch) {
    args.push('--watch');
  }

  if (options.background) {
    const scriptPath = __filename;
    const childArgs = ['status'];
    const child = spawn(process.execPath, [scriptPath, ...childArgs], {
      detached: true,
      stdio: 'ignore',
    });
    child.unref();
    return;
  }

  const missingKeys = status(args);

  if (missingKeys.length === 0) {
    console.log('No missing keys found');
    return;
  }

  console.table(missingKeys, Object.keys(missingKeys[0]));
};
