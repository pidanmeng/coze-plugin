type AnyObj = Record<string, any>;

export abstract class StockService {
  private static readonly TUSHARE_API_URL = 'https://api.tushare.pro';

  // --- 格式化函数 ---
  // daily
  private static formatDailyResult(data: any): string {
    if (!data || !data.items || data.items.length === 0) {
      return '未找到符合条件的股票行情数据。';
    }
    const items = data.items;
    const groupedData: Record<string, any[]> = {};
    items.forEach((item: any) => {
      const tsCode = item[0];
      if (!groupedData[tsCode]) groupedData[tsCode] = [];
      groupedData[tsCode].push(item);
    });
    let result = `共找到${items.length}条股票行情数据：\n\n`;
    Object.keys(groupedData).forEach((tsCode) => {
      result += `${tsCode} 行情数据:\n`;
      groupedData[tsCode].forEach((item, index) => {
        const [_, tradeDate, open, high, low, close, preClose, change, pctChg, vol, amount] = item;
        result += `  ${index + 1}. 交易日期: ${tradeDate}\n`;
        result += `     开盘价: ${open}, 最高价: ${high}, 最低价: ${low}, 收盘价: ${close}\n`;
        result += `     昨收价: ${preClose}, 涨跌额: ${change}, 涨跌幅: ${pctChg}%\n`;
        result += `     成交量: ${vol}手, 成交额: ${amount}千元\n`;
      });
      result += '\n';
    });
    return result;
  }

  // monthly
  private static formatMonthlyResult(data: any): string {
    if (!data || !data.items || data.items.length === 0) {
      return '未找到符合条件的股票月行情数据。';
    }
    const items = data.items;
    const groupedData: Record<string, any[]> = {};
    items.forEach((item: any) => {
      const tsCode = item[0];
      if (!groupedData[tsCode]) groupedData[tsCode] = [];
      groupedData[tsCode].push(item);
    });
    let result = `共找到${items.length}条股票月行情数据：\n\n`;
    Object.keys(groupedData).forEach((tsCode) => {
      result += `${tsCode} 月行情数据:\n`;
      groupedData[tsCode].forEach((item, index) => {
        const [_, tradeDate, close, open, high, low, preClose, change, pctChg, vol, amount] = item;
        result += `  ${index + 1}. 交易日期: ${tradeDate}\n`;
        result += `     开盘价: ${open}, 最高价: ${high}, 最低价: ${low}, 收盘价: ${close}\n`;
        result += `     上月收盘价: ${preClose}, 涨跌额: ${change}, 涨跌幅: ${pctChg}%\n`;
        result += `     成交量: ${vol}, 成交额: ${amount}\n`;
      });
      result += '\n';
    });
    return result;
  }

  // weekly
  private static formatWeeklyResult(data: any): string {
    if (!data || !data.items || data.items.length === 0) {
      return '未找到符合条件的股票周行情数据。';
    }
    const items = data.items;
    const groupedData: Record<string, any[]> = {};
    items.forEach((item: any) => {
      const tsCode = item[0];
      if (!groupedData[tsCode]) groupedData[tsCode] = [];
      groupedData[tsCode].push(item);
    });
    let result = `共找到${items.length}条股票周行情数据：\n\n`;
    Object.keys(groupedData).forEach((tsCode) => {
      result += `${tsCode} 周行情数据:\n`;
      groupedData[tsCode].forEach((item, index) => {
        const [_, tradeDate, close, open, high, low, preClose, change, pctChg, vol, amount] = item;
        result += `  ${index + 1}. 交易日期: ${tradeDate}\n`;
        result += `     开盘价: ${open}, 最高价: ${high}, 最低价: ${low}, 收盘价: ${close}\n`;
        result += `     上周收盘价: ${preClose}, 涨跌额: ${change}, 涨跌幅: ${pctChg}%\n`;
        result += `     成交量: ${vol}, 成交额: ${amount}\n`;
      });
      result += '\n';
    });
    return result;
  }

