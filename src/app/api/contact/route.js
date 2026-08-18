import { EMAIL_RE } from "@/lib/utils";
import { ackEmail, inquiryEmail, sendEmail } from "@/lib/emails";

export async function POST(request) {
  const form = await request.formData();

  // honeypot — silently drop bot submissions
  if (form.get("company")) {
    return Response.json({ ok: true });
  }

  const name = String(form.get("name") || "").trim();
  const email = String(form.get("email") || "").trim().toLowerCase();
  const service = String(form.get("service") || "").trim() || "Not specified";
  const budget = String(form.get("budget") || "").trim() || "Not specified";
  const message = String(form.get("message") || "").trim();

  if (!name || !EMAIL_RE.test(email) || !message) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    return Response.json({ error: "Email service not configured" }, { status: 500 });
  }

  const inquiry = inquiryEmail({ name, email, service, budget, message });

  try {
    await sendEmail({
      to: process.env.CONTACT_EMAIL || "supportnoircreative@gmail.com",
      replyTo: email,
      ...inquiry,
    });

    const ack = ackEmail({ name, email, service, budget, message });
    sendEmail({ to: email, ...ack }).catch(() => {});

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[api/contact] delivery failed:", err.message);
    return Response.json({ error: "Submission failed" }, { status: 502 });
  }
}