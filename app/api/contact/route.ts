import { NextResponse } from "next/server";
import { Resend } from "resend";

const CONTACT_EMAIL = "lukasbayer97@gmail.com";

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Email delivery is not configured." },
      { status: 503 },
    );
  }

  let body: { message?: string; visitorName?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const message = body.message?.trim();
  const visitorName = body.visitorName?.trim() || "Portfolio visitor";

  if (!message) {
    return NextResponse.json({ error: "Message is required." }, { status: 400 });
  }

  if (message.length > 4000) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 });
  }

  const resend = new Resend(apiKey);
  const from =
    process.env.RESEND_FROM_EMAIL ?? "Portfolio Contact <onboarding@resend.dev>";

  const { error } = await resend.emails.send({
    from,
    to: CONTACT_EMAIL,
    replyTo: CONTACT_EMAIL,
    subject: `Portfolio message from ${visitorName}`,
    text: `Visitor: ${visitorName}\n\n${message}`,
  });

  if (error) {
    return NextResponse.json(
      { error: "Unable to send message right now." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
