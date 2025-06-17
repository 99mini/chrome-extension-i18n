import { useEffect, useRef } from 'react';

import i18n from '@99mini/i18n-vanilla';

const Vanilla = () => {
  const langElRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    i18n.i18n.updateElements();
  }, []);

  useEffect(() => {
    if (langElRef.current) {
      langElRef.current.textContent = i18n.currentLanguage();
    }
  }, []);

  const changeLanguageText = () => {
    if (langElRef.current) {
      langElRef.current.textContent = i18n.currentLanguage();
    }
  };

  return (
    <div>
      <button
        ref={langElRef}
        onClick={() => {
          if (i18n.currentLanguage() === 'en') {
            i18n.i18n.setLanguage('ko');
            changeLanguageText();
          } else {
            i18n.i18n.setLanguage('en');
            changeLanguageText();
          }
        }}
      />
      <h1 data-i18n="hello"></h1>
      <h1 data-i18n="hello-${name}" data-i18n-substitutions={JSON.stringify(['John'])}></h1>
    </div>
  );
};

export default Vanilla;
