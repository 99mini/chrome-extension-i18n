/**
 * @99mini/i18n-vanilla 기본 사용법 예제
 */
import i18nVanilla from "@99mini/i18n-vanilla";

// 기본 인스턴스 사용
const { i18n, t } = i18nVanilla;

// DOM이 로드된 후 실행
document.addEventListener("DOMContentLoaded", () => {
  // 개발 환경에서 i18n 데이터 로드
  i18n.loadMessages().then(() => {
    console.log("i18n 데이터가 로드되었습니다.");

    // 자동으로 페이지 내 모든 i18n 요소 초기화
    i18n.autoInitialize();

    // 수동으로 요소에 i18n 적용
    const welcomeElement = document.getElementById("welcome-message");
    if (welcomeElement) {
      i18n.applyToElement(welcomeElement, "welcome");
    }

    // 대체 문자열과 함께 적용
    const greetingElement = document.getElementById("greeting-message");
    if (greetingElement) {
      i18n.applyToElement(greetingElement, "greeting", "John");
    }

    // 여러 대체 문자열과 함께 적용
    const notificationElement = document.getElementById("notification-message");
    if (notificationElement) {
      i18n.applyToElement(notificationElement, "notification", ["John", "3"]);
    }

    // 직접 번역된 텍스트 가져오기
    const translatedText = t("welcome");
    console.log("번역된 텍스트:", translatedText);

    // 언어 선택기 설정
    setupLanguageSelector();
  });
});

// 언어 선택기 설정 함수
function setupLanguageSelector() {
  const languageSelector = document.getElementById("language-selector") as HTMLSelectElement;
  if (!languageSelector) return;

  // 현재 언어로 선택기 초기화
  languageSelector.value = i18n.getLanguage();

  // 언어 변경 이벤트 처리
  languageSelector.addEventListener("change", (event) => {
    const newLanguage = (event.target as HTMLSelectElement).value;
    i18n.setLanguage(newLanguage);

    // 언어 변경 후 페이지 내 모든 i18n 요소 업데이트는 자동으로 처리됨
    console.log(`언어가 ${newLanguage}로 변경되었습니다.`);
  });
}

// 커스텀 인스턴스 생성 예제
function createCustomInstance() {
  // 사용자 정의 경로와 언어로 새 인스턴스 생성
  const customI18n = new i18nVanilla.I18nVanilla("en", "./custom-path/i18n.json");

  // 커스텀 인스턴스 사용
  const message = customI18n.t("welcome");
  console.log("커스텀 인스턴스의 메시지:", message);

  return customI18n;
}

// 필요한 경우 커스텀 인스턴스 생성
// const customI18n = createCustomInstance();
