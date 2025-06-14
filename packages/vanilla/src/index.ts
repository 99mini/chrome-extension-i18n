/**
 * Chrome Extension의 i18n API를 사용하는 Vanilla JS 구현
 */
import i18nCore, { t as translate, getCurrentLanguage, loadI18nData, Language, LocaleMessages } from "@99mini/i18n";

/**
 * I18n 인스턴스 클래스
 */
class I18nVanilla {
  private language: Language;
  private messages: LocaleMessages = { ko: {}, en: {} };

  /**
   * I18n 인스턴스 생성
   * @param initialLanguage 초기 언어 (선택적)
   * @param i18nPath i18n 데이터 경로 (선택적)
   */
  constructor(initialLanguage?: Language, i18nPath: string = "./.i18n/i18n.json") {
    this.language = initialLanguage || getCurrentLanguage();

    // 개발 환경에서 데이터 로드
    if (process.env.NODE_ENV === "development") {
      this.loadMessages(i18nPath);
    }
  }

  /**
   * 메시지 데이터 로드
   * @param path i18n 데이터 경로
   */
  async loadMessages(path: string): Promise<void> {
    const data = await loadI18nData(path);
    if (data) {
      this.messages = data;
    }
  }

  /**
   * 현재 언어 설정
   * @param lang 언어 코드
   */
  setLanguage(lang: Language): void {
    this.language = lang;

    // 언어 변경 이벤트 발생
    document.dispatchEvent(
      new CustomEvent("i18n-language-changed", {
        detail: { language: lang },
      })
    );

    // 자동으로 페이지 내 요소 업데이트
    this.updateElements();
  }

  /**
   * 현재 언어 가져오기
   * @returns 현재 언어 코드
   */
  getLanguage(): Language {
    return this.language;
  }

  /**
   * 번역 함수
   * @param key 키워드
   * @param substitutions 대체할 문자열 배열 (선택적)
   * @returns 번역된 텍스트
   */
  t(key: string, substitutions?: string | string[]): string {
    return translate(key, substitutions, this.language);
  }

  /**
   * 페이지 내 모든 i18n 요소 업데이트
   */
  updateElements(): void {
    // data-i18n 속성을 가진 모든 요소 찾기
    const elements = document.querySelectorAll("[data-i18n]");

    elements.forEach((element) => {
      const key = element.getAttribute("data-i18n");
      if (key) {
        // 대체 문자열 처리
        const substitutions = element.getAttribute("data-i18n-substitutions");
        const subs = substitutions ? JSON.parse(substitutions) : undefined;

        // 번역된 텍스트로 업데이트
        element.textContent = this.t(key, subs);
      }
    });
  }

  /**
   * 특정 요소에 i18n 적용
   * @param element 대상 DOM 요소
   * @param key i18n 키
   * @param substitutions 대체 문자열 (선택적)
   */
  applyToElement(element: HTMLElement, key: string, substitutions?: string | string[]): void {
    if (!element) return;

    // 키 속성 설정
    element.setAttribute("data-i18n", key);

    // 대체 문자열이 있는 경우 속성 설정
    if (substitutions) {
      element.setAttribute("data-i18n-substitutions", JSON.stringify(Array.isArray(substitutions) ? substitutions : [substitutions]));
    }

    // 번역 적용
    element.textContent = this.t(key, substitutions);
  }

  /**
   * DOM이 로드된 후 자동으로 i18n 적용
   */
  autoInitialize(): void {
    // DOM이 이미 로드된 경우
    if (document.readyState === "complete" || document.readyState === "interactive") {
      this.updateElements();
    } else {
      // DOM 로드 대기
      document.addEventListener("DOMContentLoaded", () => {
        this.updateElements();
      });
    }

    // 동적으로 추가되는 요소를 위한 MutationObserver 설정
    if (typeof MutationObserver !== "undefined") {
      const observer = new MutationObserver((mutations) => {
        let shouldUpdate = false;

        mutations.forEach((mutation) => {
          if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
            mutation.addedNodes.forEach((node) => {
              if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node as Element;
                if (element.getAttribute("data-i18n") || element.querySelector("[data-i18n]")) {
                  shouldUpdate = true;
                }
              }
            });
          }
        });

        if (shouldUpdate) {
          this.updateElements();
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }
  }
}

// 기본 인스턴스 생성
const i18n = new I18nVanilla();

// 편의를 위한 전역 함수
const t = (key: string, substitutions?: string | string[]): string => i18n.t(key, substitutions);

// 코어 기능도 내보내기
export { translate, getCurrentLanguage, loadI18nData };

// 기본 내보내기
export default {
  i18n,
  t,
  I18nVanilla,
  getCurrentLanguage,
  loadI18nData,
};
