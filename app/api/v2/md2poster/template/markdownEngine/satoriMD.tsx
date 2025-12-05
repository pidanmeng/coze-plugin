import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeReact from 'rehype-react';
import {
  PropsWithChildren,
  CSSProperties,
  FC,
  Children,
  isValidElement,
  ReactNode,
  createElement,
  Fragment,
} from 'react';
import { deepMerge } from '@/app/tools/utils/deepMerge';

type StyleMapping = Record<string, CSSProperties>;

type EngineContext = {
  colors: ColorConfig;
  sizing: SizingConfig;
  fonts: FontConfig;
  styles: StyleMapping;
  // renderer: Record<string, SingleRenderer>;
};

type SingleRenderer = FC<
  PropsWithChildren<{
    style?: CSSProperties;
    id?: string;
    context: EngineContext;
  }>
>;

// ==================== 常量定义 ====================
const blockElementNames = [
  'div',
  'p',
  'ul',
  'ol',
  'pre',
  'blockquote',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
];
const inlineElementNames = ['span', 'a', 'strong', 'em', 'code', 'img'];
const voidElements = ['hr', 'br', 'img', 'input', 'meta', 'link'];

// ==================== 主题配置类型定义 ====================
/** 颜色配置 */
export interface ColorConfig {
  primary: string;
  border: string;
  background: string;
  text: string;
  textMuted: string;
  codeBackground: string;
  linkColor: string;
}

/** 尺寸配置 */
export interface SizingConfig {
  baseFontSize: number;
  h1FontSize: number;
  h2FontSize: number;
  h3FontSize: number;
  pFontSize: number;
  liFontSize: number;
  codeFontSize: number;
  baseMargin: number;
  borderRadius: number;
  borderWidth: number;
  paddingSmall: number;
  paddingMedium: number;
  paddingLarge: number;
}

/** 字体配置 */
export interface FontConfig {
  family: string;
  monoFamily: string;
}

/** 完整主题配置 */
export interface ThemeConfig {
  colors?: Partial<ColorConfig>;
  sizing?: Partial<SizingConfig>;
  fonts?: Partial<FontConfig>;
  // 高级定制：允许用户覆写特定的元素样式
  styleOverrides?: Partial<StyleMapping>;
  // 高级定制：允许用户覆写特定元素的渲染器
  rendererOverrides?: Partial<Record<string, SingleRenderer>>;
}

// ==================== 默认主题配置 ====================
const createDefaultColors = (): ColorConfig => ({
  primary: '#0366d6',
  border: '#ddd',
  background: '#ffffff',
  text: '#333',
  textMuted: '#666',
  codeBackground: '#f6f8fa',
  linkColor: '#0366d6',
});

const createDefaultSizing = (): SizingConfig => ({
  baseFontSize: 24,
  h1FontSize: 24,
  h2FontSize: 20,
  h3FontSize: 18,
  pFontSize: 16,
  liFontSize: 14,
  codeFontSize: 14,
  baseMargin: 12,
  borderRadius: 3,
  borderWidth: 1,
  paddingSmall: 4,
  paddingMedium: 6,
  paddingLarge: 12,
});

const createDefaultFonts = (): FontConfig => ({
  family: 'Inter, sans-serif, Microsoft YaHei',
  monoFamily: 'monospace',
});

// ==================== Markdown 主题引擎 ====================
class MarkdownThemeEngine {
  public colors: ColorConfig;
  public sizing: SizingConfig;
  public fonts: FontConfig;
  public styles: StyleMapping;
  public renderer: Record<string, SingleRenderer>;
  private blockElementNames: string[];
  private processor: any;
  private styleOverrides: Partial<StyleMapping>;
  private rendererOverrides: Partial<Record<string, SingleRenderer>>;

  constructor(config?: ThemeConfig) {
    // 初始化配置（支持深度合并）
    this.colors = deepMerge(createDefaultColors(), config?.colors);
    this.sizing = deepMerge(createDefaultSizing(), config?.sizing);
    this.fonts = deepMerge(createDefaultFonts(), config?.fonts);
    this.blockElementNames = blockElementNames;

    // 保存覆写配置
    this.styleOverrides = config?.styleOverrides || {};
    this.rendererOverrides = config?.rendererOverrides || {};

    // 构建样式映射
    this.styles = this.buildDefaultStyles();

    // 构建渲染器
    this.renderer = this.buildDefaultRenderer();

    // 初始化处理器
    this.processor = this.createProcessor();
  }

