import fs from 'fs';
import path from 'path';

import { I18nConfig } from '@99mini/i18n-shared';

type InitProjectArgs = Required<I18nConfig> & {
  force?: boolean;
  ext: 'ts' | 'js' | 'mjs' | 'cjs' | 'json' | 'rc';
};

const projectPath = process.cwd();

/**
 * 프로젝트 초기화 함수
 * - tsconfig.json에 .i18n/schema.d.ts 추가
 * - .gitignore에 .i18n 추가
 * - 기본 설정 파일 생성
 * @param args
 */
export function initProject(args: InitProjectArgs) {
  // 1. 기본 설정 파일 생성
  createConfigFile(args);

  // 2. 기본 디렉토리 생성
  createI18nDirectory(args.outputDir);

  // 3. tsconfig.json 수정
  updateTsConfig();

  // 4. .gitignore 수정
  updateGitignore(args.outputDir);

  console.log('✅ i18n project initialized.');
}

/**
 * .i18n 디렉토리 생성
 */
function createI18nDirectory(outputDir: string) {
  const i18nDirPath = path.join(projectPath, outputDir);

  if (!fs.existsSync(i18nDirPath)) {
    fs.mkdirSync(i18nDirPath, { recursive: true });
    console.log('📁 .i18n directory created.');
  } else {
    console.log('📁 .i18n directory already exists.');
  }
}

/**
 * tsconfig.json 파일 수정
 * - include에 .i18n/schema.d.ts 추가
 */
function updateTsConfig() {
  const tsconfigPath = path.join(projectPath, 'tsconfig.json');

  // tsconfig.json이 존재하는지 확인
  if (!fs.existsSync(tsconfigPath)) {
    console.log('⚠️ tsconfig.json not found.');
    return;
  }

  try {
    const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));

    // include 배열이 없으면 생성
    if (!tsconfig.include) {
      tsconfig.include = [];
    }

    // .i18n/schema.d.ts가 이미 포함되어 있는지 확인
    if (!tsconfig.include.includes('.i18n/schema.d.ts')) {
      tsconfig.include.push('.i18n/schema.d.ts');

      // 파일 쓰기
      fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));
      console.log('✅ tsconfig.json updated.');
    } else {
      console.log('✅ tsconfig.json already updated.');
    }
  } catch (error) {
    console.error('❌ tsconfig.json update failed:', error);
  }
}

/**
 * .gitignore 파일 수정
 * - .i18n 추가
 */
function updateGitignore(outputDir: string) {
  const gitignorePath = path.join(projectPath, '.gitignore');

  // .gitignore 파일이 존재하는지 확인
  if (!fs.existsSync(gitignorePath)) {
    // 파일이 없으면 새로 생성
    fs.writeFileSync(gitignorePath, `# i18n\n${outputDir}\n`);
    console.log('✅ .gitignore created.');
    return;
  }

  // 파일이 있으면 내용 읽기
  const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');

  // .i18n이 이미 포함되어 있는지 확인
  if (!gitignoreContent.includes(outputDir)) {
    // 없으면 추가
    const updatedContent = gitignoreContent.trim() + `\n\n# i18n\n${outputDir}\n`;
    fs.writeFileSync(gitignorePath, updatedContent);
    console.log('✅ .gitignore updated.');
  } else {
    console.log('✅ .gitignore already updated.');
  }
}

/**
 * i18n.config.js 파일 생성
 */
function createConfigFile(args: InitProjectArgs) {
  let filename = 'i18n.config';
  if (args.ext === 'rc') {
    filename = '.i18nrc';
  } else {
    filename += `.${args.ext}`;
  }
  const configPath = path.join(projectPath, filename);

  // 파일이 이미 존재하는지 확인
  if (fs.existsSync(configPath)) {
    console.log('✅ i18n.config.js already exists.');
    return;
  }

  let configContent = '';

  if (args.ext === 'rc' || args.ext === 'json') {
    configContent = `{
  "outputDir": "${args.outputDir}",
  "localesDir": "${args.localesDir}",
  "defaultLanguage": "${args.defaultLanguage}",
  "supportedLanguages": [${args.supportedLanguages.map((lang) => `"${lang}"`).join(', ')}]
}`;
  } else {
    const defulatConfigContent = `{
  /** output directory */
  outputDir: "${args.outputDir}",
  /** locales directory */
  localesDir: "${args.localesDir}",
  /** default language */
  defaultLanguage: "${args.defaultLanguage}",
  /** supported languages */
  supportedLanguages: [${args.supportedLanguages.map((lang) => `"${lang}"`).join(', ')}],
}`;
    if (args.ext === 'ts') {
      configContent = `import { I18nConfig } from '@99mini/i18n-cli';

const config: I18nConfig = ${defulatConfigContent};

export default config;`;
    } else if (args.ext === 'js' || args.ext === 'cjs') {
      configContent = `/*
 * @type {import('@99mini/i18n-cli').I18nConfig}
 */
module.exports = ${defulatConfigContent};`;
    } else if (args.ext === 'mjs') {
      configContent = `/*
 * @type {import('@99mini/i18n-cli').I18nConfig}
 */
export default ${defulatConfigContent};`;
    } else {
      throw new Error(`Unsupported file extension: ${args.ext}`);
    }
  }

  // 파일 쓰기
  fs.writeFileSync(configPath, configContent);
  console.log(`✅ ${filename} created.`);
}
