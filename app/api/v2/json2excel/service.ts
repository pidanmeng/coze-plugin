import { utils, write } from 'xlsx';
import { uploadFile } from '../../../tools/utils/upload';
import type { Json2ExcelModel } from './model';

export abstract class Json2ExcelService {
  static async convertJsonToExcel(args: Json2ExcelModel.JsonToExcelParams) {
    try {
      const { data, fileName, sheetName } = args;

      // 创建工作簿
      const workbook = utils.book_new();

      // 将JSON数据转换为工作表
      const worksheet = utils.json_to_sheet(data);

      // 将工作表添加到工作簿
      utils.book_append_sheet(workbook, worksheet, sheetName);

      // 生成唯一的文件名
      const uniqueFileName = `${fileName}_${Date.now()}.xlsx`;

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
}
