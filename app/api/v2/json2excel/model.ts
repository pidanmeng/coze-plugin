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
        .describe('要转换为Excel的数据，数组形式，每个元素都是一个对象，对象中的键值对表示一个字段和字段的值'),
      sheetName: z.string().optional().describe('工作表名称').default('Sheet1'),
    })
    .describe('JSON转Excel参数');

  export const excelToJsonMCPParams = z
    .object({
      fileUrl: z.url().describe('Excel文件的URL链接'),
      sheetName: z
        .string()
        .optional()
        .describe('要读取的工作表名称，如果不提供则默认读取第一个工作表'),
    })
    .describe('Excel转JSON参数');

  export type JsonToExcelParams = z.infer<typeof jsonToExcelMCPParams>;
  export type ExcelToJsonParams = z.infer<typeof excelToJsonMCPParams>;
}
