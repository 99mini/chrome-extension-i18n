# Chrome Extension i18n Example

## Getting Started

```bash
pnpm install
pnpm run dev
```

### i18n build only

```bash
pnpm run i18n
```

## Setting

add .i18n/schema.d.ts to tsconfig.json

```diff
//tsconfig.json
{
  // ...
+ "include": [".i18n/schema.d.ts"]
}
```

## .gitignore

add .i18n to .gitignore

```diff
// .gitignore
+ .i18n
```

## Autocomplete & Validation

|     | vanilla                                             | react                                           |
| --- | --------------------------------------------------- | ----------------------------------------------- |
|     | ![vanilla-schema](./docs/images/vanilla-schema.png) | ![react-schema](./docs/images/react-schema.png) |
