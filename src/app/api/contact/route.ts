import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const { name, email, phone, message, context } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not configured");
    return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: "ASRE Website <onboarding@resend.dev>",
      to: "asre@ali-sons.com",
      replyTo: email,
      subject: context ? `New Enquiry — ${context}` : "New Website Enquiry",
      text: [
        context ? `Context: ${context}` : null,
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || "—"}`,
        "",
        "Message:",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send enquiry email", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
