import z from 'zod';

export const TOOL_NAME = 'resend';

export namespace ResendModel {
  export const sendEmailMCPParams = z.object({
    from: z
      .string()
      .describe('发件人邮箱名称，例如："John Doe" 或 "No Reply"')
      .default('John Doe"'),
    to: z.email().describe('收件人邮箱地址').default('1092333914@qq.com'),
    subject: z.string().describe('邮件主题').default('[Resend] 测试邮件'),
    text: z.string().optional().describe('邮件的纯文本内容'),
    html: z
      .string()
      .optional()
      .describe('邮件的HTML内容')
      .default('<h1>Hello World!</h1>'),
  });

  export type SendEmailParams = z.infer<typeof sendEmailMCPParams>;

  export const sendEmailBatchMCPParams = z.object({
    from: z
      .string()
      .describe('发件人邮箱名称，例如："John Doe" 或 "No Reply"')
      .default('John Doe"'),
    to: z
      .array(z.email())
      .min(1)
      .max(100)
      .describe('收件人邮箱地址（1-100个收件人）')
      .default(['1092333914@qq.com']),
    subject: z.string().describe('邮件主题').default('[Resend] 测试邮件'),
    text: z.string().optional().describe('邮件的纯文本内容'),
    html: z
      .string()
      .optional()
      .describe('邮件的HTML内容')
      .default('<h1>Hello World!</h1>'),
  });

  export type SendEmailBatchParams = z.infer<typeof sendEmailBatchMCPParams>;
}
