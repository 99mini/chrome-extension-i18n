# @99mini/i18n

This is an i18n (internationalization) library for Chrome extensions. It provides a consistent experience in both development and production environments.
This library is not included in the production environment. (To be updated)

---

Chrome 확장 프로그램을 위한 i18n(국제화) 라이브러리입니다. 개발 환경과 프로덕션 환경에서 일관된 경험을 제공합니다.
프로덕트 환경에서는 해당 라이브러리를 포함시키지 않습니다. (추후 업데이트)

## Feature | 특징

- Fully compatible with Chrome i18n API
- Works without Chrome Extension API in development environment
- Supports various frontend frameworks including React and Vanilla JS
- Written in TypeScript for type safety

---

- chrome i18n API 완벽하게 호환
- 개발 환경에서 Chrome Extension API 없이도 동작
- React, Vanilla JS 등 다양한 프론트엔드 프레임워크를 지원
- 타입스크립트로 작성되어 타입 안정성을 제공

## Project Structure | 프로젝트 구조

```
packages/
├── shared/       # shared type & scripts
├── cli/          # CLI tool
├── core/         # core package (framework independent)
├── react/        # React components & hooks
└── vanilla/      # Vanilla JS support
```

## Installation | 설치

```bash
# cli tool
npm install @99mini/i18n-cli --save-dev

# core package
npm install @99mini/i18n --save-dev

# React support
npm install @99mini/i18n-react --save-dev

# Vanilla JS support
npm install @99mini/i18n-vanilla --save-dev
```

## Development Environment Setting | 개발 환경 설정

```bash
pnpm install
```

```bash
pnpm run dev:<package-name>
# ex) pnpm run dev:core
```

```bash
pnpm run test:<package-name>
# ex) pnpm run test:core
```

## License | 라이센스

MIT

## TODO

link: [TODO](https://github.com/99mini/chrome-extension-i18n/blob/main/.docs/TODO.md)
