import React from "react";
import { useI18n } from "./hooks";

interface TransProps {
  keyword: string;
  substitutions?: string | string[];
}

/**
 * 번역된 텍스트를 표시하는 컴포넌트
 */
export const Trans = ({ keyword, substitutions }: TransProps) => {
  const { t } = useI18n();
  return <>{t(keyword, substitutions)}</>;
};
