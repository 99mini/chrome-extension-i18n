/**
 * Chrome Extension i18n CLI 라이브러리
 */
import chokidar from "chokidar";
import fs from "fs";
import path from "path";

/**
 * i18n.json 파일을 생성하는 함수
 * @param {string} localesPath _locales 폴더 경로
 * @param {string} outputPath 출력 폴더 경로
 */
function buildLocales(localesPath: string, outputPath: string) {
  // 결과를 저장할 객체
  const locales: Record<string, Record<string, string>> = {};

  // _locales 폴더가 존재하는지 확인
  if (!fs.existsSync(localesPath)) {
    console.error(`❌ ${localesPath} 폴더가 존재하지 않습니다.`);
    return;
  }

  // _locales 폴더 내의 모든 언어 폴더 읽기
  const languages = fs.readdirSync(localesPath);

  languages.forEach((lang) => {
    const langPath = path.join(localesPath, lang);

    // 디렉토리인지 확인
    if (fs.statSync(langPath).isDirectory()) {
      const messagesPath = path.join(langPath, "messages.json");

      // messages.json 파일이 존재하는지 확인
      if (fs.existsSync(messagesPath)) {
        // 파일 읽기
        const messages = JSON.parse(fs.readFileSync(messagesPath, "utf8"));

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
  fs.writeFileSync(path.join(outputPath, "i18n.json"), JSON.stringify(locales, null, 2), "utf8");

  const now = new Date();
  const timeString = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
  console.log(`✅ [${timeString}] ${path.join(outputPath, "i18n.json")} 파일이 생성되었습니다.`);
}

/**
 * i18n.json 파일을 생성하는 함수 (CLI에서 호출)
 * @param args 명령행 인수 배열
 */
export function buildLocalesSync(args?: string[]) {
  // 명령행 인수 확인
  const processArgs = args || process.argv.slice(2);
  const watchMode = processArgs.includes("--watch");
  const backgroundMode = processArgs.includes("--background");

  // 프로젝트 루트 경로 (현재 작업 디렉토리 기준)
  const rootPath = process.cwd();

  // _locales 폴더 경로 (기본값)
  const defaultLocalesPath = path.join(rootPath, "public", "_locales");

  // 커스텀 경로 옵션 처리
  const localesPathIndex = processArgs.indexOf("--locales-path");
  const localesPath = localesPathIndex !== -1 && processArgs.length > localesPathIndex + 1 
    ? processArgs[localesPathIndex + 1] 
    : defaultLocalesPath;

  const outputPathIndex = processArgs.indexOf("--output-path");
  const outputPath = outputPathIndex !== -1 && processArgs.length > outputPathIndex + 1 
    ? processArgs[outputPathIndex + 1] 
    : path.join(rootPath, ".i18n");

  // 초기 빌드 실행
  buildLocales(localesPath, outputPath);

  // watch 모드인 경우 파일 변경 감지
  if (watchMode) {
    console.log(`👀 ${localesPath} 폴더의 messages.json 파일 변경 감지 중...`);

    // 모든 messages.json 파일 경로 패턴
    const messagesPattern = path.join(localesPath, "**", "messages.json");

    // chokidar를 사용하여 파일 변경 감지
    const watcher = chokidar.watch(messagesPattern, {
      persistent: true,
      ignoreInitial: true,
    });

    // 파일 변경 이벤트 처리
    watcher.on("change", (filePath) => {
      const relativePath = path.relative(localesPath, filePath);
      console.log(`🔄 ${relativePath} 파일이 변경되었습니다.`);
      buildLocales(localesPath, outputPath);
    });

    // 파일 추가 이벤트 처리
    watcher.on("add", (filePath) => {
      const relativePath = path.relative(localesPath, filePath);
      console.log(`➕ ${relativePath} 파일이 추가되었습니다.`);
      buildLocales(localesPath, outputPath);
    });

    // 에러 처리
    watcher.on("error", (error) => {
      console.error("❌ 파일 감시 중 오류가 발생했습니다:", error);
    });

    // 백그라운드 모드가 아닌 경우, 프로세스가 종료되지 않도록 유지
    if (!backgroundMode) {
      // 시그널 핸들러 등록
      process.on("SIGINT", () => {
        console.log("\n🔔 파일 감시를 종료합니다.");
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

export default { buildLocalesSync };
