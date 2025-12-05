/**
 * 深度合并对象
 * 用于合并用户提供的覆写配置与默认值
 */
export function deepMerge<T extends Record<string, any>>(
  target: T,
  source?: Partial<T>
): T {
  if (!source) return target;

  const result = { ...target };

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const sourceValue = source[key];
      const targetValue = result[key];

      // 如果都是对象，递归合并；否则直接覆盖
      if (
        sourceValue &&
        typeof sourceValue === 'object' &&
        !Array.isArray(sourceValue) &&
        targetValue &&
        typeof targetValue === 'object' &&
        !Array.isArray(targetValue)
      ) {
        result[key] = deepMerge(targetValue, sourceValue) as any;
      } else if (sourceValue !== undefined) {
        result[key] = sourceValue as any;
      }
    }
  }

  return result;
}
