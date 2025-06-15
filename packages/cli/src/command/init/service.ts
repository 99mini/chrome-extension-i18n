import fs from 'fs';
import path from 'path';

/**
 * 프로젝트 초기화 함수
 * - tsconfig.json에 .i18n/schema.d.ts 추가
 * - .gitignore에 .i18n 추가
 * - 기본 설정 파일 생성
 */
export function initProject() {
  const projectPath = process.cwd();

  // 1. 기본 디렉토리 생성
  createI18nDirectory(projectPath);

  // 2. tsconfig.json 수정
  updateTsConfig(projectPath);

  // 3. .gitignore 수정
  updateGitignore(projectPath);

  // 4. 기본 설정 파일 생성
  createConfigFile(projectPath);

  console.log('✅ i18n 프로젝트 초기화가 완료되었습니다.');
}

/**
 * .i18n 디렉토리 생성
 */
function createI18nDirectory(projectPath: string) {
  const i18nDirPath = path.join(projectPath, '.i18n');

  if (!fs.existsSync(i18nDirPath)) {
    fs.mkdirSync(i18nDirPath, { recursive: true });
    console.log('📁 .i18n 디렉토리를 생성했습니다.');
  } else {
    console.log('📁 .i18n 디렉토리가 이미 존재합니다.');
  }
}

/**
 * tsconfig.json 파일 수정
 * - include에 .i18n/schema.d.ts 추가
 */
function updateTsConfig(projectPath: string) {
  const tsconfigPath = path.join(projectPath, 'tsconfig.json');

  // tsconfig.json이 존재하는지 확인
  if (!fs.existsSync(tsconfigPath)) {
    console.log('⚠️ tsconfig.json 파일을 찾을 수 없습니다.');
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
      console.log('✅ tsconfig.json에 .i18n/schema.d.ts를 추가했습니다.');
    } else {
      console.log('✅ tsconfig.json에 이미 .i18n/schema.d.ts가 포함되어 있습니다.');
    }
  } catch (error) {
    console.error('❌ tsconfig.json 파일을 수정하는 중 오류가 발생했습니다:', error);
  }
}

/**
 * .gitignore 파일 수정
 * - .i18n 추가
 */
function updateGitignore(projectPath: string) {
  const gitignorePath = path.join(projectPath, '.gitignore');

  // .gitignore 파일이 존재하는지 확인
  if (!fs.existsSync(gitignorePath)) {
    // 파일이 없으면 새로 생성
    fs.writeFileSync(gitignorePath, '# i18n\n.i18n\n');
    console.log('✅ .gitignore 파일을 생성하고 .i18n을 추가했습니다.');
    return;
  }

  // 파일이 있으면 내용 읽기
  const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');

  // .i18n이 이미 포함되어 있는지 확인
  if (!gitignoreContent.includes('.i18n')) {
    // 없으면 추가
    const updatedContent = gitignoreContent.trim() + '\n\n# i18n\n.i18n\n';
    fs.writeFileSync(gitignorePath, updatedContent);
    console.log('✅ .gitignore에 .i18n을 추가했습니다.');
  } else {
    console.log('✅ .gitignore에 이미 .i18n이 포함되어 있습니다.');
  }
}

/**
 * i18n.config.js 파일 생성
 */
function createConfigFile(projectPath: string) {
  const configPath = path.join(projectPath, 'i18n.config.js');

  // 파일이 이미 존재하는지 확인
  if (fs.existsSync(configPath)) {
    console.log('✅ i18n.config.js 파일이 이미 존재합니다.');
    return;
  }

  // 기본 설정 파일 내용
  const configContent = `/**
 * i18n 설정 파일
 */
module.exports = {
  // 출력 디렉토리 설정
  outputDir: './.i18n',
  
  // 로케일 디렉토리 설정
  localesDir: './public/_locales',
  
  // 기본 언어 설정
  defaultLanguage: 'ko',
  
  // 지원하는 언어 목록
  supportedLanguages: ['ko', 'en'],
  
  // 번역 키 추출 설정
  extraction: {
    // 소스 코드 디렉토리
    sourceDir: './src',
    
    // 추출할 파일 확장자
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    
    // 키 추출 패턴 (정규식)
    patterns: [
      't\\(["\\'](.[^"\\']+)["\\']',
      'useTranslation\\(["\\'](.[^"\\']+)["\\']',
      'data-i18n=["\\'](.[^"\\']+)["\\']'
    ]
  }
};
`;

  // 파일 쓰기
  fs.writeFileSync(configPath, configContent);
  console.log('✅ i18n.config.js 파일을 생성했습니다.');
}
