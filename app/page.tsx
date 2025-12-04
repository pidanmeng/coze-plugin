import { PosterTemplate } from '@/app/api/v2/md2poster/template/posterTemplate';
import satori from 'satori';
import { loadFonts } from './tools/utils/fontLoader';

const markdown = `# 欢迎使用 Markdown 海报生成器\n\n这是一个功能强大的\`工具\`，可以将 Markdown 内容转换成精美的海报！\n\n## 主要特性\n\n- **简单易用** - 只需要编写 Markdown\n- **高度自定义** - 支持自定义尺寸和样式\n- **快速生成** - 实时预览和下载\n\n### 支持的语法\n\n1. 标题（H1-H6）\n2. 粗体文本：**加粗文字** **zxcv**\n3. 斜体文本：*倾斜文字* *asdf*\n4. 删除线：~~删除文字~~ ~~abcd~~\n5. 行内代码：\`console.log('Hello')\`\n\n> 这是一个引用块示例\n\n---\n\n### 代码示例\n\n\`\`\`javascript\nfunction greet(name) {\n  return \`Hello, \${name}!\`;\n}\n\nconsole.log(greet('World'));\n\`\`\`\n\n### 列表示例\n\n- 项目 1\n- 项目 2 \`codeblock\` \n  - 子项目 2.1\n  - 子项目 2.2\n\n### 表格示例\n\n| 姓名 | 年龄 | 城市 |\n| ---- | ---- | ---- |\n| 张三 | 25   | 北京 |\n| 李四 | 30   | 上海 |\n\n让我们一起创造更美好的内容展示方式！\n\n![](https://picsum.photos/800/450)`;

export default async function Home() {
  const Element = (
    <PosterTemplate
      markdown={markdown}
      title="Markdown to Poster"
      backgroundColor="#fff"
    />
  );
  const svg = await satori(Element, {
    width: 800,
    fonts: [...loadFonts()],
  });
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'start',
        justifyContent: 'center',
      }}
    >
      <PosterTemplate
        markdown={markdown}
        title="Markdown to Poster"
        backgroundColor="#fff"
        style={{ width: '50%' }}
      />
      <img
        src={`data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`}
        alt="Poster"
        style={{ width: '50%' }}
      />
    </div>
  );
}
