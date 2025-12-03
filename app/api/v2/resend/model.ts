import z from 'zod';

export const TOOL_NAME = 'resend';

export namespace ResendModel {
  export const sendEmailMCPParams = z.object({
    from: z
      .string()
      .describe('发件人邮箱名称，例如："John Doe" 或 "No Reply"')
      .default('No Reply"'),
    to: z.email().describe('收件人邮箱地址'),
    subject: z.string().describe('邮件主题'),
    text: z.string().optional().describe('邮件的纯文本内容'),
    html: z.string().optional().describe('邮件的HTML内容'),
  });

  export type SendEmailParams = z.infer<typeof sendEmailMCPParams>;

  export const sendEmailBatchMCPParams = z.object({
    from: z
      .string()
      .describe('发件人邮箱名称，例如："John Doe" 或 "No Reply"')
      .default('No Reply"'),
    to: z
      .array(z.email())
      .min(1)
      .max(100)
      .describe('收件人邮箱地址（1-100个收件人）'),
    subject: z.string().describe('邮件主题'),
    text: z.string().optional().describe('邮件的纯文本内容'),
    html: z.string().optional().describe('邮件的HTML内容'),
  });

  export type SendEmailBatchParams = z.infer<typeof sendEmailBatchMCPParams>;
}
