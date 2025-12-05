/**
 * SatoriMarkdown 主题系统 - 实际使用示例
 * 演示如何在真实项目中使用新的主题系统
 */

import React, { useState } from 'react';
import { SatoriMarkdown } from './satoriMD';
import { themes, getTheme, getAvailableThemes, type ThemeName } from './themes';

// ==================== 示例 1: 基础使用 ====================

/**
 * 使用默认主题的最简单示例
 */
export function SimpleExample() {
  const markdown = `
# 欢迎

这是一个简单的示例。

- 项目 1
- 项目 2
- 项目 3
`;

  return <SatoriMarkdown markdown={markdown} title="简单示例" />;
}

// ==================== 示例 2: 使用预设主题 ====================

/**
 * 使用预定义的主题
 */
export function PresetThemeExample() {
  const markdown = `
# 产品介绍

我们的产品具有以下特性：

## 主要功能
- 快速部署
- 易于使用
- 完全可定制

## 代码示例
\`\`\`javascript
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`
`;

  return (
    <div>
      {/* 亮色主题 */}
      <div style={{ marginBottom: '20px' }}>
        <h2>亮色主题</h2>
        <SatoriMarkdown
          markdown={markdown}
          title="亮色主题示例"
          themeConfig={themes.light}
        />
      </div>

      {/* 深色主题 */}
      <div style={{ marginBottom: '20px' }}>
        <h2>深色主题</h2>
        <SatoriMarkdown
          markdown={markdown}
          title="深色主题示例"
          themeConfig={themes.dark}
        />
      </div>

      {/* 极简主题 */}
      <div style={{ marginBottom: '20px' }}>
        <h2>极简主题</h2>
        <SatoriMarkdown
          markdown={markdown}
          title="极简主题示例"
          themeConfig={themes.minimal}
        />
      </div>
    </div>
  );
}

// ==================== 示例 3: 主题切换器 ====================

/**
 * 交互式主题切换器
 * 演示如何在应用中实现主题切换
 */
export function ThemeSwitcherExample() {
  const [selectedTheme, setSelectedTheme] = useState<ThemeName>('light');

  const markdown = `
# 主题切换演示

这个示例展示了如何在运行时切换不同的主题。

## 特点

- 实时切换
- 多种主题选择
- 无需刷新页面

### 使用步骤

1. 从下拉菜单中选择主题
2. 预览立即更新
3. 选择你最喜欢的设计

## 可用的主题

- light (亮色)
- dark (深色)
- minimal (极简)
- professional (专业)
- neon (霓虹)
- warm (暖色)
- cool (冷色)
- ecommerce (电商)
- techDoc (技术文档)
- education (教育)
- news (新闻)
`;

  const availableThemes = getAvailableThemes();
  const currentTheme = getTheme(selectedTheme);

  // 根据主题选择合适的背景色
  const getBackgroundColor = (theme: ThemeName) => {
    if (theme === 'dark') return '#0a0e27';
    if (theme === 'neon') return '#0a0e27';
    return '#ffffff';
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="theme-select" style={{ marginRight: '10px' }}>
          选择主题:
        </label>
        <select
          id="theme-select"
          value={selectedTheme}
          onChange={(e) => setSelectedTheme(e.target.value as ThemeName)}
          style={{ padding: '8px 12px', fontSize: '16px' }}
        >
          {availableThemes.map((theme) => (
            <option key={theme} value={theme}>
              {theme}
            </option>
          ))}
        </select>
      </div>

      <div
        style={{
          border: '2px solid #ccc',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        <SatoriMarkdown
          markdown={markdown}
          title={`${selectedTheme} 主题`}
          themeConfig={currentTheme}
        />
      </div>
    </div>
  );
}

// ==================== 示例 4: 自定义主题 ====================

/**
 * 演示如何创建和使用完全自定义的主题
 */
export function CustomThemeExample() {
  // 自定义品牌主题
  const brandTheme = {
    colors: {
      primary: '#ff0000',
      border: '#ffc0cb',
      background: '#fff5f5',
      text: '#4a0000',
      textMuted: '#8b4545',
      codeBackground: '#ffe0e0',
      linkColor: '#cc0000',
    },
    sizing: {
      baseFontSize: 22,
      h1FontSize: 32,
      h2FontSize: 26,
      h3FontSize: 22,
      pFontSize: 16,
      liFontSize: 15,
      codeFontSize: 13,
      baseMargin: 14,
      borderRadius: 6,
      borderWidth: 2,
      paddingSmall: 6,
      paddingMedium: 8,
      paddingLarge: 16,
    },
    fonts: {
      family: '"Arial", sans-serif',
      monoFamily: '"Courier New", monospace',
    },
  };

  const markdown = `
# 品牌定制主题

这是一个完全自定义的主题示例。

## 特色

- 符合品牌指南
- 一致的设计语言
- 专业的外观

### 配置示例

\`\`\`javascript
const brandTheme = {
  colors: { /* 自定义颜色 */ },
  sizing: { /* 自定义尺寸 */ },
  fonts: { /* 自定义字体 */ }
};
\`\`\`
`;

  return (
    <SatoriMarkdown
      markdown={markdown}
      title="品牌定制主题"
      themeConfig={brandTheme}
    />
  );
}

