# Chrome Extension i18n Example

**Table of Contents**

- [Getting Started](#getting-started)
- [Build](#build)
  - [build watch, background](#build-watch-background)
  - [i18n build only](#i18n-build-only)
- [Setting](#setting)
  - [tsconfig.json](#tsconfigjson)
  - [.gitignore](#gitignore)
- [Autocomplete & Validation](#autocomplete--validation)

## Getting Started

```bash
npm install
npm run dev
```

### build watch, background

```bash
npx @99mini/i18n-cli build -wb && <your-dev-command>
# ex) npx @99mini/i18n-cli build -wb && vite
```

### i18n build only

```bash
npx @99mini/i18n-cli build
```

## Setting

### tsconfig.json

add .i18n/schema.d.ts to tsconfig.json

```diff
//tsconfig.json
{
  // ...
+ "include": [".i18n/schema.d.ts"]
}
```

### .gitignore

add .i18n to .gitignore

```diff
// .gitignore
+ .i18n
```

## Autocomplete & Validation

|     | vanilla                                             | react                                           |
| --- | --------------------------------------------------- | ----------------------------------------------- |
|     | ![vanilla-schema](./docs/images/vanilla-schema.png) | ![react-schema](./docs/images/react-schema.png) |
