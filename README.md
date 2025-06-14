# @99mini/i18n

Chrome 확장 프로그램을 위한 i18n(국제화) 라이브러리입니다. 개발 환경과 프로덕션 환경에서 일관된 경험을 제공합니다.

## 특징

- Chrome Extension의 i18n API와 완벽하게 호환됩니다.
- 개발 환경에서 Chrome Extension API 없이도 동작합니다.
- React, Vanilla JS 등 다양한 프론트엔드 프레임워크를 지원합니다.
- 타입스크립트로 작성되어 타입 안정성을 제공합니다.

## 프로젝트 구조

```
packages/
├── shared/       # 공통 타입 및 스크립트
├── cli/          # CLI 도구
├── core/         # 핵심 기능 (프레임워크 독립적)
├── react/        # React 컴포넌트 및 훅
└── vanilla/      # Vanilla JS 지원
```

## 설치

```bash
# 핵심 패키지
npm install @99mini/i18n

# React 지원
npm install @99mini/i18n-react

# Vanilla JS 지원
npm install @99mini/i18n-vanilla
```

## 개발 환경 설정

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

## 라이센스

MIT
