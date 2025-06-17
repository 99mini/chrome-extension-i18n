import { useEffect } from 'react';

import i18n from '@99mini/i18n-vanilla';

const Vanilla = () => {
  useEffect(() => {
    i18n.i18n.updateElements();
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          if (i18n.currentLanguage() === 'en') {
            i18n.i18n.setLanguage('ko');
          } else {
            i18n.i18n.setLanguage('en');
          }
        }}
      >
        {i18n.currentLanguage()}
      </button>
      <h1 data-i18n="hello"></h1>
      <h1 data-i18n="hello-${name}" data-i18n-substitutions={JSON.stringify(['John'])}></h1>
    </div>
  );
};

export default Vanilla;
