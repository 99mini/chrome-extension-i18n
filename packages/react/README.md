# @99mini/i18n-react

## Overview

React components and hooks for Chrome Extension i18n (internationalization).

## Installation

```bash
npm install @99mini/i18n-react
# or
yarn add @99mini/i18n-react
# or
pnpm add @99mini/i18n-react
```

## Features

- Components and hooks for easy i18n functionality in React environment
- Component-based translation support
- Automatic re-rendering on language change
- TypeScript support

## Usage

### I18nProvider

A Provider component that provides i18n functionality to your application.

```tsx
import { I18nProvider } from '@99mini/i18n-react';

function App() {
  return (
    <I18nProvider defaultLocale="en" fallbackLocale="en">
      <YourApp />
    </I18nProvider>
  );
}
```

### useTranslation Hook

A hook that allows you to use translation functionality within components.

```tsx
import { useTranslation } from '@99mini/i18n-react';

function Greeting() {
  const { t, locale, setLocale } = useTranslation();
  
  return (
    <div>
      <h1>{t('greeting')}</h1>
      <p>{t('welcome_message', { name: 'John' })}</p>
      
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        <option value="ko">한국어</option>
        <option value="en">English</option>
        <option value="ja">日本語</option>
      </select>
    </div>
  );
}
```

### Trans Component

A component that handles complex translations with JSX elements.

```tsx
import { Trans } from '@99mini/i18n-react';

function TermsAndConditions() {
  return (
    <div>
      <Trans 
        id="terms_agree" 
        values={{ 
          termsLink: <a href="/terms">Terms of Service</a>,
          privacyLink: <a href="/privacy">Privacy Policy</a>
        }}
      />
      {/* 
        terms_agree message: "By continuing, you agree to our {termsLink} and {privacyLink}."
        Rendered result: "By continuing, you agree to our <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>."
      */}
    </div>
  );
}
```

## API Documentation

### I18nProvider

**Props:**
- `defaultLocale`: Default language code (e.g., 'en', 'ko')
- `fallbackLocale`: Language code to use when a translation is missing
- `children`: React nodes

### useTranslation()

**Returns:**
- `t`: Translation function `(key: string, params?: object) => string`
- `locale`: Current language code
- `setLocale`: Function to change language code `(locale: string) => void`
- `locales`: List of available language codes

### Trans

**Props:**
- `id`: Translation key
- `values`: Variables and JSX elements to insert into the translation message
- `components`: Components to insert into the translation message (optional)

## License

MIT

---

# @99mini/i18n-react (한국어)

## 개요

Chrome Extension 국제화(i18n)를 위한 React 컴포넌트 및 훅을 제공합니다.

## 설치

```bash
npm install @99mini/i18n-react
# 또는
yarn add @99mini/i18n-react
# 또는
pnpm add @99mini/i18n-react
```

## 기능

- React 환경에서 i18n 기능을 쉽게 사용할 수 있는 컴포넌트 및 훅 제공
- 컴포넌트 기반 번역 지원
- 언어 변경 시 자동 리렌더링
- 타입스크립트 지원

## 사용법

### I18nProvider

애플리케이션에 i18n 기능을 제공하는 Provider 컴포넌트입니다.

```tsx
import { I18nProvider } from '@99mini/i18n-react';

function App() {
  return (
    <I18nProvider defaultLocale="ko" fallbackLocale="en">
      <YourApp />
    </I18nProvider>
  );
}
```

### useTranslation 훅

컴포넌트 내에서 번역 기능을 사용할 수 있는 훅입니다.

```tsx
import { useTranslation } from '@99mini/i18n-react';

function Greeting() {
  const { t, locale, setLocale } = useTranslation();
  
  return (
    <div>
      <h1>{t('greeting')}</h1>
      <p>{t('welcome_message', { name: '홍길동' })}</p>
      
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        <option value="ko">한국어</option>
        <option value="en">English</option>
        <option value="ja">日本語</option>
      </select>
    </div>
  );
}
```

### Trans 컴포넌트

JSX 요소가 포함된 복잡한 번역을 처리하는 컴포넌트입니다.

```tsx
import { Trans } from '@99mini/i18n-react';

function TermsAndConditions() {
  return (
    <div>
      <Trans 
        id="terms_agree" 
        values={{ 
          termsLink: <a href="/terms">이용약관</a>,
          privacyLink: <a href="/privacy">개인정보처리방침</a>
        }}
      />
      {/* 
        terms_agree 메시지: "계속 진행하면 {termsLink}과 {privacyLink}에 동의하게 됩니다."
        렌더링 결과: "계속 진행하면 <a href="/terms">이용약관</a>과 <a href="/privacy">개인정보처리방침</a>에 동의하게 됩니다."
      */}
    </div>
  );
}
```

## API 문서

### I18nProvider

**Props:**
- `defaultLocale`: 기본 언어 코드 (예: 'ko', 'en')
- `fallbackLocale`: 번역이 없을 경우 사용할 언어 코드
- `children`: React 노드

### useTranslation()

**반환값:**
- `t`: 번역 함수 `(key: string, params?: object) => string`
- `locale`: 현재 언어 코드
- `setLocale`: 언어 코드 변경 함수 `(locale: string) => void`
- `locales`: 사용 가능한 언어 코드 목록

### Trans

**Props:**
- `id`: 번역 키
- `values`: 번역 메시지에 삽입할 변수 및 JSX 요소
- `components`: 번역 메시지에 삽입할 컴포넌트 (선택사항)

## 라이센스

MIT
