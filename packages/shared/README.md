# @99mini/i18n-shared

Chrome Extension 국제화(i18n) 라이브러리를 위한 공유 타입과 유틸리티 함수를 제공합니다.

## 소개

이 패키지는 `@99mini/i18n` 생태계의 다른 패키지들이 공통적으로 사용하는 타입 정의와 유틸리티 함수를 포함하고 있습니다. 이 패키지는 직접 사용하기 위한 것이 아니라 다른 i18n 패키지들의 내부 의존성으로 사용됩니다.

## 포함된 내용

### 타입 정의

- `LocaleMessages`: 번역 메시지 타입 정의
- `I18nOptions`: i18n 초기화 옵션 타입 정의
- `TranslateFunction`: 번역 함수 타입 정의
- `MessageFormatOptions`: 메시지 포맷팅 옵션 타입 정의

### 유틸리티 함수

- 메시지 포맷팅 유틸리티
- 언어 코드 처리 유틸리티
- Chrome Extension i18n API 래퍼 함수

## 내부 사용 예시

```typescript
import { LocaleMessages, formatMessage } from '@99mini/i18n-shared';

// 메시지 정의
const messages: LocaleMessages = {
  ko: {
    hello: '안녕하세요',
    welcome: '환영합니다, {name}님!'
  },
  en: {
    hello: 'Hello',
    welcome: 'Welcome, {name}!'
  }
};

// 메시지 포맷팅
const formattedMessage = formatMessage(
  messages.ko.welcome, 
  { name: '홍길동' }
); // '환영합니다, 홍길동님!'
```

## 참고사항

이 패키지는 `private: true`로 설정되어 있어 npm에 배포되지 않습니다. 이 패키지는 monorepo 내에서 workspace 의존성으로만 사용됩니다.

## 라이센스

MIT
