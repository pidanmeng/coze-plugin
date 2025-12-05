import { SatoriMarkdown } from "./markdownEngine/satoriMD";
import { getTheme, ThemeName } from "./markdownEngine/themes";

export type PosterTemplateProps = {
  markdown: string;
  title?: string;
  style?: React.CSSProperties;
  theme: ThemeName;
};

export const PosterTemplate = (props: PosterTemplateProps) => {
  const themeConfig = getTheme(props.theme);
  // 使用引擎的 renderComponent 成员方法
  return <SatoriMarkdown {...props} themeConfig={themeConfig} />;
};
