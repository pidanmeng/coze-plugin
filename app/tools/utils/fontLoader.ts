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
      name: 'Georgia',
      data: readFileSync(resolve(projectRoot, 'public/fonts/GEORGIA.ttf')),
      weight: 400 as const,
      style: 'normal' as const,
    },
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
      name: 'serif',
      data: readFileSync(
        resolve(projectRoot, 'public/fonts/SourceHanSerifCN-SemiBold.otf')
      ),
      weight: 400 as const,
      style: 'normal' as const,
    },
    {
      name: 'serif',
      data: readFileSync(
        resolve(projectRoot, 'public/fonts/SourceHanSerifCN-Heavy.otf')
      ),
      weight: 700 as const,
      style: 'normal' as const,
    },
    {
      name: 'Microsoft YaHei',
      data: readFileSync(resolve(projectRoot, 'public/fonts/微软雅黑粗体.ttf')),
      weight: 700 as const,
      style: 'normal' as const,
    },
    {
      name: 'Microsoft YaHei',
      data: readFileSync(resolve(projectRoot, 'public/fonts/微软雅黑.ttf')),
      weight: 400 as const,
      style: 'normal' as const,
    },
    {
      name: 'sans-serif',
      data: readFileSync(
        resolve(projectRoot, 'public/fonts/Microsoft Sans Serif.ttf')
      ),
      weight: 400 as const,
      style: 'normal' as const,
    },
    {
      name: 'monospace',
      data: readFileSync(
        resolve(projectRoot, 'public/fonts/MonaspaceNeon-Regular.otf')
      ),
      weight: 400 as const,
      style: 'normal' as const,
    },
    {
      name: 'monospace',
      data: readFileSync(
        resolve(projectRoot, 'public/fonts/MonaspaceNeon-Bold.otf')
      ),
      weight: 700 as const,
      style: 'normal' as const,
    },
    {
      name: 'monospace',
      data: readFileSync(
        resolve(projectRoot, 'public/fonts/MonaspaceNeon-Italic.otf')
      ),
      weight: 400 as const,
      style: 'italic' as const,
    },
    {
      name: 'Segoe UI',
      data: readFileSync(resolve(projectRoot, 'public/fonts/segoeuithibd.ttf')),
      weight: 700 as const,
      style: 'normal' as const,
    },
    {
      name: 'Segoe UI',
      data: readFileSync(resolve(projectRoot, 'public/fonts/segoeuithis.ttf')),
      weight: 400 as const,
      style: 'normal' as const,
    },
    {
      name: 'Segoe UI',
      data: readFileSync(resolve(projectRoot, 'public/fonts/segoeuithisz.ttf')),
      weight: 700 as const,
      style: 'italic' as const,
    },
    {
      name: 'Segoe UI',
      data: readFileSync(resolve(projectRoot, 'public/fonts/segoeuithisi.ttf')),
      weight: 400 as const,
      style: 'italic' as const,
    },
    {
      name: 'Courier New',
      data: readFileSync(
        resolve(projectRoot, 'public/fonts/CourierPrime-Regular.ttf')
      ),
      weight: 400 as const,
      style: 'normal' as const,
    },
    {
      name: 'Courier New',
      data: readFileSync(
        resolve(projectRoot, 'public/fonts/CourierPrime-Bold.ttf')
      ),
      weight: 700 as const,
      style: 'normal' as const,
    },
    {
      name: 'Courier New',
      data: readFileSync(
        resolve(projectRoot, 'public/fonts/CourierPrime-Italic.ttf')
      ),
      weight: 400 as const,
      style: 'italic' as const,
    },
    {
      name: 'Courier New',
      data: readFileSync(
        resolve(projectRoot, 'public/fonts/CourierPrime-BoldItalic.ttf')
      ),
      weight: 700 as const,
      style: 'italic' as const,
    },
    {
      name: 'IBM Plex Mono',
      data: readFileSync(
        resolve(projectRoot, 'public/fonts/IBMPlexMono-Regular.ttf')
      ),
      weight: 400 as const,
      style: 'normal' as const,
    },
    {
      name: 'IBM Plex Mono',
      data: readFileSync(
        resolve(projectRoot, 'public/fonts/IBMPlexMono-Bold.ttf')
      ),
      weight: 700 as const,
      style: 'normal' as const,
    },
    {
      name: 'IBM Plex Mono',
      data: readFileSync(
        resolve(projectRoot, 'public/fonts/IBMPlexMono-Italic.ttf')
      ),
      weight: 400 as const,
      style: 'italic' as const,
    },
    {
      name: 'IBM Plex Mono',
      data: readFileSync(
        resolve(projectRoot, 'public/fonts/IBMPlexMono-BoldItalic.ttf')
      ),
      weight: 700 as const,
      style: 'italic' as const,
    },
    {
      name: 'Comic Sans MS',
      data: readFileSync(
        resolve(projectRoot, 'public/fonts/Comic Sans MS.ttf')
      ),
      weight: 400 as const,
      style: 'normal' as const,
    },
    {
      name: 'Comic Sans MS',
      data: readFileSync(
        resolve(projectRoot, 'public/fonts/Comic Sans MS Bold.ttf')
      ),
      weight: 700 as const,
      style: 'normal' as const,
    },
    {
      name: 'Hiragino Maru Gothic Pro',
      data: readFileSync(
        resolve(projectRoot, 'public/fonts/HanYiZhongYuanJian-1.ttf')
      ),
      weight: 400 as const,
      style: 'normal' as const,
    },
    {
      name: 'Hiragino Maru Gothic Pro',
      data: readFileSync(
        resolve(projectRoot, 'public/fonts/HanYiCuYuanJian-1.ttf')
      ),
      weight: 700 as const,
      style: 'normal' as const,
    },
  ] as const;
}
