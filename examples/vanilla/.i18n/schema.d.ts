declare global {
  namespace I18n {
    type Key = 'hello' | 'hello-${name}';
    type Language = 'en' | 'ko';
  }
}

export {}