import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, email, company, interest, message } = await req.json();

  await resend.emails.send({
    from:    "website@reliqube.com",
    to:      "reliqube@gmail.com",
    subject: `New enquiry from ${name} — ${interest || "General"}`,
    text:    `Name: ${name}\nEmail: ${email}\nCompany: ${company}\n\n${message}`,
  });

  return NextResponse.json({ ok: true });
}
