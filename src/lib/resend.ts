import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is not set");
}

export const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * 获取发件人邮箱地址
 */
function getFromEmail(): string {
  // 优先使用 SMTP_USER（如果它已经是一个完整的邮箱地址）
  if (process.env.SMTP_USER?.includes("@")) {
    const email = process.env.SMTP_USER;
    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      return email;
    }
    throw new Error(
      `Invalid SMTP_USER format: ${email}. It should be a valid email address like "user@example.com"`,
    );
  }

  // 如果 SMTP_USER 和 SMTP_HOST 都存在，组合成邮箱地址
  // 注意：原来的逻辑是 SMTP_HOST@SMTP_USER（不是 SMTP_USER@SMTP_HOST）
  if (process.env.SMTP_USER && process.env.SMTP_HOST) {
    const host = process.env.SMTP_HOST; // 这是用户名部分
    const user = process.env.SMTP_USER; // 这是域名部分

    // 如果 SMTP_HOST 已经包含 @，说明配置可能有问题
    if (host.includes("@")) {
      throw new Error(
        `Invalid SMTP_HOST format: ${host}. SMTP_HOST should be a username (e.g., "NeonBit"), not an email address.`,
      );
    }

    // 如果 SMTP_USER 已经包含 @，说明它可能是完整邮箱，直接使用
    if (user.includes("@")) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(user)) {
        return user;
      }
    }

    // 原来的组合方式：host@user (例如: NeonBit@support.meshivo.com)
    const email = `${host}@${user}`;

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error(
        `Invalid email format: ${email}. Please check SMTP_USER and SMTP_HOST environment variables.`,
      );
    }

    return email;
  }

  // 如果没有配置，抛出错误而不是使用未验证的默认值
  throw new Error(
    "SMTP_USER or SMTP_HOST environment variables are not configured. " +
      "Please set SMTP_USER (either a full email like 'user@example.com' or just the username) " +
      "and SMTP_HOST (the domain like 'example.com') in your environment variables.",
  );
}

/**
 * 通用邮件发送函数
 */
async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string | string[];
  subject: string;
  html: string;
}) {
  const fromEmail = getFromEmail();
  const recipients = Array.isArray(to) ? to : [to];

  // 验证 from 邮箱格式
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(fromEmail)) {
    throw new Error(
      `Invalid from email format: ${fromEmail}. Please check SMTP_USER and SMTP_HOST environment variables.`,
    );
  }

  const fromField = `SnapVee <${fromEmail}>`;

  const result = await resend.emails.send({
    from: fromField,
    to: recipients,
    subject,
    html,
    headers: {
      "X-Mailer": "SnapVee",
    },
  });

  if (result.error) {
    console.error("[Resend] Email send error:", result.error);
    throw result.error;
  }

  return { success: true, data: result.data };
}

// ==================== 邮件模板 ====================

/**
 * 验证码邮件模板
 */
function getVerificationCodeEmailTemplate(
  code: string,
  locale: string = "en",
): { subject: string; html: string } {
  const isZh = locale === "zh";
  const subject = isZh
    ? "SnapVee 邮箱验证码"
    : "SnapVee Email Verification Code";

  const html = isZh
    ? `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #824ac8 0%, #6639a3 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">SnapVee</h1>
        </div>
        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #333; margin-top: 0;">邮箱验证码</h2>
          <p>您的验证码是：</p>
          <div style="background: white; border: 2px solid #824ac8; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
            <span style="font-size: 32px; font-weight: bold; color: #824ac8; letter-spacing: 5px;">${code}</span>
          </div>
          <p style="color: #666; font-size: 14px;">此验证码有效期为 5 分钟，请勿泄露给他人。</p>
          <p style="color: #666; font-size: 14px;">如果您没有请求此验证码，请忽略此邮件。</p>
        </div>
      </body>
    </html>
  `
    : `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #824ac8 0%, #6639a3 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">SnapVee</h1>
        </div>
        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #333; margin-top: 0;">Email Verification Code</h2>
          <p>Your verification code is:</p>
          <div style="background: white; border: 2px solid #824ac8; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
            <span style="font-size: 32px; font-weight: bold; color: #824ac8; letter-spacing: 5px;">${code}</span>
          </div>
          <p style="color: #666; font-size: 14px;">This code is valid for 5 minutes. Please do not share it with others.</p>
          <p style="color: #666; font-size: 14px;">If you did not request this code, please ignore this email.</p>
        </div>
      </body>
    </html>
  `;

  return { subject, html };
}

// ==================== 邮件发送函数 ====================

/**
 * 发送验证码邮件
 */
