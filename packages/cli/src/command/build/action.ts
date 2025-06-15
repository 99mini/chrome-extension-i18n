import { actionFn } from '../../type';
import { buildLocalesAction } from '../locales/action';
import { compileSchemaAction } from '../schema/action';

export const buildAction: actionFn = (options) => {
  buildLocalesAction(options);
  compileSchemaAction(options);
};
