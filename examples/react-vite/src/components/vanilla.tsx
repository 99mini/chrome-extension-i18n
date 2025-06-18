import { useEffect, useRef } from 'react';

import i18n from '@99mini/i18n-vanilla';

const style: Record<string, React.CSSProperties> = {
  codeContainer: {
    padding: '10px',
    borderRadius: '5px',
    overflowX: 'auto',
    backgroundColor: '#f5f5f5',
    display: 'flex',
    flexDirection: 'column',
  },
  code: {
    whiteSpace: 'pre',
    textAlign: 'left',
    color: '#333',
  },
};

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
      <p>
        useing <code>'data-i18n'</code> attribute
      </p>
      <div style={style.codeContainer}>
        <code style={style.code}>{`<h1 data-i18n="hello"></h1>`}</code>
        <code
          style={style.code}
        >{`<h1 data-i18n="hello-\${name}" data-i18n-substitutions={JSON.stringify(['John'])}></h1>`}</code>
      </div>
      <h1 data-i18n="hello"></h1>
      <h1 data-i18n="hello-${name}" data-i18n-substitutions={JSON.stringify(['John'])}></h1>
      <p>
        useing <code>'t'</code> function
      </p>
      <div style={style.codeContainer}>
        <code style={style.code}>{`<h1>{i18n.t('hello')}</h1>`}</code>
        <code style={style.code}>{`<h1>{i18n.t('hello-\${name}', ['John'])}</h1>`}</code>
      </div>
      <h1>{i18n.t('hello')}</h1>
      <h1>{i18n.t('hello-${name}', ['John'])}</h1>
    </div>
  );
};

export default Vanilla;
