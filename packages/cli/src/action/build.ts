import { actionFn } from '../type';
import { buildLocalesAction } from './build-locales';
import { compileSchemaAction } from './compile-schema';

export const buildAction: actionFn = (options) => {
  buildLocalesAction(options);
  compileSchemaAction(options);
};
