import { ThemeConfig, SatoriMarkdown } from './satoriMD';

export type PosterTemplateProps = {
  markdown: string;
  title?: string;
  style?: React.CSSProperties;
  themeConfig?: ThemeConfig;
};

export const PosterTemplate = async (props: PosterTemplateProps) => {
  // 使用引擎的 renderComponent 成员方法
  return <SatoriMarkdown {...props} />;
};