export async function sendVerificationCodeEmail(
  email: string,
  code: string,
  locale: string = "en",
) {
  try {
    const template = getVerificationCodeEmailTemplate(code, locale);
    const result = await sendEmail({
      to: email,
      subject: template.subject,
      html: template.html,
    });

    return result;
  } catch (error: any) {
    console.error("[Resend] Error sending verification code email:", error);
    throw error;
  }
}

/**
 * 修改密码验证码邮件模板
 */
function getPasswordChangeCodeEmailTemplate(
  code: string,
  locale: string = "en",
): { subject: string; html: string } {
  const isZh = locale === "zh";
  const subject = isZh
    ? "SnapVee 修改密码验证码"
    : "SnapVee Password Change Verification Code";
  const title = isZh ? "修改密码验证码" : "Password Change Verification Code";
  const bodyIntro = isZh ? "您的验证码是：" : "Your verification code is:";
  const bodyNote = isZh
    ? "此验证码有效期为 5 分钟，请勿泄露给他人。"
    : "This code is valid for 5 minutes. Please do not share it with others.";
  const bodyIgnore = isZh
    ? "如果您没有请求此验证码，请忽略此邮件。"
    : "If you did not request this code, please ignore this email.";
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #824ac8 0%, #6639a3 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">SnapVee</h1>
        </div>
        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #333; margin-top: 0;">${title}</h2>
          <p>${bodyIntro}</p>
          <div style="background: white; border: 2px solid #824ac8; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
            <span style="font-size: 32px; font-weight: bold; color: #824ac8; letter-spacing: 5px;">${code}</span>
          </div>
          <p style="color: #666; font-size: 14px;">${bodyNote}</p>
          <p style="color: #666; font-size: 14px;">${bodyIgnore}</p>
        </div>
      </body>
    </html>
  `;
  return { subject, html };
}

/**
 * 发送修改密码验证码邮件
 */
export async function sendPasswordChangeCodeEmail(
  email: string,
  code: string,
  locale: string = "en",
) {
  try {
    const template = getPasswordChangeCodeEmailTemplate(code, locale);
    const result = await sendEmail({
      to: email,
      subject: template.subject,
      html: template.html,
    });
    return result;
  } catch (error: any) {
    console.error("[Resend] Error sending password change code email:", error);
    throw error;
  }
}

/**
 * 欢迎邮件模板
 */
function getWelcomeEmailTemplate(
  username: string = "there",
  locale: string = "en",
): { subject: string; html: string } {
  const isZh = locale === "zh";

  const subject = isZh ? "欢迎加入 SnapVee！👋" : "Welcome to SnapVee! 👋";

  const html = isZh
    ? `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #ffffff; padding: 40px 20px; margin: 0;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0;">
          <h1 style="color: #1a1a1a; font-size: 24px; font-weight: bold; margin-bottom: 20px; text-align: center;">
            欢迎加入 SnapVee！👋
          </h1>
          <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
            你好 ${username}，
          </p>
          <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
            感谢您加入 SnapVee！我们很高兴您的加入。
          </p>
          <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
            SnapVee 旨在帮助您轻松快速地下载来自您喜爱的社交媒体平台的视频。
          </p>
          <div style="border-top: 1px solid #e0e0e0; margin: 30px 0;"></div>
          <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
            如果您有任何问题、反馈或只是想打个招呼，请随时直接回复此邮件。我们很乐意听到您的声音！
          </p>
          <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin-top: 30px;">
            此致敬礼，<br />
            SnapVee 团队
          </p>
        </div>
      </body>
    </html>
  `
    : `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #ffffff; padding: 40px 20px; margin: 0;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0;">
          <h1 style="color: #1a1a1a; font-size: 24px; font-weight: bold; margin-bottom: 20px; text-align: center;">
            Welcome to SnapVee! 👋
          </h1>
          <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
            Hi ${username},
          </p>
          <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
            Thanks for joining SnapVee! We're excited to have you on board.
          </p>
          <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
            SnapVee is designed to help you download videos from your favorite social media platforms easily and quickly.
          </p>
          <div style="border-top: 1px solid #e0e0e0; margin: 30px 0;"></div>
          <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
            If you have any questions, feedback, or just want to say hi, please feel free to reply to this email directly. I'd love to hear from you!
          </p>
          <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin-top: 30px;">
            Best regards,<br />
            The SnapVee Team
          </p>
        </div>
      </body>
    </html>
  `;

  return { subject, html };
}

/**
 * 发送欢迎邮件
 */
export async function sendWelcomeEmail(
  email: string,
  username: string = "there",
  locale: string = "en",
) {
  try {
    const template = getWelcomeEmailTemplate(username, locale);
    const result = await sendEmail({
      to: email,
      subject: template.subject,
      html: template.html,
    });

    return result;
  } catch (error: any) {
    console.error("[Resend] Error sending welcome email:", error);
    throw error;
  }
}

// ==================== 支付收据邮件 ====================

/**
 * 支付收据邮件参数
 * receiptUrl 可选：Stripe 有在线收据链接，支付宝无则留空，邮件即凭证
 */
export interface PaymentReceiptParams {
  customerName: string;
  planName: string;
  amount: string;
  currency: string;
  paymentDate: string;
  receiptUrl?: string;
}

/**
 * 支付收据邮件模板
 */
function getPaymentReceiptEmailTemplate(
  params: PaymentReceiptParams,
  locale: string = "en",
): { subject: string; html: string } {
  const { customerName, planName, amount, currency, paymentDate, receiptUrl } =
    params;
  const hasReceiptUrl = !!receiptUrl;
  const isZh = locale === "zh";

  const subject = isZh ? "SnapVee 支付收据" : "Your SnapVee Payment Receipt";

  const html = isZh
    ? `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #ffffff; padding: 40px 20px; margin: 0;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0;">
          <div style="background: linear-gradient(135deg, #824ac8 0%, #6639a3 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0; margin: -20px -20px 20px -20px;">
            <h1 style="color: white; margin: 0; font-size: 28px;">SnapVee</h1>
          </div>
          
          <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
            你好，${customerName}，
          </p>
          
          <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
            感谢你购买 SnapVee！🎉 我们已成功收到你的付款。
          </p>
          
          <div style="background: #f9f9f9; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
            <h3 style="color: #333; margin: 0 0 16px 0; font-size: 16px; font-weight: bold;">订单信息</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="color: #666; padding: 8px 0; border-bottom: 1px solid #e0e0e0;">产品</td>
                <td style="color: #333; padding: 8px 0; border-bottom: 1px solid #e0e0e0; text-align: right; font-weight: 500;">${planName}</td>
              </tr>
              <tr>
                <td style="color: #666; padding: 8px 0; border-bottom: 1px solid #e0e0e0;">金额</td>
                <td style="color: #333; padding: 8px 0; border-bottom: 1px solid #e0e0e0; text-align: right; font-weight: 500;">${amount} ${currency}</td>
              </tr>
              <tr>
                <td style="color: #666; padding: 8px 0;">支付时间</td>
                <td style="color: #333; padding: 8px 0; text-align: right; font-weight: 500;">${paymentDate}</td>
              </tr>
            </table>
          </div>
          
          ${
            hasReceiptUrl
              ? `<p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
            你可以通过以下链接查看或下载 Stripe 提供的付款收据：
          </p>
          
          <div style="text-align: center; margin: 24px 0;">
            <a href="${receiptUrl}" style="display: inline-block; background: linear-gradient(135deg, #824ac8 0%, #6639a3 100%); color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: bold; font-size: 16px;">
              👉 查看收据
            </a>
          </div>`
              : `<p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
            本邮件即为您的支付凭证，请妥善保存。
          </p>`
          }
          
          <div style="border-top: 1px solid #e0e0e0; margin: 30px 0;"></div>
          
          <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
            如有任何问题，欢迎随时回复本邮件。
          </p>
          
          <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin-top: 30px;">
            SnapVee
          </p>
          
          <p style="color: #999; font-size: 12px; line-height: 1.6; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
            ${hasReceiptUrl ? "说明：当前我们提供的是 Stripe 官方收据，暂不支持中国增值税发票。" : "说明：支付宝支付无在线收据链接，本邮件即为您的支付凭证。"}
          </p>
        </div>
      </body>
    </html>
  `
    : `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #ffffff; padding: 40px 20px; margin: 0;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0;">
          <div style="background: linear-gradient(135deg, #824ac8 0%, #6639a3 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0; margin: -20px -20px 20px -20px;">
            <h1 style="color: white; margin: 0; font-size: 28px;">SnapVee</h1>
          </div>
          
          <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
            Hi ${customerName},
          </p>
          
          <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
            Thanks for your purchase! 🎉 We've successfully received your payment for SnapVee.
          </p>
          
          <div style="background: #f9f9f9; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
            <h3 style="color: #333; margin: 0 0 16px 0; font-size: 16px; font-weight: bold;">Order Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="color: #666; padding: 8px 0; border-bottom: 1px solid #e0e0e0;">Product</td>
                <td style="color: #333; padding: 8px 0; border-bottom: 1px solid #e0e0e0; text-align: right; font-weight: 500;">${planName}</td>
              </tr>
              <tr>
                <td style="color: #666; padding: 8px 0; border-bottom: 1px solid #e0e0e0;">Amount</td>
                <td style="color: #333; padding: 8px 0; border-bottom: 1px solid #e0e0e0; text-align: right; font-weight: 500;">${amount} ${currency}</td>
              </tr>
              <tr>
                <td style="color: #666; padding: 8px 0;">Date</td>
                <td style="color: #333; padding: 8px 0; text-align: right; font-weight: 500;">${paymentDate}</td>
              </tr>
            </table>
          </div>
          
          ${
            hasReceiptUrl
              ? `<p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
            You can view or download your receipt using the link below:
          </p>
          
          <div style="text-align: center; margin: 24px 0;">
            <a href="${receiptUrl}" style="display: inline-block; background: linear-gradient(135deg, #824ac8 0%, #6639a3 100%); color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: bold; font-size: 16px;">
              👉 View Receipt
            </a>
          </div>`
              : `<p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
            This email serves as your payment receipt. Please keep it for your records.
          </p>`
          }
          
          <div style="border-top: 1px solid #e0e0e0; margin: 30px 0;"></div>
          
          <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
            If you have any questions, feel free to reply to this email.
          </p>
          
          <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin-top: 30px;">
            Best,<br />
            SnapVee
          </p>
          
          <p style="color: #999; font-size: 12px; line-height: 1.6; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
            ${hasReceiptUrl ? "Note: We provide standard Stripe receipts. Chinese VAT invoices are not available at this time." : "Note: Alipay payments do not have an online receipt link; this email is your payment record."}
          </p>
        </div>
      </body>
    </html>
  `;

  return { subject, html };
}

/**
 * 发送支付收据邮件
 */
export async function sendPaymentReceiptEmail(
  email: string,
  params: PaymentReceiptParams,
  locale: string = "en",
) {
  try {
    const template = getPaymentReceiptEmailTemplate(params, locale);
    const result = await sendEmail({
      to: email,
      subject: template.subject,
      html: template.html,
    });

    console.log(`[Resend] Payment receipt email sent to ${email}`);
    return result;
  } catch (error: any) {
    console.error("[Resend] Error sending payment receipt email:", error);
    throw error;
  }
}

// ==================== 续费提醒邮件 ====================

interface RenewalReminderParams {
  customerName: string;
  planName: string;
  expiresAt: string;
}

function getRenewalReminderEmailTemplate(
  params: RenewalReminderParams,
  locale: string = "en",
): { subject: string; html: string } {
  const isZh = locale === "zh";
  const subject = isZh
    ? "SnapVee 订阅即将到期提醒"
    : "SnapVee Subscription Renewal Reminder";

  const html = isZh
    ? `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #824ac8 0%, #6639a3 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">SnapVee</h1>
        </div>
        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #333; margin-top: 0;">订阅即将到期</h2>
          <p>您好 ${params.customerName}，</p>
          <p>您的 <strong>${params.planName}</strong> 将在 <strong>${params.expiresAt}</strong> 到期。</p>
          <p>为避免服务中断，请在到期前完成续费。若未续费，账号将自动降级为免费版。</p>
          <div style="text-align: center; margin: 24px 0;">
            <a href="https://snapvee.com/pricing" style="display: inline-block; background: linear-gradient(135deg, #824ac8 0%, #6639a3 100%); color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: bold; font-size: 16px;">
              立即续费
            </a>
          </div>
          <p style="color: #4a4a4a; font-size: 14px;">如有疑问，可直接回复此邮件。</p>
        </div>
      </body>
    </html>
  `
    : `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #824ac8 0%, #6639a3 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">SnapVee</h1>
        </div>
        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #333; margin-top: 0;">Your subscription is expiring soon</h2>
          <p>Hi ${params.customerName},</p>
          <p>Your <strong>${params.planName}</strong> will expire on <strong>${params.expiresAt}</strong>.</p>
          <p>Please renew before the end date to avoid service interruption. If not renewed, your account will be downgraded to the free plan.</p>
          <div style="text-align: center; margin: 24px 0;">
            <a href="https://snapvee.com/pricing" style="display: inline-block; background: linear-gradient(135deg, #824ac8 0%, #6639a3 100%); color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: bold; font-size: 16px;">
              Renew Now
            </a>
          </div>
          <p style="color: #4a4a4a; font-size: 14px;">If you have any questions, feel free to reply to this email.</p>
        </div>
      </body>
    </html>
  `;

  return { subject, html };
}

export async function sendRenewalReminderEmail(
  email: string,
  params: RenewalReminderParams,
  locale: string = "en",
) {
  try {
    const template = getRenewalReminderEmailTemplate(params, locale);
    const result = await sendEmail({
      to: email,
      subject: template.subject,
      html: template.html,
    });

    console.log(`[Resend] Renewal reminder email sent to ${email}`);
    return result;
  } catch (error: any) {
    console.error("[Resend] Error sending renewal reminder email:", error);
    throw error;
  }
}