  /**
   * 构建默认样式映射
   */
  private buildDefaultStyles(): StyleMapping {
    const { colors, sizing, fonts } = this;

    const defaultStyles: StyleMapping = {
      div: { display: 'flex', flexDirection: 'column' },
      p: {
        display: 'flex',
        margin: `${sizing.baseMargin}px 0`,
        fontSize: `${sizing.pFontSize}px`,
        alignItems: 'center',
        gap: 4,
      },
      h1: {
        display: 'flex',
        fontSize: `${sizing.h1FontSize}px`,
        fontWeight: 'bold',
        margin: `${sizing.baseMargin + 4}px 0`,
      },
      h2: {
        display: 'flex',
        fontSize: `${sizing.h2FontSize}px`,
        fontWeight: 'bold',
        margin: `${sizing.baseMargin + 2}px 0`,
      },
      h3: {
        display: 'flex',
        fontSize: `${sizing.h3FontSize}px`,
        fontWeight: 'bold',
        margin: `${sizing.baseMargin}px 0`,
      },
      ul: {
        display: 'flex',
        flexDirection: 'column',
        margin: `${sizing.baseMargin}px 0`,
        paddingLeft: `${sizing.paddingLarge + 8}px`,
      },
      ol: {
        display: 'flex',
        flexDirection: 'column',
        margin: `${sizing.baseMargin}px 0`,
        paddingLeft: `${sizing.paddingLarge + 8}px`,
      },
      li: {
        margin: `${sizing.paddingSmall}px 0`,
        fontSize: `${sizing.liFontSize}px`,
        listStyleType: 'disc',
        display: 'flex',
        flexDirection: 'column',
      },
      blockquote: {
        display: 'flex',
        borderLeft: `${sizing.borderWidth * 3}px solid ${colors.border}`,
        paddingLeft: `${sizing.paddingMedium}px`,
        margin: `${sizing.baseMargin}px 0`,
        color: colors.textMuted,
      },
      code: {
        backgroundColor: colors.codeBackground,
        padding: `${sizing.paddingSmall}px ${sizing.paddingSmall * 2}px`,
        borderRadius: `${sizing.borderRadius}px`,
        fontFamily: fonts.monoFamily,
        fontSize: `${sizing.codeFontSize}px`,
      },
      pre: {
        display: 'flex',
        backgroundColor: colors.codeBackground,
        padding: `${sizing.paddingMedium}px`,
        borderRadius: `${sizing.borderRadius * 2}px`,
        margin: `${sizing.baseMargin}px 0`,
        fontFamily: fonts.monoFamily,
        fontSize: `${sizing.codeFontSize}px`,
        overflowX: 'auto',
      },
      a: {
        display: 'contents',
        color: colors.linkColor,
        textDecoration: 'underline',
      },
      hr: {
        display: 'flex',
        borderTop: `${sizing.borderWidth}px solid ${colors.border}`,
        margin: `${sizing.baseMargin * 1.3}px 0`,
      },
      table: {
        display: 'flex',
        flexDirection: 'column',
        border: `${sizing.borderWidth}px solid ${colors.border}`,
        margin: `${sizing.baseMargin}px 0`,
      },
      thead: { display: 'flex', backgroundColor: colors.background, flex: 1 },
      tbody: { display: 'flex', flexDirection: 'column', flex: 1 },
      tr: { display: 'flex', flex: 1 },
      th: {
        display: 'flex',
        padding: `${sizing.paddingMedium}px ${sizing.paddingMedium + 4}px`,
        border: `${sizing.borderWidth}px solid ${colors.border}`,
        fontWeight: 'bold',
        fontSize: `${sizing.codeFontSize}px`,
        flex: 1,
      },
      td: {
        display: 'flex',
        padding: `${sizing.paddingMedium}px ${sizing.paddingMedium + 4}px`,
        border: `${sizing.borderWidth}px solid ${colors.border}`,
        fontSize: `${sizing.codeFontSize}px`,
        flex: 1,
      },
      span: {},
    };

    // 应用用户的样式覆写（深度合并）
    return deepMerge(defaultStyles, this.styleOverrides);
  }

  /**
   * 构建默认渲染器
   */
  private buildDefaultRenderer(): Record<string, SingleRenderer> {
    const defaultRenderer: Record<string, SingleRenderer> = {
      li: (props) => {
        const { style = {}, id, context } = props;
        const { sizing } = context;
        const { listStyleType = 'disc' } = style;

        const ListSign = () => {
          const index = id ? parseInt((id as any)[0]?.split('-')[1] || '0') : 0;
          const signStyle: CSSProperties = {
            position: 'absolute',
            left: -sizing.paddingLarge - 8,
            top: 0,
            height: '100%',
            lineHeight: '1.5',
          };
          switch (listStyleType) {
            case 'disc':
              return <span style={signStyle}>•</span>;
            case 'circle':
              return <span style={signStyle}>○</span>;
            case 'square':
              return <span style={signStyle}>■</span>;
            case 'auto':
              return <span style={signStyle}>{index + 1}.</span>;
            default:
              return null;
          }
        };

        const childrenArray = Children.toArray(props.children);
        const wrappedChildren: ReactNode[] = [];
        let textGroup: ReactNode[] = [];

        childrenArray.forEach((child) => {
          const isListElement =
            isValidElement(child) &&
            typeof child.type === 'string' &&
            ['ul', 'ol'].includes(child.type);

          if (isListElement) {
            // 遇到列表元素，先将之前的文本组合成一个 p 标签
            if (textGroup.length > 0) {
              wrappedChildren.push(
                createElement(
                  'p',
                  {
                    style: {
                      display: 'flex',
                      margin: 0,
                      fontSize: `${sizing.liFontSize}px`,
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 4,
                    },
                  },
                  ...textGroup
                )
              );
              textGroup = [];
            }
            // 将列表元素直接添加
            wrappedChildren.push(child);
          } else {
            // 非列表元素，加入文本组
            textGroup.push(child);
          }
        });

        // 处理最后剩余的文本组
        if (textGroup.length > 0) {
          wrappedChildren.push(
            createElement(
              'p',
              {
                style: {
                  display: 'flex',
                  margin: 0,
                  fontSize: `${sizing.liFontSize}px`,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 4,
                },
              },
              ...textGroup
            )
          );
        }

        return (
          <li
            {...props}
            style={{
              ...props.style,
              position: 'relative',
              margin: `${sizing.paddingSmall}px 0`,
            }}
          >
            <ListSign />
            {wrappedChildren}
          </li>
        );
      },
    };

    // 应用用户的渲染器覆写（深度合并）
    return deepMerge(defaultRenderer, this.rendererOverrides);
  }