  // rt_k
  private static formatRtKResult(data: any): string {
    if (!data || !data.items || data.items.length === 0) {
      return '未找到符合条件的实时行情数据。';
    }
    const items = data.items;
    let result = `共找到${items.length}条实时行情数据：\n\n`;
    items.forEach((item: any, index: number) => {
      const [tsCode, name, preClose, high, open, low, close, vol, amount, num] = item;
      result += `${index + 1}. ${name} (${tsCode})\n`;
      result += `   昨收价: ${preClose}\n`;
      result += `   开盘价: ${open}\n`;
      result += `   最高价: ${high}\n`;
      result += `   最低价: ${low}\n`;
      result += `   最新价: ${close}\n`;
      result += `   成交量: ${vol}股\n`;
      result += `   成交金额: ${amount}元\n`;
      result += `   成交笔数: ${num}\n\n`;
    });
    return result;
  }

  // stock_company
  private static formatStockCompanyResult(data: any): string {
    if (!data || !data.items || data.items.length === 0) {
      return '未找到符合条件的上市公司信息。';
    }
    const items = data.items;
    let result = `共找到${items.length}家上市公司信息：\n\n`;
    items.forEach((item: any, index: number) => {
      const [tsCode, comName, comId, chairman, manager, secretary, regCapital, setupDate, province, city, introduction, website, email, office, businessScope, employees, mainBusiness, exchange] = item;
      result += `${index + 1}. ${comName} (${tsCode})\n`;
      result += `   统一社会信用代码: ${comId}\n`;
      result += `   交易所: ${exchange}\n`;
      result += `   法人代表: ${chairman}\n`;
      result += `   总经理: ${manager}\n`;
      result += `   董秘: ${secretary}\n`;
      result += `   注册资本: ${regCapital}万元\n`;
      result += `   注册日期: ${setupDate}\n`;
      result += `   所在省市: ${province}${city}\n`;
      result += `   公司主页: ${website}\n`;
      result += `   电子邮件: ${email}\n`;
      result += `   办公地址: ${office}\n`;
      result += `   员工人数: ${employees}人\n`;
      result += `   公司简介: ${introduction}\n`;
      result += `   经营范围: ${businessScope}\n`;
      result += `   主要业务: ${mainBusiness}\n\n`;
    });
    return result;
  }

  // ipo_new_share
  private static formatIpoResult(data: any): string {
    if (!data || !data.items || data.items.length === 0) {
      return '未找到符合条件的新股IPO信息。';
    }
    const items = data.items;
    let result = `共找到${items.length}条新股IPO信息：\n\n`;
    items.forEach((item: any, index: number) => {
      const [tsCode, subCode, name, ipoDate, issueDate, amount, marketAmount, price, pe, limitAmount, funds, ballot] = item;
      result += `${index + 1}. ${name} (${tsCode})\n`;
      result += `   申购代码: ${subCode}\n`;
      result += `   上网发行日期: ${ipoDate}\n`;
      result += `   上市日期: ${issueDate}\n`;
      result += `   发行总量: ${amount}万股\n`;
      result += `   上网发行量: ${marketAmount}万股\n`;
      result += `   发行价格: ${price}元\n`;
      result += `   市盈率: ${pe}\n`;
      result += `   个人申购上限: ${limitAmount}万股\n`;
      result += `   募集资金: ${funds}亿元\n`;
      result += `   中签率: ${ballot}%\n\n`;
    });
    return result;
  }

