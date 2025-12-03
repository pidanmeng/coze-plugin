import { Resend } from 'resend';
import type { ResendModel } from './model';

export abstract class ResendService {
  static resendClient: Resend | null = null;
  static getResendClient() {
    const emailHost = process.env.EMAIL_HOST;
    if (this.resendClient) {
      return {
        resend: this.resendClient,
        emailHost,
      };
    }
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      throw new Error('RESEND_API_KEY environment variable is not set');
    }

    if (!emailHost) {
      throw new Error('EMAIL_HOST environment variable is not set');
    }

    this.resendClient = new Resend(apiKey);

    return { resend: this.resendClient, emailHost };
  }
  static validateContent = (
    text: string | undefined,
    html: string | undefined
  ) => {
    if (!text && !html) {
      throw new Error('Either text or html content must be provided');
    }
  };
  static async sendEmailHelper(
    from: string,
    to: string | string[],
    subject: string,
    text: string | undefined,
    html: string | undefined
  ) {
    this.validateContent(text, html);
    const { resend, emailHost } = this.getResendClient();
    try {
      const toArray = Array.isArray(to) ? to : [to];
      console.info(
        `Sending email to ${toArray.length} recipient(s) with subject "${subject}"`
      );

      const result = await resend.emails.send({
        from: `${from} <no-reply@${emailHost}>`,
        to: toArray,
        subject,
        text,
        html,
        react: null,
      });

      console.info(`Email sent successfully with ID: ${result.data?.id}`);

      // 如果是单个收件人，返回简单结果；如果是多个收件人，返回详细结果
      return result;
    } catch (error) {
      console.error(
        `Failed to send email to ${Array.isArray(to) ? to.join(', ') : to}: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
      throw error;
    }
  }

  static async sendEmail(args: ResendModel.SendEmailParams) {
    const { to, subject, text, html, from } = args;

    const result = await this.sendEmailHelper(from, to, subject, text, html);
    return result;
  }

  static async sendEmailBatch(args: ResendModel.SendEmailBatchParams) {
    const { to, subject, text, html, from } = args;

    console.info(`Sending batch emails to ${to.length} recipients`);
    // 使用 Resend 的原生批量发送功能
    const result = await this.sendEmailHelper(from, to, subject, text, html);

    return result;
  }
}
