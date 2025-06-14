[English](#99minii18n-vanilla) | [한국어](#99minii18n-vanilla-한국어)

---

# @99mini/i18n-vanilla

React components and hooks for Chrome Extension i18n (internationalization).

## Installation

```bash
npm install @99mini/i18n-vanilla @99mini/i18n-cli
# or
yarn add @99mini/i18n-vanilla @99mini/i18n-cli
# or
pnpm add @99mini/i18n-vanilla @99mini/i18n-cli
```

## Features

- React components and hooks for Chrome Extension i18n (internationalization)
- Vanilla JavaScript implementation for Chrome Extension i18n (internationalization)
- Simple API for internationalization
- Easy to use in browser environment
- DOM element auto translation
- TypeScript support

## Usage

### Basic Usage

```javascript
import { createI18n } from '@99mini/i18n-vanilla';

// i18n instance creation
const i18n = createI18n({
  defaultLocale: 'ko',
  fallbackLocale: 'en',
});

// message translation
const message = i18n.t('hello_world');
console.log(message); // Hello, world!

// message translation with variables
const welcomeMessage = i18n.t('welcome', { name: 'John' });
console.log(welcomeMessage); // Welcome, John!

// change language
i18n.setLocale('en');
console.log(i18n.t('hello_world')); // Hello, world!
```

### Event Listener

You can receive events when the language changes.

```javascript
// Language change event listener registration
i18n.on('localeChanged', (newLocale, oldLocale) => {
  console.log(`Language changed from ${oldLocale} to ${newLocale}`);

  // Update UI
  updateUI();
});

function updateUI() {
  document.getElementById('greeting').textContent = i18n.t('greeting');
  document.getElementById('welcome').textContent = i18n.t('welcome', { name: 'John' });
}
```

### DOM Element Auto Translate

You can automatically translate DOM elements using the data-i18n attribute.

```html
<h1 data-i18n="greeting"></h1>
<p data-i18n="welcome" data-i18n-params='{"name": "John"}'></p>
```

```javascript
// Auto translate all elements with data-i18n attribute
i18n.translatePage();

// Auto translate all elements with data-i18n attribute when language changes
i18n.on('localeChanged', () => {
  i18n.translatePage();
});
```

## API Documentation

### createI18n(options)

Creates an i18n instance.

**Parameters:**

- `options`: Configuration options
  - `defaultLocale`: Default language code (e.g., 'ko', 'en')
  - `fallbackLocale`: Language code to use when a translation is missing

**Returns:**

- i18n instance

### i18n.t(key, params)

Returns a translated message for the specified key.

**Parameters:**

- `key`: Message key
- `params`: (optional) Variables to insert into the message

**Returns:**

- Translated message string

### i18n.setLocale(locale)

Changes the current language.

**Parameters:**

- `locale`: Language code to change to

### i18n.getLocale()

Returns the current language code.

**Returns:**

- Current language code string

### i18n.on(event, callback)

Registers an event listener.

**Parameters:**

- `event`: Event name (e.g., 'localeChanged')
- `callback`: Callback function to be called when the event occurs

### i18n.translatePage()

Translates all elements with the data-i18n attribute on the page.

## License

MIT

---

# @99mini/i18n-vanilla (한국어)

Chrome Extension 국제화(i18n)를 위한 바닐라 자바스크립트 구현체입니다.

## 설치

```bash
npm install @99mini/i18n-vanilla
# 또는
yarn add @99mini/i18n-vanilla
# 또는
pnpm add @99mini/i18n-vanilla
```

## 기능

- 프레임워크에 의존하지 않는 순수 자바스크립트 i18n 구현
- 간단한 API로 국제화 기능 제공
- 브라우저 환경에서 쉽게 사용 가능
- DOM 요소 자동 번역 기능
- 타입스크립트 지원

## 사용법

### 기본 사용법

```javascript
import { createI18n } from '@99mini/i18n-vanilla';

// i18n 인스턴스 생성
const i18n = createI18n({
  defaultLocale: 'ko',
  fallbackLocale: 'en',
});

// 메시지 번역
const message = i18n.t('hello_world');
console.log(message); // 안녕하세요, 세계!

// 변수가 포함된 메시지 번역
const welcomeMessage = i18n.t('welcome', { name: '홍길동' });
console.log(welcomeMessage); // 환영합니다, 홍길동님!

// 언어 변경
i18n.setLocale('en');
console.log(i18n.t('hello_world')); // Hello, world!
```

### 이벤트 리스너

언어 변경 시 이벤트를 수신할 수 있습니다.

```javascript
// 언어 변경 이벤트 리스너 등록
i18n.on('localeChanged', (newLocale, oldLocale) => {
  console.log(`언어가 ${oldLocale}에서 ${newLocale}로 변경되었습니다.`);

  // UI 업데이트 등의 작업 수행
  updateUI();
});

function updateUI() {
  document.getElementById('greeting').textContent = i18n.t('greeting');
  document.getElementById('welcome').textContent = i18n.t('welcome', { name: '홍길동' });
}
```

### DOM 요소 자동 번역

data-i18n 속성을 사용하여 DOM 요소를 자동으로 번역할 수 있습니다.

```html
<h1 data-i18n="greeting"></h1>
<p data-i18n="welcome" data-i18n-params='{"name": "홍길동"}'></p>
```

```javascript
// 페이지 내의 data-i18n 속성을 가진 모든 요소를 번역
i18n.translatePage();

// 언어 변경 시 자동으로 페이지 번역
i18n.on('localeChanged', () => {
  i18n.translatePage();
});
```

## API 문서

### createI18n(options)

i18n 인스턴스를 생성합니다.

**매개변수:**

- `options`: 설정 옵션
  - `defaultLocale`: 기본 언어 코드 (예: 'ko', 'en')
  - `fallbackLocale`: 번역이 없을 경우 사용할 언어 코드

**반환값:**

- i18n 인스턴스

### i18n.t(key, params)

지정된 키에 해당하는 번역된 메시지를 반환합니다.

**매개변수:**

- `key`: 메시지 키
- `params`: (선택사항) 메시지에 삽입할 변수들

**반환값:**

- 번역된 메시지 문자열

### i18n.setLocale(locale)

현재 언어를 변경합니다.

**매개변수:**

- `locale`: 변경할 언어 코드

### i18n.getLocale()

현재 언어 코드를 반환합니다.

**반환값:**

- 현재 언어 코드 문자열

### i18n.on(event, callback)

이벤트 리스너를 등록합니다.

**매개변수:**

- `event`: 이벤트 이름 (예: 'localeChanged')
- `callback`: 이벤트 발생 시 호출될 콜백 함수

### i18n.translatePage()

페이지 내의 data-i18n 속성을 가진 모든 요소를 번역합니다.

## 라이센스

MIT
