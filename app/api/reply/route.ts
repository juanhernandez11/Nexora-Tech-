import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ReplyBody {
  clientName: string;
  clientEmail: string;
  projectType: string;
  replyMessage: string;
  secret: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: ReplyBody = await req.json();
    const { clientName, clientEmail, projectType, replyMessage, secret } = body;

    if (secret !== process.env.REPLY_SECRET) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    if (!clientName?.trim() || !clientEmail?.trim() || !replyMessage?.trim()) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(clientEmail)) {
      return NextResponse.json({ success: false, message: 'Invalid email format' }, { status: 400 });
    }

    const sanitize = (str: string) =>
      str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

    const safeName        = sanitize(clientName.trim());
    const safeProjectType = sanitize((projectType || '').trim());
    const safeReply       = sanitize(replyMessage.trim());

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (!emailUser || !emailPass) {
      return NextResponse.json({ success: false, message: 'Email service not configured' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: { user: emailUser, pass: emailPass },
    });

    await transporter.sendMail({
      from: `"Ing. Juan R. — Nexora Tech" <${emailUser}>`,
      to: clientEmail,
      subject: `Re: Tu solicitud${safeProjectType ? ` de ${safeProjectType}` : ''} — Nexora Tech`,
      html: `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:Inter,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#4F46E5 0%,#7C3AED 100%);border-radius:16px 16px 0 0;padding:36px 40px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <p style="margin:0 0 4px 0;font-size:11px;font-weight:900;color:rgba(255,255,255,0.6);text-transform:uppercase;letter-spacing:0.2em;">Nexora Tech · Software Architecture</p>
                  <h1 style="margin:0;font-size:26px;font-weight:900;color:#ffffff;line-height:1.2;">Hola, ${safeName} 👋</h1>
                  <p style="margin:8px 0 0 0;font-size:15px;color:rgba(255,255,255,0.85);line-height:1.5;">Revisé tu solicitud y tengo una respuesta para ti.</p>
                </td>
                <td align="right" style="vertical-align:top;">
                  <div style="width:52px;height:52px;background:rgba(255,255,255,0.15);border-radius:14px;text-align:center;line-height:52px;font-size:26px;">💬</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background:#ffffff;padding:36px 40px;">

            ${safeProjectType ? `
            <div style="display:inline-block;background:#EEF2FF;border:1px solid #C7D2FE;border-radius:8px;padding:6px 14px;margin-bottom:24px;">
              <span style="font-size:11px;font-weight:900;color:#4F46E5;text-transform:uppercase;letter-spacing:0.1em;">📁 ${safeProjectType}</span>
            </div>
            ` : ''}

            <!-- Mensaje -->
            <div style="background:#F8FAFC;border-left:4px solid #4F46E5;border-radius:0 12px 12px 0;padding:24px 28px;margin-bottom:28px;">
              <p style="margin:0 0 8px 0;font-size:11px;font-weight:900;color:#94A3B8;text-transform:uppercase;letter-spacing:0.1em;">Mi respuesta</p>
              <p style="margin:0;font-size:15px;color:#1E293B;line-height:1.8;">${safeReply.replace(/\n/g, '<br/>')}</p>
            </div>

            <!-- Próximos pasos -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#F0FDF4;border:1px solid #BBF7D0;border-radius:12px;margin-bottom:28px;">
              <tr>
                <td style="padding:20px 24px;">
                  <p style="margin:0 0 12px 0;font-size:12px;font-weight:900;color:#15803D;text-transform:uppercase;letter-spacing:0.1em;">✅ Próximos pasos</p>
                  <table cellpadding="0" cellspacing="0">
                    <tr><td style="padding:5px 0;">
                      <span style="display:inline-block;width:20px;height:20px;background:#22C55E;border-radius:50%;text-align:center;line-height:20px;font-size:11px;color:#fff;font-weight:900;margin-right:10px;">1</span>
                      <span style="font-size:14px;color:#166534;">Responde este correo con tus dudas o confirmación</span>
                    </td></tr>
                    <tr><td style="padding:5px 0;">
                      <span style="display:inline-block;width:20px;height:20px;background:#22C55E;border-radius:50%;text-align:center;line-height:20px;font-size:11px;color:#fff;font-weight:900;margin-right:10px;">2</span>
                      <span style="font-size:14px;color:#166534;">Agendamos una llamada de 30 min sin costo</span>
                    </td></tr>
                    <tr><td style="padding:5px 0;">
                      <span style="display:inline-block;width:20px;height:20px;background:#22C55E;border-radius:50%;text-align:center;line-height:20px;font-size:11px;color:#fff;font-weight:900;margin-right:10px;">3</span>
                      <span style="font-size:14px;color:#166534;">Te entrego propuesta personalizada con costos y tiempos</span>
                    </td></tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- CTA -->
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center" style="padding-bottom:28px;">
                  <a href="https://wa.me/522382440637?text=Hola%20Juan%2C%20recib%C3%AD%20tu%20respuesta%20y%20quiero%20continuar"
                     style="display:inline-block;background:linear-gradient(135deg,#4F46E5,#7C3AED);color:#ffffff;text-decoration:none;padding:14px 36px;border-radius:12px;font-size:13px;font-weight:900;text-transform:uppercase;letter-spacing:0.1em;">
                    Responder por WhatsApp →
                  </a>
                </td>
              </tr>
            </table>

            <hr style="border:none;border-top:1px solid #E2E8F0;margin:0 0 24px 0;" />

            <!-- Firma -->
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="vertical-align:middle;padding-right:16px;">
                  <div style="width:48px;height:48px;background:linear-gradient(135deg,#4F46E5,#7C3AED);border-radius:12px;text-align:center;line-height:48px;font-size:20px;font-weight:900;color:#fff;">J</div>
                </td>
                <td>
                  <p style="margin:0;font-size:15px;font-weight:900;color:#0F172A;">Ing. Juan R. Moreno</p>
                  <p style="margin:2px 0 0 0;font-size:12px;color:#64748B;">Software Architect · Nexora Tech</p>
                  <p style="margin:2px 0 0 0;font-size:12px;color:#94A3B8;">Tehuacán, Puebla, México</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#F8FAFC;border-radius:0 0 16px 16px;padding:20px 40px;border-top:1px solid #E2E8F0;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <p style="margin:0;font-size:11px;color:#94A3B8;">
                    © ${new Date().getFullYear()} Nexora Tech ·
                    <a href="${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nexorate.netlify.app'}" style="color:#4F46E5;text-decoration:none;">${(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nexorate.netlify.app').replace('https://', '')}</a>
                  </p>
                </td>
                <td align="right">
                  <a href="https://www.linkedin.com/in/juan-ramon-moreno-bravo-0830b1271/"
                     style="display:inline-block;background:#0A66C2;color:#fff;text-decoration:none;padding:5px 12px;border-radius:6px;font-size:11px;font-weight:900;">LinkedIn</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Reply API] Error:', error instanceof Error ? error.message : error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
