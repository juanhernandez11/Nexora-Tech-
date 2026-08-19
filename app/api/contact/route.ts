import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// ─── Rate Limiting (en memoria) ────────────────────────────────────────────────
// Máximo 3 envíos por IP cada 15 minutos.
// En memoria es suficiente para un sitio de portafolio/agencia pequeña.
// Si escalas a múltiples instancias, reemplaza con Redis.

const RATE_LIMIT_MAX      = 3;           // intentos permitidos
const RATE_LIMIT_WINDOW   = 15 * 60 * 1000; // 15 minutos en ms

interface RateEntry {
  count: number;
  firstRequest: number;
}

const rateLimitMap = new Map<string, RateEntry>();

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  );
}

function isRateLimited(ip: string): boolean {
  const now   = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry) {
    rateLimitMap.set(ip, { count: 1, firstRequest: now });
    return false;
  }

  // La ventana expiró → resetear contador
  if (now - entry.firstRequest > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, firstRequest: now });
    return false;
  }

  // Dentro de la ventana → incrementar
  entry.count += 1;
  if (entry.count > RATE_LIMIT_MAX) return true;

  return false;
}

// ─── Tipos ─────────────────────────────────────────────────────────────────────

interface ContactBody {
  name: string;
  email: string;
  projectType: string;
  message: string;
  /** Campo honeypot: debe llegar vacío siempre. Si tiene valor, es un bot. */
  website?: string;
}

// ─── Handler ───────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    // 1. Rate limiting por IP
    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, message: 'Too many requests. Please wait a few minutes.' },
        { status: 429 }
      );
    }

    const body: ContactBody = await req.json();
    const { name, email, projectType, message, website } = body;

    // 2. Honeypot: si el campo "website" tiene cualquier valor, es un bot
    if (website) {
      // Respondemos 200 para no delatar la trampa al bot
      return NextResponse.json({ success: true });
    }

    // 3. Validación de campos obligatorios
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 4. Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // 5. Limitar longitud de campos
    if (name.length > 100 || email.length > 200 || message.length > 5000) {
      return NextResponse.json(
        { success: false, message: 'Field too long' },
        { status: 400 }
      );
    }

    // 6. Sanitizar para evitar inyección HTML en el email
    const sanitize = (str: string) =>
      str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

    const safeName        = sanitize(name.trim());
    const safeEmail       = sanitize(email.trim());
    const safeProjectType = sanitize((projectType || '').trim());
    const safeMessage     = sanitize(message.trim());

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

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
      subject: `Nuevo contacto de ${safeName} — Nexora Tech`,
      replyTo: safeEmail,
      html: `
        <div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:0 auto;background:#f8fafc;padding:32px;border-radius:16px;">
          <div style="background:#4F46E5;padding:20px 32px;border-radius:12px;margin-bottom:24px;">
            <h2 style="color:#fff;margin:0;font-size:20px;">Nuevo mensaje de contacto</h2>
          </div>
          <table style="width:100%;border-collapse:collapse;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">
            <tr style="border-bottom:1px solid #e2e8f0;">
              <td style="padding:14px 20px;font-weight:700;color:#475569;width:160px;background:#f8fafc;">Nombre</td>
              <td style="padding:14px 20px;color:#0f172a;">${safeName}</td>
            </tr>
            <tr style="border-bottom:1px solid #e2e8f0;">
              <td style="padding:14px 20px;font-weight:700;color:#475569;background:#f8fafc;">Email</td>
              <td style="padding:14px 20px;color:#0f172a;"><a href="mailto:${safeEmail}" style="color:#4F46E5;">${safeEmail}</a></td>
            </tr>
            <tr style="border-bottom:1px solid #e2e8f0;">
              <td style="padding:14px 20px;font-weight:700;color:#475569;background:#f8fafc;">Tipo de proyecto</td>
              <td style="padding:14px 20px;color:#0f172a;">${safeProjectType || 'No especificado'}</td>
            </tr>
            <tr>
              <td style="padding:14px 20px;font-weight:700;color:#475569;background:#f8fafc;vertical-align:top;">Mensaje</td>
              <td style="padding:14px 20px;color:#0f172a;line-height:1.7;">${safeMessage.replace(/\n/g, '<br/>')}</td>
            </tr>
          </table>
          <p style="color:#94a3b8;font-size:12px;margin-top:24px;text-align:center;">
            Enviado desde nexorate.netlify.app · ${new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' })}
          </p>
        </div>
      `,
    });

    // Email de confirmación al cliente
    await transporter.sendMail({
      from: `"Ing. Juan R. — Nexora Tech" <${emailUser}>`,
      to: email,
      subject: 'Recibimos tu mensaje — Nexora Tech',
      html: `
        <div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:0 auto;background:#f8fafc;padding:32px;border-radius:16px;">
          <div style="background:#4F46E5;padding:20px 32px;border-radius:12px;margin-bottom:24px;">
            <h2 style="color:#fff;margin:0;font-size:20px;">¡Gracias por contactarnos, ${safeName}!</h2>
          </div>
          <p style="color:#475569;line-height:1.7;font-size:15px;">
            Hemos recibido tu solicitud correctamente. Te contactaremos en las próximas <strong style="color:#0f172a;">24 horas</strong> con una propuesta personalizada para tu proyecto.
          </p>
          <div style="background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:20px;margin:24px 0;">
            <p style="margin:0;font-weight:700;color:#475569;font-size:13px;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:8px;">Tu mensaje:</p>
            <p style="margin:0;color:#0f172a;line-height:1.7;">${safeMessage.replace(/\n/g, '<br/>')}</p>
          </div>
          <p style="color:#475569;line-height:1.7;font-size:15px;">
            Si tienes alguna pregunta urgente, puedes escribirme directamente en
            <a href="https://www.linkedin.com/in/juan-ramon-moreno-bravo-0830b1271/" style="color:#4F46E5;">LinkedIn</a>.
          </p>
          <p style="color:#475569;margin-top:24px;font-size:15px;">
            Saludos,<br/>
            <strong style="color:#0f172a;">Ing. Juan R.</strong><br/>
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
