/**
 * @99mini/i18n 기본 사용법 예제
 */
import { t, getCurrentLanguage, loadI18nData } from "@99mini/i18n";

// 개발 환경에서 i18n 데이터 로드
async function initI18n() {
  await loadI18nData();
  console.log("i18n 데이터가 로드되었습니다.");

  // 기본 사용법
  const message = t("welcome");
  console.log("환영 메시지:", message);

  // 대체 문자열 사용
  const greeting = t("greeting", "John");
  console.log("인사말:", greeting);

  // 여러 대체 문자열 사용
  const notification = t("notification", ["John", "3"]);
  console.log("알림:", notification);

  // 현재 언어 확인
  const currentLang = getCurrentLanguage();
  console.log("현재 언어:", currentLang);
}

// 초기화 실행
initI18n();