// ==================== 示例 5: 部分配置覆盖 ====================

/**
 * 演示如何只覆盖配置的某些部分
 */
export function PartialConfigExample() {
  const markdown = `
# 部分配置覆盖

只修改特定的配置参数，其他参数保持默认值。

## 示例

- 只改变颜色
- 只改变字体大小
- 只改变字体族

### 优点

- 灵活组合
- 代码简洁
- 易于维护
`;

  // 只覆盖颜色配置
  const colorCustom = {
    colors: {
      primary: '#0066cc',
      linkColor: '#0052a3',
      text: '#003366',
    },
  };

  // 只覆盖尺寸配置
  const sizeCustom = {
    sizing: {
      h1FontSize: 32,
      h2FontSize: 26,
      baseFontSize: 20,
    },
  };

  // 只覆盖字体配置
  const fontCustom = {
    fonts: {
      family: 'Georgia, serif',
      monoFamily: 'Monaco, monospace',
    },
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h3>只覆盖颜色</h3>
        <SatoriMarkdown
          markdown={markdown}
          title="颜色定制"
          themeConfig={colorCustom}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>只覆盖尺寸</h3>
        <SatoriMarkdown
          markdown={markdown}
          title="尺寸定制"
          themeConfig={sizeCustom}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>只覆盖字体</h3>
        <SatoriMarkdown
          markdown={markdown}
          title="字体定制"
          themeConfig={fontCustom}
        />
      </div>
    </div>
  );
}

// ==================== 示例 6: 内容导出示例 ====================

/**
 * 演示电商场景下的主题使用
 */
export function EcommercePosterExample() {
  const productMarkdown = `
# 年度大促销

## 限时优惠

享受高达 **50% OFF** 的折扣

### 热销商品

1. 产品 A - 原价 ¥999，现价 ¥499
2. 产品 B - 原价 ¥599，现价 ¥299
3. 产品 C - 原价 ¥799，现价 ¥399

### 活动须知

- 限时活动，仅限本周
- 每个账户最多购买 5 件
- 满 ¥200 免邮费

\`\`\`
立即前往购买 →
\`\`\`
`;

  return (
    <SatoriMarkdown
      markdown={productMarkdown}
      title="年度大促"
      themeConfig={themes.ecommerce}
    />
  );
}

// ==================== 示例 7: 技术文档示例 ====================

/**
 * 演示技术文档场景的主题使用
 */
export function TechDocExample() {
  const docMarkdown = `
# API 文档

## 快速开始

### 安装

\`\`\`bash
npm install markdown-theme
\`\`\`

### 基础使用

\`\`\`javascript
import { MarkdownThemeEngine } from 'markdown-theme';

const engine = new MarkdownThemeEngine({
  colors: { primary: '#0066cc' }
});
\`\`\`

## API 参考

- \`renderMarkdown(md)\` - 渲染 Markdown 文本
- \`getConfig()\` - 获取当前配置
- \`updateConfig(config)\` - 更新配置

## 示例代码

\`\`\`typescript
const result = engine.renderMarkdown('# 标题');
console.log(result);
\`\`\`
`;

  return (
    <SatoriMarkdown
      markdown={docMarkdown}
      title="API 文档"
      themeConfig={themes.techDoc}
    />
  );
}

// ==================== 示例 8: 主题列表展示 ====================

/**
 * 展示所有可用的主题
 */
export function AllThemesShowcase() {
  const simpleContent = `
# 主题展示

这是一个简单的内容示例。

- 第一项
- 第二项
- 第三项

**加粗文本** 和 *斜体文本*
`;

  const getBackgroundColor = (theme: ThemeName) => {
    if (theme === 'dark') return '#0a0e27';
    if (theme === 'neon') return '#0a0e27';
    return '#ffffff';
  };

  const availableThemes = getAvailableThemes();

  return (
    <div style={{ padding: '20px' }}>
      <h1>所有主题展示</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '20px',
        }}
      >
        {availableThemes.map((theme) => (
          <div
            key={theme}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            <SatoriMarkdown
              markdown={simpleContent}
              title={theme}
              themeConfig={getTheme(theme)}
              style={{ height: '300px' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ==================== 导出所有示例 ====================

export const examples = {
  simple: SimpleExample,
  presetTheme: PresetThemeExample,
  themeSwitcher: ThemeSwitcherExample,
  customTheme: CustomThemeExample,
  partialConfig: PartialConfigExample,
  ecommercePoster: EcommercePosterExample,
  techDoc: TechDocExample,
  allThemes: AllThemesShowcase,
} as const;
