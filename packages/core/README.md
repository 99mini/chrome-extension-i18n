# @99mini/i18n

## Overview

Core functionality for Chrome Extension i18n library.

## Installation

```bash
npm install @99mini/i18n
# or
yarn add @99mini/i18n
# or
pnpm add @99mini/i18n
```

## Features

- Wrapper functions for Chrome Extension's i18n API
- Language setting and switching capabilities
- Message formatting support
- TypeScript support

## Usage

```typescript
import { setupI18n, t } from '@99mini/i18n';

// Initialize i18n
const i18n = setupI18n({
  defaultLocale: 'ko',
  fallbackLocale: 'en',
});

// Get a message
const message = t('hello_world');
console.log(message); // Hello, world!

// Get a message with variables
const welcomeMessage = t('welcome', { name: 'John' });
console.log(welcomeMessage); // Welcome, John!
```

## API Documentation

### setupI18n(options)

Initializes the i18n functionality.

**Parameters:**
- `options`: Configuration options
  - `defaultLocale`: Default language code (e.g., 'en', 'ko')
  - `fallbackLocale`: Language code to use when a translation is missing

**Returns:**
- i18n instance

### t(key, params)

Returns a translated message for the specified key.

**Parameters:**
- `key`: Message key
- `params`: (optional) Variables to insert into the message

**Returns:**
- Translated message string

## License

MIT

---

# @99mini/i18n (한국어)

## 개요

Chrome Extension을 위한 국제화(i18n) 라이브러리의 핵심 기능을 제공합니다.

## 설치

```bash
npm install @99mini/i18n
# 또는
yarn add @99mini/i18n
# 또는
pnpm add @99mini/i18n
```

## 기능

- Chrome Extension의 국제화(i18n) API를 쉽게 사용할 수 있는 래퍼 함수 제공
- 다양한 언어 설정 및 전환 기능
- 메시지 포맷팅 지원
- 타입스크립트 지원

## 사용법

```typescript
import { setupI18n, t } from '@99mini/i18n';

// i18n 초기화
const i18n = setupI18n({
  defaultLocale: 'ko',
  fallbackLocale: 'en',
});

// 메시지 가져오기
const message = t('hello_world');
console.log(message); // 안녕하세요, 세계!

// 변수가 포함된 메시지 가져오기
const welcomeMessage = t('welcome', { name: '홍길동' });
console.log(welcomeMessage); // 환영합니다, 홍길동님!
```

## API 문서

### setupI18n(options)

i18n 기능을 초기화합니다.

**매개변수:**
- `options`: 설정 옵션
  - `defaultLocale`: 기본 언어 코드 (예: 'ko', 'en')
  - `fallbackLocale`: 번역이 없을 경우 사용할 언어 코드

**반환값:**
- i18n 인스턴스

### t(key, params)

지정된 키에 해당하는 번역된 메시지를 반환합니다.

**매개변수:**
- `key`: 메시지 키
- `params`: (선택사항) 메시지에 삽입할 변수들

**반환값:**
- 번역된 메시지 문자열

## 라이센스

MIT
