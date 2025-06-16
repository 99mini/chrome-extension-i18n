import type { ReactNode } from 'react';

import { I18nProvider, Trans, useI18n, useTranslation } from '@99mini/i18n-react';

const ReactLifecycleI18nProvider = ({ children }: { children: ReactNode }) => {
  return <I18nProvider>{children}</I18nProvider>;
};

const I18nComponent = () => {
  const { t } = useI18n();
  return (
    <div>
      <h1>{t('hello')}</h1>
      <h1>{t('hello-${name}', ['John'])}</h1>
    </div>
  );
};

const TranslationComponent = () => {
  const t = useTranslation();
  return (
    <div>
      <h1>{t('hello')}</h1>
      <h1>{t('hello-${name}', ['John'])}</h1>
    </div>
  );
};

const TransComponent = () => {
  return (
    <h1>
      <Trans keyword="hello" />
      <Trans keyword="hello-${name}" substitutions={['John']} />
    </h1>
  );
};

const ReactLifecycle = () => {
  return (
    <ReactLifecycleI18nProvider>
      <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <I18nComponent />
        <TranslationComponent />
        <TransComponent />
      </div>
    </ReactLifecycleI18nProvider>
  );
};

export default ReactLifecycle;
