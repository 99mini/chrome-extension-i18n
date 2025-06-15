[English](#99minii18n-cli) | [한국어](#99minii18n-cli-한국어)

---

# @99mini/i18n-cli

## Overview

Command Line Interface (CLI) tool for Chrome Extension i18n.

## Installation

```bash
npm install -g @99mini/i18n-cli
# or
yarn global add @99mini/i18n-cli
# or
pnpm add -g @99mini/i18n-cli
```

## Features

- Creation and management of i18n files
- Extraction and management of translation keys
- Detection of missing translations
- Automatic translation file synchronization

## Usage

### Basic Commands

```bash
# View help
i18n-cli --help

# Check version
i18n-cli --version

# Initialize project
i18n-cli init

# build locales
i18n-cli build-locales

# compile schema
i18n-cli compile-schema

# build locales and compile schema
i18n-cli build

# status
i18n-cli status
```

### Watch

Watches for source code changes and automatically updates translation files.

```bash
npx @99mini/i18n-cli build-locales -w
# or
npx @99mini/i18n-cli compile-schema -w
# or
npx @99mini/i18n-cli build -w
```

### background

```bash
npx @99mini/i18n-cli build-locales -b
# or
npx @99mini/i18n-cli compile-schema -b
# or
npx @99mini/i18n-cli build -b
```

## Configuration

You can configure the CLI tool's behavior by creating an `i18n.config.js` file in your project root.

```javascript
// i18n.config.js
module.exports = {
  // Translation files path
  locales: './public/_locales',

  // Output path
  output: './.i18n',

  // Default language
  defaultLocale: 'en',

  // Fallback language
  fallbackLocale: 'en',
};
```

## License

MIT

---

# @99mini/i18n-cli (한국어)

## 개요

Chrome Extension 국제화(i18n)를 위한 명령줄 인터페이스(CLI) 도구입니다.

## 설치

```bash
npm install -g @99mini/i18n-cli
# 또는
yarn global add @99mini/i18n-cli
# 또는
pnpm add -g @99mini/i18n-cli
```

## 기능

- 국제화 파일 생성 및 관리
- 번역 키 추출 및 관리
- 누락된 번역 감지
- 자동 번역 파일 동기화

## 사용법

### 기본 명령어

```bash
# 도움말 보기
i18n-cli --help

# 버전 확인
i18n-cli --version

# 프로젝트 초기화
i18n-cli init

# 국제화 json 파일 생성
i18n-cli build-locales

# schema 파일 생성
i18n-cli compile-schema

# 국제화 파일 생성 및 schema 파일 생성
i18n-cli build

# status
i18n-cli status
```

### watch

소스 코드 변경을 감시하고 번역 파일을 자동으로 업데이트합니다.

```bash
npx @99mini/i18n-cli build-locales -w
npx @99mini/i18n-cli compile-schema -w
npx @99mini/i18n-cli build -w
```

### background

```bash
npx @99mini/i18n-cli build-locales -b
npx @99mini/i18n-cli compile-schema -b
npx @99mini/i18n-cli build -b
```

## 설정

`i18n.config.js` 파일을 프로젝트 루트에 생성하여 CLI 도구의 동작을 설정할 수 있습니다.

```javascript
// i18n.config.js
module.exports = {
  // 번역 파일 경로
  locales: './public/_locales',

  // 아웃풋 경로
  output: './.i18n',

  // 기본 언어
  defaultLocale: 'ko',

  // 대체 언어
  fallbackLocale: 'ko',
};
```

## 라이센스

MIT
