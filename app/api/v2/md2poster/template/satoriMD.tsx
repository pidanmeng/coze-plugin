import * as React from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeReact from 'rehype-react';
import { PropsWithChildren, CSSProperties } from 'react';

type StyleMapping = Record<string, CSSProperties>;

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

// 定义 Satori 兼容的默认样式（按标签名）
const DEFAULT_STYLES: StyleMapping = {
  div: { display: 'flex', flexDirection: 'column' },
  p: { display: 'flex', margin: '12px 0', fontSize: '16px' },
  h1: {
    display: 'flex',
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '16px 0',
  },
  h2: {
    display: 'flex',
    fontSize: '20px',
    fontWeight: 'bold',
    margin: '14px 0',
  },
  h3: {
    display: 'flex',
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '12px 0',
  },
  ul: {
    display: 'flex',
    flexDirection: 'column',
    margin: '12px 0',
    paddingLeft: '20px',
  },
  ol: {
    display: 'flex',
    flexDirection: 'column',
    margin: '12px 0',
    paddingLeft: '20px',
  },
  li: {
    margin: '4px 0',
    fontSize: '14px',
    listStyleType: 'disc',
    display: 'flex',
    flexDirection: 'column',
  },
  blockquote: {
    display: 'flex',
    borderLeft: '3px solid #ddd',
    paddingLeft: '12px',
    margin: '12px 0',
    color: '#666',
  },
  code: {
    backgroundColor: '#f6f8fa',
    padding: '2px 4px',
    borderRadius: '3px',
    fontFamily: 'monospace',
    fontSize: '14px',
  },
  pre: {
    display: 'flex',
    backgroundColor: '#f6f8fa',
    padding: '12px',
    borderRadius: '6px',
    margin: '12px 0',
    fontFamily: 'monospace',
    fontSize: '14px',
    overflowX: 'auto',
  },
  a: { display: 'contents', color: '#0366d6', textDecoration: 'underline' },
  hr: { display: 'flex', borderTop: '1px solid #eee', margin: '16px 0' },
  table: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #ddd',
    margin: '12px 0',
  },
  thead: { display: 'flex', backgroundColor: '#f6f8fa', flex: 1 },
  tbody: { display: 'flex', flexDirection: 'column', flex: 1 },
  tr: { display: 'flex', flex: 1 },
  th: {
    display: 'flex',
    padding: '6px 10px',
    border: '1px solid #ddd',
    fontWeight: 'bold',
    fontSize: '14px',
    flex: 1,
  },
  td: {
    display: 'flex',
    padding: '6px 10px',
    border: '1px solid #ddd',
    fontSize: '14px',
    flex: 1,
  },
  // 注意：span 默认是 inline，Satori 允许多个子节点（因为不是容器）
  span: {},
};

const DEFAULT_RENDERER: Record<
  string,
  React.FC<
    PropsWithChildren<{
      style?: CSSProperties;
      id?: string;
      styleMap: StyleMapping;
    }>
  >
> = {
  li: (props) => {
    const { style = {}, id } = props;
    const { listStyleType = 'disc' } = style;
    const ListSign = () => {
      const index = id ? parseInt(id[0].split('-')[1]) : 0;
      const style: CSSProperties = {
        position: 'absolute',
        left: -20,
        top: 0,
      };
      switch (listStyleType) {
        case 'disc':
          return <span style={style}>•</span>;
        case 'circle':
          return <span style={style}>○</span>;
        case 'square':
          return <span style={style}>■</span>;
        case 'auto':
          return <span style={style}>{index + 1}.</span>;
        default:
          return null;
      }
    };

    // 将 children 转为数组：除 `ul` / `ol` 外，其他子节点都用 `p` 包裹
    const wrappedChildren = React.Children.toArray(props.children).map(
      (child) => {
        if (
          React.isValidElement(child) &&
          typeof child.type === 'string' &&
          (child.type === 'ul' || child.type === 'ol')
        ) {
          return child;
        }

        return React.createElement(
          'p',
          {
            style: {
              display: 'flex',
              margin: 0,
              fontSize: '14px',
              flexDirection: 'row',
            },
          },
          child
        );
      }
    );

    return (
      <li
        {...props}
        style={{
          ...props.style,
          position: 'relative',
          margin: '4px 0',
        }}
      >
        <ListSign />
        {wrappedChildren}
      </li>
    );
  },
};

// 自定义 createElement：注入 display + 内联样式
const createElement = (
  type: string,
  props: Record<string, any> | null,
  ...children: React.ReactNode[]
) => {
  const style: React.CSSProperties = { ...(props?.style || {}) };

  // 如果是块级标签，确保有 display
  if (DEFAULT_STYLES[type]) {
    Object.assign(style, DEFAULT_STYLES[type], style);
  } else if (blockElementNames.includes(type)) {
    style.display = 'flex';
    style.flexDirection = style.flexDirection || 'column';
  }

  const { className, ...restProps } = props || {};

  const targetElement = DEFAULT_RENDERER[type] || type;
  return React.createElement(
    targetElement,
    { ...restProps, style, styleMap: DEFAULT_STYLES },
    ...children
  );
};

const createElementProxy = (
  type: string,
  props: Record<string, any> & { children?: React.ReactNode },
  ...id: React.ReactNode[]
) => {
  return createElement(
    type,
    {
      ...props,
      id,
      key: id,
      style: {
        ...props.style,
        ...(typeof type === 'symbol' ? { flexDirection: 'column' } : {}),
        // flexDirection: 'column',
      },
    },
    props.children
  );
};

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: false })
  // @ts-ignore
  .use(rehypeReact, {
    Fragment: React.Fragment,
    development: false,
    jsx: createElementProxy,
    jsxs: createElementProxy,
  });

export type PosterTemplateProps = {
  markdown: string;
  title?: string;
  backgroundColor: string;
  style?: React.CSSProperties;
};
export const SatoriMarkdown = (props: PosterTemplateProps) => {
  const { markdown, title, backgroundColor, style } = props;
  const Result = processor.processSync(markdown).result as React.ReactElement;

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100%',
        backgroundColor,
        display: 'flex',
        flexDirection: 'column',
        padding: '40px',
        fontFamily: 'Inter, sans-serif, Wei-ruan-ya-hei',
        fontSize: '24px',
        fontWeight: 400,
        color: '#333',
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
            color: '#222',
            borderBottom: '2px solid #eee',
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
          borderTop: '1px solid #eee',
          fontSize: '18px',
        }}
      >
        Generated by 百宝箱
      </div>
    </div>
  );
  // return result.result as React.ReactElement;
};
