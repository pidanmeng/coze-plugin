import { SatoriMarkdown } from './satoriMD';

export type PosterTemplateProps = {
  markdown: string;
  title?: string;
  backgroundColor: string;
  style?: React.CSSProperties;
};

export const PosterTemplate = async (props: PosterTemplateProps) => {
  return <SatoriMarkdown {...props} />;
};
