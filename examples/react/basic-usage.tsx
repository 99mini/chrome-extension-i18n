/**
 * @99mini/i18n-react 기본 사용법 예제
 */
import React, { useEffect, useState } from "react";
import { I18nProvider, useI18n, useTranslation, Trans } from "@99mini/i18n-react";

// 언어 선택 컴포넌트
const LanguageSelector = () => {
  const { language, setLanguage } = useI18n();

  return (
    <div>
      <h3>언어 선택</h3>
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="ko">한국어</option>
        <option value="en">English</option>
      </select>
    </div>
  );
};

// 번역된 텍스트를 사용하는 컴포넌트
const WelcomeMessage = () => {
  const { t } = useI18n();
  // 또는 useTranslation 훅을 사용할 수도 있습니다
  // const t = useTranslation();

  return (
    <div>
      <h1>{t("welcome")}</h1>
      <p>{t("greeting", "John")}</p>
      <p>{t("notification", ["John", "3"])}</p>
    </div>
  );
};

// Trans 컴포넌트 사용 예제
const NotificationComponent = () => {
  return (
    <div>
      <h3>알림</h3>
      <p>
        <Trans id="welcome" />
      </p>
      <p>
        <Trans id="greeting" substitutions="John" />
      </p>
      <p>
        <Trans id="notification" substitutions={["John", "3"]} />
      </p>
    </div>
  );
};

// 메인 앱 컴포넌트
const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 로딩 상태 시뮬레이션
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <I18nProvider initialLanguage="ko">
      <div className="app">
        <LanguageSelector />
        <hr />
        <WelcomeMessage />
        <hr />
        <NotificationComponent />
      </div>
    </I18nProvider>
  );
};

export default App;