  private static async request<T extends Record<string, any>, R>(
    apiName: string,
    params: T
  ): Promise<R> {
    const token = process.env.TUSHARE_TOKEN;
    if (!token) {
      throw new Error('TUSHARE_TOKEN 环境变量未设置');
    }

    const requestBody = {
      api_name: apiName,
      token,
      params,
      fields: '',
    } as const;

    console.info(`调用 Tushare API: ${apiName}`, params);

    const res = await fetch(StockService.TUSHARE_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const json = await res.json();
    if (json.code !== 0) {
      throw new Error(`Tushare API 错误: ${json.msg}`);
    }

    console.info(`成功调用 Tushare API: ${apiName}`);
    return json.data as R;
  }

  // --- Daily ---
  static async daily(args: AnyObj) {
    const { ts_code, start_date, end_date } = args ?? {};
    try {
      console.info('调用 daily', { ts_code, start_date, end_date });
      const params: AnyObj = {};
      if (ts_code) params.ts_code = ts_code;
      if (start_date) params.start_date = start_date;
      if (end_date) params.end_date = end_date;

      const result = await StockService.request<
        { ts_code?: string; start_date?: string; end_date?: string },
        any
      >('daily', params);
      return StockService.formatDailyResult(result);
    } catch (error) {
      console.error('daily 调用失败', error);
      return `获取股票每日行情数据失败: ${error}`;
    }
  }

  // --- Monthly ---
  static async monthly(args: AnyObj) {
    const { ts_code, start_date, end_date } = args ?? {};
    try {
      console.info('调用 monthly', { ts_code, start_date, end_date });
      const params: AnyObj = {};
      if (ts_code) params.ts_code = ts_code;
      if (start_date) params.start_date = start_date;
      if (end_date) params.end_date = end_date;

      const result = await StockService.request<
        { ts_code?: string; start_date?: string; end_date?: string },
        any
      >('monthly', params);
      return StockService.formatMonthlyResult(result);
    } catch (error) {
      console.error('monthly 调用失败', error);
      return `获取股票每月行情数据失败: ${error}`;
    }
  }

  // --- Weekly ---
  static async weekly(args: AnyObj) {
    const { ts_code, start_date, end_date } = args ?? {};
    try {
      console.info('调用 weekly', { ts_code, start_date, end_date });
      const params: AnyObj = {};
      if (ts_code) params.ts_code = ts_code;
      if (start_date) params.start_date = start_date;
      if (end_date) params.end_date = end_date;

      const result = await StockService.request<
        { ts_code?: string; start_date?: string; end_date?: string },
        any
      >('weekly', params);
      return StockService.formatWeeklyResult(result);
    } catch (error) {
      console.error('weekly 调用失败', error);
      return `获取股票每周行情数据失败: ${error}`;
    }
  }

  // --- RtK ---
  static async rt_k(args: AnyObj) {
    const { ts_code } = args ?? {};
    try {
      console.info('调用 rt_k', { ts_code });
      const params = { ts_code };
      const result = await StockService.request<{ ts_code: string }, any>(
        'rt_k',
        params
      );
      return StockService.formatRtKResult(result);
    } catch (error) {
      console.error('rt_k 调用失败', error);
      return `获取实时日K线行情失败: ${error}`;
    }
  }

  // --- Stock Company ---
  static async stock_company(args: AnyObj) {
    const { ts_code } = args ?? {};
    try {
      console.info('调用 stock_company', { ts_code });
      const params: AnyObj = {};
      if (ts_code) params.ts_code = ts_code;
      const result = await StockService.request<{ ts_code?: string }, any>(
        'stock_company',
        params
      );
      return StockService.formatStockCompanyResult(result);
    } catch (error) {
      console.error('stock_company 调用失败', error);
      return `获取上市公司基本信息失败: ${error}`;
    }
  }

  // --- IPO New Share ---
  static async ipo_new_share(args: AnyObj) {
    const { start_date, end_date } = args ?? {};
    try {
      console.info('调用 new_share', { start_date, end_date });
      const params: AnyObj = {};
      if (start_date) params.start_date = start_date;
      if (end_date) params.end_date = end_date;
      const result = await StockService.request<
        { start_date?: string; end_date?: string },
        any
      >('new_share', params);
      return StockService.formatIpoResult(result);
    } catch (error) {
      console.error('new_share 调用失败', error);
      return `获取新股IPO信息失败: ${error}`;
    }
  }
}

export default StockService;
