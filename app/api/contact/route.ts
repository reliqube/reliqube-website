import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, company, interest, message, turnstileToken } = await req.json();

    const verifyRes = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: process.env.TURNSTILE_SECRET_KEY!,
          response: turnstileToken,
        }),
      }
    );

    const verifyData = await verifyRes.json();

    if (!verifyData.success) {
      return NextResponse.json(
        { ok: false, error: "Falha na validação anti-spam." },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "Reliqube <website@reliqube.com>",
      to: "reliqube@gmail.com",
      subject: `Novo contato — ${name}`,
      replyTo: email,
      text: `
        Nome: ${name}
        Email: ${email}
        Empresa: ${company || "Não informado"}
        Interesse: ${interest || "Não informado"}

        Mensagem:
        ${message}
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { ok: false, error: "Erro ao enviar mensagem." },
      { status: 500 }
    );
  }
}
