[English](#@99mini-i18n-cli) | [한국어](#@99mini-i18n-cli-한국어)

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

# Extract translation files
i18n-cli extract

# Check translation status
i18n-cli status
```

### Extract Translation Keys

Extracts translation keys from source code and adds them to translation files.

```bash
i18n-cli extract --src ./src --out ./public/_locales
```

### Watch Translation Files

Watches for source code changes and automatically updates translation files.

```bash
i18n-cli watch --src ./src --out ./public/_locales
```

### Check Translation Status

Checks the status of translation files and displays missing translations.

```bash
i18n-cli status --locales ./public/_locales
```

## Configuration

You can configure the CLI tool's behavior by creating an `i18n.config.js` file in your project root.

```javascript
// i18n.config.js
module.exports = {
  // Source code path
  src: './src',

  // Translation files path
  locales: './public/_locales',

  // Default language
  defaultLocale: 'en',

  // Fallback language
  fallbackLocale: 'en',

  // File extensions to extract
  extensions: ['.js', '.jsx', '.ts', '.tsx'],

  // Translation function names
  functionNames: ['t', 'i18n.t', 'i18n.translate'],
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

# 번역 파일 추출
i18n-cli extract

# 번역 파일 상태 확인
i18n-cli status
```

### 번역 키 추출

소스 코드에서 번역 키를 추출하여 번역 파일에 추가합니다.

```bash
i18n-cli extract --src ./src --out ./public/_locales
```

### 번역 파일 감시

소스 코드 변경을 감시하고 번역 파일을 자동으로 업데이트합니다.

```bash
i18n-cli watch --src ./src --out ./public/_locales
```

### 번역 상태 확인

번역 파일의 상태를 확인하고 누락된 번역을 표시합니다.

```bash
i18n-cli status --locales ./public/_locales
```

## 설정

`i18n.config.js` 파일을 프로젝트 루트에 생성하여 CLI 도구의 동작을 설정할 수 있습니다.

```javascript
// i18n.config.js
module.exports = {
  // 소스 코드 경로
  src: './src',

  // 번역 파일 경로
  locales: './public/_locales',

  // 기본 언어
  defaultLocale: 'ko',

  // 대체 언어
  fallbackLocale: 'en',

  // 추출할 파일 확장자
  extensions: ['.js', '.jsx', '.ts', '.tsx'],

  // 번역 함수 이름
  functionNames: ['t', 'i18n.t', 'i18n.translate'],
};
```

## 라이센스

MIT
