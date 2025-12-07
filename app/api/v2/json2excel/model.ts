import z from 'zod';

export const TOOL_NAME = 'json2excel';

// 定义更具体的JSON数据类型，避免使用any
export const jsonDataItem = z.record(
  z.string(),
  z.union([z.string(), z.number(), z.boolean(), z.null()])
);

export namespace Json2ExcelModel {
  export const jsonToExcelMCPParams = z
    .object({
      data: z
        .array(jsonDataItem)
        .describe('要转换为Excel的数据，数组形式')
        .default([
          {
            姓名: '张三',
            年龄: 25,
            邮箱: 'zhangsan@example.com',
            是否会员: true,
          },
          { 姓名: '李四', 年龄: 30, 邮箱: 'lisi@example.com', 是否会员: false },
          {
            姓名: '王五',
            年龄: 28,
            邮箱: 'wangwu@example.com',
            是否会员: true,
          },
        ]),
      fileName: z
        .string()
        .optional()
        .describe('文件名（不含扩展名）')
        .default('data'),
      sheetName: z.string().optional().describe('工作表名称').default('Sheet1'),
    })
    .describe('JSON转Excel参数');

  export type JsonToExcelParams = z.infer<typeof jsonToExcelMCPParams>;

  // 默认示例数据
  export const DEFAULT_EXAMPLE_DATA: JsonToExcelParams = {
    data: [
      { 姓名: '张三', 年龄: 25, 邮箱: 'zhangsan@example.com', 是否会员: true },
      { 姓名: '李四', 年龄: 30, 邮箱: 'lisi@example.com', 是否会员: false },
      { 姓名: '王五', 年龄: 28, 邮箱: 'wangwu@example.com', 是否会员: true },
    ],
    fileName: '用户数据',
    sheetName: '用户信息表',
  };
}
