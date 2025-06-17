import { actionFn } from '../../type';
import { buildLocalesAction } from '../locales/action';
import { compileSchemaAction } from '../schema/action';

export const buildAction: actionFn = async (options) => {
  await buildLocalesAction(options);
  await compileSchemaAction(options);
};
