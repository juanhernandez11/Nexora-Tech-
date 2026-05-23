import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ContactBody {
  name: string;
  email: string;
  projectType: string;
  message: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: ContactBody = await req.json();
    const { name, email, projectType, message } = body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    // Validar que las credenciales están configuradas
    if (!emailUser || !emailPass) {
      console.error('[Contact API] EMAIL_USER or EMAIL_PASS not set in environment variables');
      return NextResponse.json(
        { success: false, message: 'Email service not configured' },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    // Email al propietario
    await transporter.sendMail({
      from: `"Nexora Tech" <${emailUser}>`,
      to: emailUser,
      subject: `Nuevo contacto de ${name} — Nexora Tech`,
      replyTo: email,
      html: `
        <div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:0 auto;background:#f8fafc;padding:32px;border-radius:16px;">
          <div style="background:#4F46E5;padding:20px 32px;border-radius:12px;margin-bottom:24px;">
            <h2 style="color:#fff;margin:0;font-size:20px;">Nuevo mensaje de contacto</h2>
          </div>
          <table style="width:100%;border-collapse:collapse;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">
            <tr style="border-bottom:1px solid #e2e8f0;">
              <td style="padding:14px 20px;font-weight:700;color:#475569;width:160px;background:#f8fafc;">Nombre</td>
              <td style="padding:14px 20px;color:#0f172a;">${name}</td>
            </tr>
            <tr style="border-bottom:1px solid #e2e8f0;">
              <td style="padding:14px 20px;font-weight:700;color:#475569;background:#f8fafc;">Email</td>
              <td style="padding:14px 20px;color:#0f172a;"><a href="mailto:${email}" style="color:#4F46E5;">${email}</a></td>
            </tr>
            <tr style="border-bottom:1px solid #e2e8f0;">
              <td style="padding:14px 20px;font-weight:700;color:#475569;background:#f8fafc;">Tipo de proyecto</td>
              <td style="padding:14px 20px;color:#0f172a;">${projectType || 'No especificado'}</td>
            </tr>
            <tr>
              <td style="padding:14px 20px;font-weight:700;color:#475569;background:#f8fafc;vertical-align:top;">Mensaje</td>
              <td style="padding:14px 20px;color:#0f172a;line-height:1.7;">${message.replace(/\n/g, '<br/>')}</td>
            </tr>
          </table>
          <p style="color:#94a3b8;font-size:12px;margin-top:24px;text-align:center;">
            Enviado desde nexoratech.com · ${new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' })}
          </p>
        </div>
      `,
    });

    // Email de confirmación al cliente
    await transporter.sendMail({
      from: `"Juan Ramón — Nexora Tech" <${emailUser}>`,
      to: email,
      subject: 'Recibimos tu mensaje — Nexora Tech',
      html: `
        <div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:0 auto;background:#f8fafc;padding:32px;border-radius:16px;">
          <div style="background:#4F46E5;padding:20px 32px;border-radius:12px;margin-bottom:24px;">
            <h2 style="color:#fff;margin:0;font-size:20px;">¡Gracias por contactarnos, ${name}!</h2>
          </div>
          <p style="color:#475569;line-height:1.7;font-size:15px;">
            Hemos recibido tu solicitud correctamente. Te contactaremos en las próximas <strong style="color:#0f172a;">24 horas</strong> con una propuesta personalizada para tu proyecto.
          </p>
          <div style="background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:20px;margin:24px 0;">
            <p style="margin:0;font-weight:700;color:#475569;font-size:13px;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:8px;">Tu mensaje:</p>
            <p style="margin:0;color:#0f172a;line-height:1.7;">${message.replace(/\n/g, '<br/>')}</p>
          </div>
          <p style="color:#475569;line-height:1.7;font-size:15px;">
            Si tienes alguna pregunta urgente, puedes escribirme directamente en 
            <a href="https://www.linkedin.com/in/juan-ramon-moreno-bravo-0830b1271/" style="color:#4F46E5;">LinkedIn</a>.
          </p>
          <p style="color:#475569;margin-top:24px;font-size:15px;">
            Saludos,<br/>
            <strong style="color:#0f172a;">Juan Ramón Moreno</strong><br/>
            <span style="color:#94a3b8;font-size:13px;">Software Architect · Nexora Tech</span>
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Contact API] Error:', error instanceof Error ? error.message : error);
    console.error('[Contact API] Stack:', error instanceof Error ? error.stack : 'no stack');
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
