import baseConfig from '../../eslint.config.js';

export default [
  {
    ...baseConfig,
    rules: {
      ...baseConfig.rules,
      '@typescript-eslint/no-empty-interface': 'error',
    },
  },
];
