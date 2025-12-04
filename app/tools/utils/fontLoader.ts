import { readFileSync } from 'fs';
import { resolve } from 'path';

/**
 * 字体加载工具函数
 * 该函数可以从项目的public/fonts目录加载字体文件，
 * 不管在哪个文件中调用都可以正确访问到字体文件
 */
export function loadFonts() {
  // 获取项目根目录路径
  const projectRoot = process.cwd();

  return [
    {
      name: 'Inter',
      data: readFileSync(
        resolve(projectRoot, 'public/fonts/Inter-Medium.woff')
      ),
      weight: 400 as const,
      style: 'normal' as const,
    },
    {
      name: 'Inter',
      data: readFileSync(resolve(projectRoot, 'public/fonts/Inter-Bold.woff')),
      weight: 700 as const,
      style: 'normal' as const,
    },
    {
      name: 'Wei-ruan-ya-hei',
      data: readFileSync(resolve(projectRoot, 'public/fonts/微软雅黑.ttf')),
      weight: 400 as const,
      style: 'italic' as const,
    },
  ] as const;
}
