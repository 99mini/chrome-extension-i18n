import { actionFn } from '../../type';
import { initProject } from './service';

/**
 * i18n-cli init 명령어 처리 함수
 * 프로젝트 초기화를 수행합니다.
 */
export const initAction: actionFn = () => {
  console.log('🚀 init i18n');

  // 프로젝트 초기화 실행
  initProject();
};
