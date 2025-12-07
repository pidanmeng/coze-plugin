import { utils, write, read as xlsxRead } from 'xlsx';
import { uploadFile } from '../../../tools/utils/upload';
import type { Json2ExcelModel } from './model';

export abstract class Json2ExcelService {
  static async convertJsonToExcel(args: Json2ExcelModel.JsonToExcelParams) {
    try {
      const { data, sheetName } = args;

      // 创建工作簿
      const workbook = utils.book_new();

      // 将JSON数据转换为工作表
      const worksheet = utils.json_to_sheet(data);

      // 将工作表添加到工作簿
      utils.book_append_sheet(workbook, worksheet, sheetName);

      const uuid = crypto.randomUUID();

      // 生成唯一的文件名
      const uniqueFileName = `${uuid}.xlsx`;

      // 写入Excel文件到buffer
      const workbookBuffer = write(workbook, {
        bookType: 'xlsx',
        type: 'buffer',
      });

      // 创建File对象
      const file = new File([workbookBuffer], uniqueFileName, {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      // 上传文件
      const result = await uploadFile(file);

      return result;
    } catch (error) {
      return {
        success: false,
        message: (error as Error).message,
      };
    }
  }

  static async convertExcelToJson(args: Json2ExcelModel.ExcelToJsonParams) {
    try {
      const { fileUrl, sheetName } = args;

      // 下载Excel文件
      const response = await fetch(fileUrl);
      if (!response.ok) {
        throw new Error(`下载文件失败: ${response.statusText}`);
      }

      const arrayBuffer = await response.arrayBuffer();

      // 解析Excel文件
      const workbook = xlsxRead(arrayBuffer, { type: 'array' });

      // 获取工作表名称
      const targetSheetName = sheetName || workbook.SheetNames[0];

      // 检查工作表是否存在
      if (!workbook.SheetNames.includes(targetSheetName)) {
        throw new Error(`工作表 "${targetSheetName}" 不存在`);
      }

      // 将工作表转换为JSON
      const worksheet = workbook.Sheets[targetSheetName];
      const jsonData = utils.sheet_to_json(worksheet, { defval: null });

      return {
        success: true,
        data: jsonData,
        sheetName: targetSheetName,
        message: '转换成功',
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        message: (error as Error).message,
      };
    }
  }
}