  /**
   * 创建元素的工厂函数
   */
  private createElement = (
    type: string,
    props: Record<string, any> | null,
    ...children: ReactNode[]
  ) => {
    const style: CSSProperties = { ...(props?.style || {}) };

    if (this.styles[type]) {
      Object.assign(style, this.styles[type], style);
    } else if (this.blockElementNames.includes(type)) {
      style.display = 'flex';
      style.flexDirection = style.flexDirection || 'column';
    }

    const { className, ...restProps } = props || {};
    const targetElement = this.renderer[type] || type;

    return createElement(
      targetElement,
      {
        ...restProps,
        style,
        context: this.createContext(),
      },
      ...children
    );
  };

  private createContext(): EngineContext {
    return {
      sizing: this.sizing,
      colors: this.colors,
      fonts: this.fonts,
      styles: this.styles,
      // renderer: this.renderer,
    };
  }

  /**
   * 创建元素代理
   */
  private createElementProxy = (
    type: string,
    props: Record<string, any> & { children?: ReactNode },
    ...id: ReactNode[]
  ) => {
    return this.createElement(
      type,
      {
        ...props,
        id,
        key: id,
        style: {
          ...props.style,
          ...(typeof type === 'symbol'
            ? { flexDirection: 'column', display: 'flex' }
            : {}),
        },
      },
      props.children
    );
  };

  /**
   * 创建 Markdown 处理器
   */
  private createProcessor() {
    return (
      unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype, { allowDangerousHtml: false })
        // @ts-ignore
        .use(rehypeReact, {
          Fragment: Fragment,
          development: false,
          jsx: this.createElementProxy,
          jsxs: this.createElementProxy,
        })
    );
  }

  /**
   * 处理 Markdown 文本
   */
  public renderMarkdown(markdown: string) {
    const result = this.processor.processSync(markdown).result;
    return <>{result}</>;
  }

  /**
   * 获取配置（用于调试或扩展）
   */
  public getConfig() {
    return {
      colors: this.colors,
      sizing: this.sizing,
      fonts: this.fonts,
    };
  }
}

export type PosterTemplateProps = {
  markdown: string;
  title?: string;
  style?: CSSProperties;
  themeConfig: ThemeConfig;
};

/**
 * Satori Markdown 组件
 * 使用主题引擎渲染 Markdown 为 React 元素
 */
export const SatoriMarkdown = (props: PosterTemplateProps) => {
  const { markdown, title, style, themeConfig } = props;
  let engine: MarkdownThemeEngine = new MarkdownThemeEngine(themeConfig);

  const Result = engine.renderMarkdown(markdown);
  return (
    <div
      style={{
        width: '100%',
        minHeight: '100%',
        backgroundColor: engine.colors.background,
        display: 'flex',
        flexDirection: 'column',
        padding: '40px',
        fontFamily: engine.fonts.family,
        fontSize: `${engine.sizing.baseFontSize}px`,
        fontWeight: 400,
        color: engine.colors.text,
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {title && (
        <h1
          style={{
            display: 'flex',
            fontSize: '36px',
            fontWeight: 700,
            marginBottom: '20px',
            color: engine.colors.text,
            borderBottom: `2px solid ${engine.colors.border}`,
            paddingBottom: '10px',
          }}
        >
          {title}
        </h1>
      )}

      <div
        style={{
          display: 'flex',
          flex: 1,
          overflow: 'hidden',
          flexDirection: 'column',
        }}
      >
        {Result}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginTop: '20px',
          paddingTop: '20px',
          borderTop: `1px solid ${engine.colors.border}`,
          fontSize: '18px',
          color: engine.colors.textMuted,
        }}
      >
        Generated by 百宝箱
      </div>
    </div>
  );
};
