/**
 * 主题预设集合
 * 包含多种预定义的 Markdown 主题
 */

import type { ThemeConfig } from './satoriMD';

// ==================== 基础主题 ====================

/**
 * 亮色主题 - GitHub 风格
 * 简洁、易读的默认主题
 */
export const lightTheme: ThemeConfig = {
  colors: {
    primary: '#0366d6',
    border: '#ddd',
    background: '#f6f8fa',
    text: '#333',
    textMuted: '#666',
    codeBackground: '#f6f8fa',
    linkColor: '#0366d6',
  },
  sizing: {
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
  },
  fonts: {
    family: 'Inter, sans-serif, Microsoft YaHei',
    monoFamily: 'monospace',
  },
};

/**
 * 深色主题
 * 护眼的深色模式
 */
export const darkTheme: ThemeConfig = {
  colors: {
    primary: '#58a6ff',
    border: '#444',
    background: '#1e1e1e',
    text: '#e0e0e0',
    textMuted: '#a0a0a0',
    codeBackground: '#2d2d2d',
    linkColor: '#79c0ff',
  },
  sizing: {
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
  },
  fonts: {
    family: 'Inter, sans-serif, Microsoft YaHei',
    monoFamily: 'monospace',
  },
};

// ==================== 专业主题 ====================

/**
 * 极简主题
 * 强调内容，最小化视觉干扰
 */
export const minimalTheme: ThemeConfig = {
  colors: {
    primary: '#000000',
    border: '#e0e0e0',
    background: '#fafafa',
    text: '#333333',
    textMuted: '#999999',
    codeBackground: '#f5f5f5',
    linkColor: '#0066cc',
  },
  sizing: {
    baseFontSize: 20,
    h1FontSize: 26,
    h2FontSize: 22,
    h3FontSize: 19,
    pFontSize: 15,
    liFontSize: 14,
    codeFontSize: 12,
    baseMargin: 10,
    borderRadius: 2,
    borderWidth: 1,
    paddingSmall: 3,
    paddingMedium: 5,
    paddingLarge: 10,
  },
  fonts: {
    family: 'Georgia, serif',
    monoFamily: 'Courier, monospace',
  },
};

/**
 * 专业商务主题
 * 适合企业级内容和报告
 */
export const professionalTheme: ThemeConfig = {
  colors: {
    primary: '#1e40af',
    border: '#cbd5e1',
    background: '#f8fafc',
    text: '#1e293b',
    textMuted: '#64748b',
    codeBackground: '#f1f5f9',
    linkColor: '#2563eb',
  },
  sizing: {
    baseFontSize: 22,
    h1FontSize: 28,
    h2FontSize: 24,
    h3FontSize: 20,
    pFontSize: 16,
    liFontSize: 15,
    codeFontSize: 13,
    baseMargin: 14,
    borderRadius: 4,
    borderWidth: 1,
    paddingSmall: 6,
    paddingMedium: 8,
    paddingLarge: 16,
  },
  fonts: {
    family: 'Segoe UI, sans-serif',
    monoFamily: 'Consolas, monospace',
  },
};

// ==================== 创意主题 ====================

/**
 * 霓虹主题
 * 充满活力的未来感设计
 */
export const neonTheme: ThemeConfig = {
  colors: {
    primary: '#00ff88',
    border: '#00ff88',
    background: '#0a0e27',
    text: '#ffffff',
    textMuted: '#8899ff',
    codeBackground: '#1a1f3a',
    linkColor: '#00ffff',
  },
  sizing: {
    baseFontSize: 22,
    h1FontSize: 32,
    h2FontSize: 26,
    h3FontSize: 22,
    pFontSize: 16,
    liFontSize: 15,
    codeFontSize: 13,
    baseMargin: 16,
    borderRadius: 8,
    borderWidth: 2,
    paddingSmall: 8,
    paddingMedium: 12,
    paddingLarge: 20,
  },
  fonts: {
    family: '"Courier New", monospace',
    monoFamily: '"IBM Plex Mono", monospace',
  },
};

/**
 * 暖色主题
 * 温暖、友好的日系设计
 */
export const warmTheme: ThemeConfig = {
  colors: {
    primary: '#ff8c42',
    border: '#f4a76f',
    background: '#fff8f0',
    text: '#5a4a42',
    textMuted: '#8b7967',
    codeBackground: '#ffe8d6',
    linkColor: '#ff6b35',
  },
  sizing: {
    baseFontSize: 21,
    h1FontSize: 28,
    h2FontSize: 24,
    h3FontSize: 20,
    pFontSize: 16,
    liFontSize: 14,
    codeFontSize: 13,
    baseMargin: 13,
    borderRadius: 6,
    borderWidth: 1,
    paddingSmall: 5,
    paddingMedium: 7,
    paddingLarge: 14,
  },
  fonts: {
    family: '"Comic Sans MS", "Hiragino Maru Gothic Pro", sans-serif',
    monoFamily: '"Courier New", monospace',
  },
};

/**
 * 冷色主题
 * 冷静、专注的蓝调设计
 */
