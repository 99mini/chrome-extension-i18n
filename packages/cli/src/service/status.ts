import fs from 'fs';
import path from 'path';

/**
 * .i18n 폴더의 messages.json 파일을 확인하여 누락된 번역 키를 찾습니다.
 * @example
 * ```json
 * // .i18n/i18n.json
 * {
 *  "en": {
 *    "hello": "Hello"
 *  },
 *  "ko": {
 *    "hello": "안녕하세요",
 *    "hello2": "안녕하세요2"
 *  }
 * ```
 *
 * ```md
 * | key | missing lang |
 * | --- | --- |
 * | hello2 | en |
 * ```
 */
export function status(args: string[]): { key: string; 'missing langs': string }[] {
  const outputPathIndex = args.indexOf('--output-path');
  const outputPath =
    outputPathIndex !== -1 && args.length > outputPathIndex + 1 ? args[outputPathIndex + 1] : './.i18n';

  const i18nJsonPath = path.join(outputPath, 'i18n.json');

  // i18n.json 파일이 존재하는지 확인
  if (!fs.existsSync(i18nJsonPath)) {
    console.error(`Error: i18n.json file not found at ${i18nJsonPath}`);
    return [];
  }

  // i18n.json 파일 읽기
  const i18nJson = JSON.parse(fs.readFileSync(i18nJsonPath, 'utf8'));

  // 모든 언어 코드 수집
  const languages = Object.keys(i18nJson);

  // 모든 번역 키 수집
  const allKeys = new Set<string>();
  for (const lang of languages) {
    const keys = Object.keys(i18nJson[lang] || {});
    keys.forEach((key) => allKeys.add(key));
  }

  // 각 키에 대해 누락된 언어 찾기
  /**
   * "key": ["index", key"lang"]
   */
  const missingKeys: { key: string; 'missing langs': string }[] = [];

  allKeys.forEach((key) => {
    const missingLangs: string[] = [];

    languages.forEach((lang) => {
      if (!i18nJson[lang] || !i18nJson[lang][key]) {
        missingLangs.push(lang);
      }
    });

    if (missingLangs.length > 0) {
      missingKeys.push({ key, 'missing langs': missingLangs.join(', ') });
    }
  });

  return missingKeys;
}
