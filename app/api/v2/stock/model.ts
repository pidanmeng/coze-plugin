import { z } from 'zod';

export const TOOL_NAME = 'stock';

export namespace StockModel {
  export const dailyParams = z.object({
    ts_code: z
      .string()
      .optional()
      .describe('股票代码，逗号分隔'),
    start_date: z
      .string()
      .optional()
      .describe('开始日期(YYYYMMDD)'),
    end_date: z
      .string()
      .optional()
      .describe('结束日期(YYYYMMDD)'),
  });

  export const monthlyParams = dailyParams;
  export const weeklyParams = dailyParams;

  export const rtKParams = z.object({
    ts_code: z
      .string()
      .describe('股票代码，支持通配符方式，e.g. 6.SH、301.SZ、600000.SH'),
  });

  export const stockCompanyParams = z.object({
    ts_code: z
      .string()
      .optional()
      .describe('股票代码，逗号分隔'),
  });

  export const ipoNewShareParams = z.object({
    start_date: z
      .string()
      .optional()
      .describe('上网发行开始日期(YYYYMMDD)'),
    end_date: z
      .string()
      .optional()
      .describe('上网发行结束日期(YYYYMMDD)'),
  });
}

export default StockModel;
