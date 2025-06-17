/**
 * @description
 * public/_locales 폴더를 기준으로 locales를 생성합니다.
 * 로컬 dev 환경에서만 실행합니다.
 * <root>/.i18n/i18n.json 파일을 생성합니다.
 *
 * ### _locales 폴더 구조
 * ```md
 * public/_locales/
 * ├── ko
 * │   └── messages.json
 * └── en
 *     └── messages.json
 * ```
 *
 * ### messages.json 구조
 * ```json
 * {
 *   "key": {
 *     "message": "value",
 *     "description": "description"
 *   }
 * }
 * ```
 *
 * ### 사용법
 * ```bash
 * # 한 번만 실행
 * node scripts/build-locales.js
 *
 * # 파일 변경 감지 모드로 실행
 * node scripts/build-locales.js --watch
 *
 * # 백그라운드 모드로 실행 (비동기적으로 실행하고 종료하지 않음)
 * node scripts/build-locales.js --watch --background
 * ```
 */
import chokidar from 'chokidar';
import fs from 'fs';
import { loadConfig } from 'lib/config/config-loader';
import path from 'path';

// 프로젝트 루트 경로
const rootPath = process.cwd();

// _locales 폴더 경로 (기본값)
const defaultLocalesPath = path.join(rootPath, 'public', '_locales');

/**
 * i18n.json 파일을 생성하는 함수
 * @param {string} localesPath _locales 폴더 경로
 * @param {string} outputPath 출력 폴더 경로
 */
function buildLocales(localesPath: string = defaultLocalesPath, outputPath: string = path.join(rootPath, '.i18n')) {
  // 결과를 저장할 객체
  const locales: Record<string, Record<string, string>> = {};

  // _locales 폴더가 존재하는지 확인
  if (!fs.existsSync(localesPath)) {
    console.error(`❌ ${localesPath} not found`);
    return;
  }

  // _locales 폴더 내의 모든 언어 폴더 읽기
  const languages = fs.readdirSync(localesPath);

  languages.forEach((lang) => {
    const langPath = path.join(localesPath, lang);

    // 디렉토리인지 확인
    if (fs.statSync(langPath).isDirectory()) {
      const messagesPath = path.join(langPath, 'messages.json');

      // messages.json 파일이 존재하는지 확인
      if (fs.existsSync(messagesPath)) {
        // 파일 읽기
        const messages = JSON.parse(fs.readFileSync(messagesPath, 'utf8'));

        // 언어별 메시지 객체 생성
        locales[lang] = {};

        // 각 메시지 키에 대해 처리
        Object.keys(messages).forEach((key) => {
          // message 값만 추출하여 저장
          locales[lang][key] = messages[key].message;
        });
      }
    }
  });

  // 출력 폴더 생성
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }

  // i18n.json 파일 저장
  fs.writeFileSync(path.join(outputPath, 'i18n.json'), JSON.stringify(locales, null, 2), 'utf8');

  const now = new Date();
  const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
  console.log(`✅ [${timeString}] ${path.join(outputPath, 'i18n.json')} file created.`);
}

export async function buildLocalesSync(args: string[]) {
  const config = await loadConfig();
  const watchMode = args.includes('--watch');
  const backgroundMode = args.includes('--background');

  // 커스텀 경로 옵션 처리
  const localesPathIndex = args.indexOf('--locales-path');
  const localesPath = config?.localesDir
    ? config?.localesDir
    : localesPathIndex !== -1 && args.length > localesPathIndex + 1
      ? args[localesPathIndex + 1]
      : defaultLocalesPath;

  const outputPathIndex = args.indexOf('--output-path');
  const outputPath = config?.outputDir
    ? config?.outputDir
    : outputPathIndex !== -1 && args.length > outputPathIndex + 1
      ? args[outputPathIndex + 1]
      : path.join(rootPath, '.i18n');

  // 초기 빌드 실행
  buildLocales(localesPath, outputPath);

  // watch 모드인 경우 파일 변경 감지
  if (watchMode) {
    console.log(`👀 ${localesPath} folder messages.json file change watch mode started...`);

    // 모든 messages.json 파일 경로 패턴
    const messagesPattern = path.join(localesPath, '**', 'messages.json');

    // chokidar를 사용하여 파일 변경 감지
    const watcher = chokidar.watch(messagesPattern, {
      persistent: true,
      ignoreInitial: true,
    });

    // 파일 변경 이벤트 처리
    watcher.on('change', (filePath) => {
      const relativePath = path.relative(localesPath, filePath);
      console.log(`🔄 ${relativePath} file changed`);
      buildLocales(localesPath, outputPath);
    });

    // 파일 추가 이벤트 처리
    watcher.on('add', (filePath) => {
      const relativePath = path.relative(localesPath, filePath);
      console.log(`➕ ${relativePath} file added`);
      buildLocales(localesPath, outputPath);
    });

    // 에러 처리
    watcher.on('error', (error) => {
      console.error('❌ locales watch mode stopped', error);
    });

    // 백그라운드 모드가 아닌 경우, 프로세스가 종료되지 않도록 유지
    if (!backgroundMode) {
      // 시그널 핸들러 등록
      process.on('SIGINT', () => {
        console.log('\n🔔 locales watch mode stopped');
        watcher.close().then(() => process.exit(0));
      });

      // 무한 대기
      setInterval(() => {}, 1000);
    }
  } else {
    // watch 모드가 아닌 경우 프로세스 종료
    process.exit(0);
  }
}
