import i18n from '@99mini/i18n-vanilla';

const Vanilla = () => {
  return (
    <div>
      <h1>{i18n.currentLanguage}</h1>
      <h1>{i18n.t('hello')}</h1>
      <h1>{i18n.t('hello-${name}', ['John'])}</h1>
    </div>
  );
};

export default Vanilla;