export const coolTheme: ThemeConfig = {
  colors: {
    primary: '#0066cc',
    border: '#4d94ff',
    background: '#f0f4f8',
    text: '#1a3a52',
    textMuted: '#4a6b8a',
    codeBackground: '#e6f0ff',
    linkColor: '#0052a3',
  },
  sizing: {
    baseFontSize: 22,
    h1FontSize: 28,
    h2FontSize: 24,
    h3FontSize: 20,
    pFontSize: 16,
    liFontSize: 14,
    codeFontSize: 13,
    baseMargin: 13,
    borderRadius: 4,
    borderWidth: 1,
    paddingSmall: 5,
    paddingMedium: 7,
    paddingLarge: 14,
  },
  fonts: {
    family: 'Georgia, serif',
    monoFamily: '"Roboto Mono", monospace',
  },
};

// ==================== 行业主题 ====================

/**
 * 电商营销主题
 * 鲜艳、活跃的商品展示主题
 */
export const ecommerceTheme: ThemeConfig = {
  colors: {
    primary: '#ff0000',
    border: '#ffb347',
    background: '#fffbf0',
    text: '#2c1810',
    textMuted: '#8b6f47',
    codeBackground: '#fff5e6',
    linkColor: '#ff6600',
  },
  sizing: {
    baseFontSize: 23,
    h1FontSize: 32,
    h2FontSize: 26,
    h3FontSize: 22,
    pFontSize: 16,
    liFontSize: 15,
    codeFontSize: 13,
    baseMargin: 14,
    borderRadius: 8,
    borderWidth: 2,
    paddingSmall: 6,
    paddingMedium: 8,
    paddingLarge: 16,
  },
  fonts: {
    family: '"Microsoft YaHei", sans-serif',
    monoFamily: '"Courier New", monospace',
  },
};

/**
 * 技术文档主题
 * 适合代码片段和技术文档的专业主题
 */
export const techDocTheme: ThemeConfig = {
  colors: {
    primary: '#2196f3',
    border: '#bdbdbd',
    background: '#f5f5f5',
    text: '#212121',
    textMuted: '#616161',
    codeBackground: '#eeeeee',
    linkColor: '#1565c0',
  },
  sizing: {
    baseFontSize: 18,
    h1FontSize: 28,
    h2FontSize: 24,
    h3FontSize: 20,
    pFontSize: 15,
    liFontSize: 14,
    codeFontSize: 12,
    baseMargin: 12,
    borderRadius: 3,
    borderWidth: 1,
    paddingSmall: 4,
    paddingMedium: 6,
    paddingLarge: 12,
  },
  fonts: {
    family: 'Segoe UI, sans-serif',
    monoFamily: 'Consolas, monospace',
  },
};

/**
 * 教育学习主题
 * 儿童友好、清晰易读的教学主题
 */
export const educationTheme: ThemeConfig = {
  colors: {
    primary: '#7c3aed',
    border: '#ddd6fe',
    background: '#faf5ff',
    text: '#4c1d95',
    textMuted: '#6b21a8',
    codeBackground: '#ede9fe',
    linkColor: '#7c3aed',
  },
  sizing: {
    baseFontSize: 24,
    h1FontSize: 32,
    h2FontSize: 26,
    h3FontSize: 22,
    pFontSize: 18,
    liFontSize: 16,
    codeFontSize: 14,
    baseMargin: 16,
    borderRadius: 12,
    borderWidth: 2,
    paddingSmall: 8,
    paddingMedium: 10,
    paddingLarge: 16,
  },
  fonts: {
    family: '"Comic Sans MS", "Apple Color Emoji", sans-serif',
    monoFamily: '"Monaco", monospace',
  },
};

/**
 * 新闻文章主题
 * 传统报纸风格的内容展示
 */
export const newsTheme: ThemeConfig = {
  colors: {
    primary: '#000000',
    border: '#cccccc',
    background: '#ffffff',
    text: '#1a1a1a',
    textMuted: '#666666',
    codeBackground: '#f0f0f0',
    linkColor: '#0066cc',
  },
  sizing: {
    baseFontSize: 20,
    h1FontSize: 32,
    h2FontSize: 26,
    h3FontSize: 22,
    pFontSize: 16,
    liFontSize: 15,
    codeFontSize: 13,
    baseMargin: 14,
    borderRadius: 0,
    borderWidth: 1,
    paddingSmall: 6,
    paddingMedium: 8,
    paddingLarge: 16,
  },
  fonts: {
    family: 'Georgia, serif',
    monoFamily: '"Courier New", monospace',
  },
};

// ==================== 导出所有主题 ====================

export const themes = {
  light: lightTheme,
  dark: darkTheme,
  minimal: minimalTheme,
  professional: professionalTheme,
  neon: neonTheme,
  warm: warmTheme,
  cool: coolTheme,
  ecommerce: ecommerceTheme,
  techDoc: techDocTheme,
  education: educationTheme,
  news: newsTheme,
} as const;

export type ThemeName = keyof typeof themes;

/**
 * 根据主题名称获取主题配置
 * @param name - 主题名称
 * @returns 主题配置对象
 */
export function getTheme(name: ThemeName): ThemeConfig {
  return themes[name];
}

/**
 * 获取所有可用主题名称
 */
export function getAvailableThemes(): ThemeName[] {
  return Object.keys(themes) as ThemeName[];
}
