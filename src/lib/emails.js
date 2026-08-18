// Noir Creative — branded email templates (Resend delivery)
// Brand tokens mirrored from src/app/globals.css:
// Ink #0A0A0B · Ink-raised #131315 · Bone #F4F4EF · Signal Lime #C6F24E · Ash #6E7278 · Body #B4B8BE
// Rule: flat color only, no gradients. Lime = clickable things only. Sharp 2px corners.

const TOKENS = {
  ink: "#0A0A0B",
  inkRaised: "#131315",
  bone: "#F4F4EF",
  lime: "#C6F24E",
  ash: "#6E7278",
  body: "#B4B8BE",
  line: "#232326",
  lineStrong: "#2E2E32",
  radius: "2px",
};

const SITE_URL = process.env.SITE_URL || "https://noircreativellc.com";

const SITE = {
  name: "Noir Creative",
  legal: "Noir Creative LLC",
  tagline: "Digital Engineering & Design Collective",
  email: process.env.CONTACT_EMAIL || "supportnoircreative@gmail.com",
  phone: "+1 (628) 272-4787",
  phoneHref: "tel:+16282724787",
  facebook: "https://www.facebook.com/share/19Z97rLmGv/",
  instagram: "https://instagram.com/noircreativellc",
};

export function fromEmail() {
  return process.env.RESEND_FROM_EMAIL || "Noir Creative <noir@noircreativellc.com>";
}

function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function mailto(name, email) {
  const subject = encodeURIComponent(`Re: your inquiry — ${name}`);
  return `mailto:${email}?subject=${subject}`;
}

/* ---------- shared shell ---------- */

function wordmarkRow() {
  return `
    <tr>
      <td align="center" style="padding: 36px 32px 0 32px;">
        <div style="font-family:'Space Grotesk','Arial Black',Arial,sans-serif;font-size:23px;font-weight:800;letter-spacing:-0.03em;color:${TOKENS.bone};line-height:1;">
          NOIR CREATIVE<span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:${TOKENS.lime};margin:0 0 0 7px;vertical-align:2px;"></span>
        </div>
        <div style="font-family:'JetBrains Mono',Consolas,'Courier New',monospace;font-size:9px;font-weight:600;letter-spacing:0.22em;color:${TOKENS.ash};margin-top:8px;">
          ${esc(SITE.tagline.toUpperCase())}
        </div>
      </td>
    </tr>
  `;
}

function shell({ preheader, children, cta }) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="dark" />
    <title>${esc(preheader)}</title>
  </head>
  <body style="margin:0;padding:0;background:${TOKENS.ink};-webkit-font-smoothing:antialiased;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(preheader)}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${TOKENS.ink};">
      <tr>
        <td align="center" style="padding:24px 16px;">
          <!--[if mso]>
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"><tr><td>
          <![endif]-->
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background:${TOKENS.ink};border:1px solid ${TOKENS.line};border-radius:${TOKENS.radius};">
            ${wordmarkRow()}
            ${children}
            <tr>
              <td style="padding:0 32px 34px 32px;">
                ${cta ? `
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
                  <tr>
                    <td style="border-radius:${TOKENS.radius};background:${TOKENS.lime};">
                      <a href="${cta.href}" style="display:inline-block;padding:13px 30px;font-family:Inter,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;font-size:13px;font-weight:700;letter-spacing:0.04em;color:${TOKENS.ink};text-decoration:none;border-radius:${TOKENS.radius};">${esc(cta.label)}</a>
                    </td>
                  </tr>
                </table>` : ""}
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 34px 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="border-top:1px solid ${TOKENS.line};padding-top:24px;">
                      <div style="text-align:center;font-family:'JetBrains Mono',Consolas,'Courier New',monospace;font-size:9px;font-weight:600;letter-spacing:0.18em;color:${TOKENS.ash};">
                        ${esc(SITE.legal)} — ${esc(SITE.tagline.toUpperCase())}
                      </div>
                      <div style="text-align:center;font-family:Inter,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;font-size:12px;color:${TOKENS.ash};margin-top:10px;">
                        <a href="mailto:${esc(SITE.email)}" style="color:${TOKENS.ash};text-decoration:underline;">${esc(SITE.email)}</a>
                        <span style="color:${TOKENS.lineStrong};">&nbsp;·&nbsp;</span>
                        <a href="${SITE.phoneHref}" style="color:${TOKENS.ash};text-decoration:none;">${esc(SITE.phone)}</a>
                      </div>
                      <div style="text-align:center;font-family:Inter,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;font-size:12px;margin-top:12px;">
                        <a href="${SITE.facebook}" style="color:${TOKENS.ash};text-decoration:none;font-weight:600;">Facebook</a>
                        <span style="color:${TOKENS.lineStrong};">&nbsp;·&nbsp;</span>
                        <a href="${SITE.instagram}" style="color:${TOKENS.ash};text-decoration:none;font-weight:600;">Instagram</a>
                      </div>
                      <div style="text-align:center;font-family:Inter,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;font-size:12px;color:${TOKENS.ash};margin-top:12px;">
                        <a href="${SITE_URL}" style="color:${TOKENS.ash};text-decoration:underline;">${SITE_URL.replace(/^https?:\/\//, "")}</a>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <!--[if mso]>
          </td></tr></table>
          <![endif]-->
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function eyebrow(label) {
  return `
    <tr>
      <td align="center" style="padding:34px 32px 0 32px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
          <tr>
            <td style="width:7px;height:7px;background:${TOKENS.lime};border-radius:1px;vertical-align:middle;"></td>
            <td style="font-family:'JetBrains Mono',Consolas,'Courier New',monospace;font-size:10px;font-weight:600;letter-spacing:0.24em;color:${TOKENS.ash};padding-left:10px;vertical-align:middle;">
              ${esc(label)}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `;
}

function heading(text) {
  return `
    <tr>
      <td align="center" style="padding:16px 32px 0 32px;">
        <div style="font-family:'Space Grotesk','Arial Black',Arial,sans-serif;font-size:26px;font-weight:800;letter-spacing:-0.03em;color:${TOKENS.bone};line-height:1.12;">
          ${text}
        </div>
      </td>
    </tr>
  `;
}

function lead(text) {
  return `
    <tr>
      <td align="center" style="padding:12px 48px 0 48px;">
        <div style="font-family:Inter,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;font-size:13.5px;line-height:1.65;color:${TOKENS.body};">
          ${text}
        </div>
      </td>
    </tr>
  `;
}

function detailTable(rows) {
  const bodyRows = rows
    .map(
      ([label, value]) => `
    <tr>
      <td style="padding:14px 24px;border-bottom:1px solid ${TOKENS.line};">
        <div style="font-family:'JetBrains Mono',Consolas,'Courier New',monospace;font-size:9.5px;font-weight:600;letter-spacing:0.2em;color:${TOKENS.ash};">${esc(label)}</div>
        <div style="font-family:Inter,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;font-size:14.5px;font-weight:600;color:${TOKENS.bone};margin-top:4px;line-height:1.5;">${value}</div>
      </td>
    </tr>`
    )
    .join("");

  return `
    <tr>
      <td style="padding:26px 32px 0 32px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${TOKENS.inkRaised};border:1px solid ${TOKENS.line};border-top:2px solid ${TOKENS.lime};border-radius:${TOKENS.radius};">
          ${bodyRows}
        </table>
      </td>
    </tr>
  `;
}

function messagePanel(label, message) {
  return `
    <tr>
      <td style="padding:22px 32px 0 32px;">
        <div style="font-family:'JetBrains Mono',Consolas,'Courier New',monospace;font-size:9.5px;font-weight:600;letter-spacing:0.2em;color:${TOKENS.ash};margin-bottom:8px;">${esc(label)}</div>
        <div style="background:${TOKENS.inkRaised};border-left:3px solid ${TOKENS.lime};border-top:1px solid ${TOKENS.line};border-right:1px solid ${TOKENS.line};border-bottom:1px solid ${TOKENS.line};border-radius:${TOKENS.radius};padding:18px 22px;font-family:Inter,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;font-size:14px;line-height:1.7;color:${TOKENS.bone};white-space:pre-wrap;">${esc(message)}</div>
      </td>
    </tr>
  `;
}

/* ---------- inquiry notification (to the agency) ---------- */

export function inquiryEmail({ name, email, service, budget, message }) {
  const first = name.split(/\s+/)[0] || name;
  const subject = `New project inquiry — ${name}`;

  const html = shell({
    preheader: `New project inquiry from ${name} — ${service}.`,
    cta: { href: mailto(name, email), label: `Reply to ${first}` },
    children: `
      ${eyebrow("NEW PROJECT INQUIRY")}
      ${heading(`Someone wants to build <span style="color:${TOKENS.lime};">with&nbsp;us.</span>`)}
      ${lead(`${esc(name)} reached out through the site${service && service !== "Not specified" ? ` about ${esc(service.toLowerCase())}` : ""}. Details below.`)}
      ${detailTable([
        ["NAME", esc(name)],
        ["EMAIL", `<a href="mailto:${esc(email)}" style="color:${TOKENS.lime};text-decoration:underline;">${esc(email)}</a>`],
        ["SERVICE", esc(service)],
        ["BUDGET", esc(budget)],
      ])}
      ${messagePanel("PROJECT DETAILS", message)}
    `,
  });

  const text = [
    `New project inquiry — ${name}`,
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Service: ${service}`,
    `Budget: ${budget}`,
    "",
    "Project details:",
    message,
    "",
    `Reply: ${mailto(name, email)}`,
  ].join("\n");

  return { subject, html, text };
}

/* ---------- acknowledgment (to the inquirer) ---------- */

export function ackEmail({ name, email, service, budget, message }) {
  const first = name.split(/\s+/)[0] || name;
  const subject = `We received your inquiry — ${SITE.name} will be in touch`;

  const html = shell({
    preheader: `Thanks, ${first} — your inquiry about ${service} is with the team.`,
    cta: { href: SITE_URL, label: "Explore our work" },
    children: `
      ${eyebrow("INQUIRY RECEIVED")}
      ${heading(`Thanks, ${esc(first)} — <span style="color:${TOKENS.lime};">message&nbsp;received.</span>`)}
      ${lead(`Your inquiry about <strong style="color:${TOKENS.bone};">${esc(service)}</strong> is with the team now. Someone from ${esc(SITE.name)} will reply to this address within one business day.`)}
      ${detailTable([
        ["INQUIRY ID", `NC-${Date.now().toString(36).toUpperCase().slice(-6)}`],
        ["SERVICE", esc(service)],
        ["BUDGET", esc(budget)],
      ])}
      ${messagePanel("WHAT YOU SENT US", message)}
    `,
  });

  const text = [
    `Thanks, ${first} — message received.`,
    "",
    `Your inquiry about ${service} is with the team now. Someone from ${SITE.name} will reply to this address within one business day.`,
    "",
    `Service: ${service}`,
    `Budget: ${budget}`,
    "",
    "What you sent us:",
    message,
    "",
    `${SITE.name} — ${SITE.tagline}`,
    `${SITE.email} · ${SITE.phone}`,
    SITE_URL,
  ].join("\n");

  return { subject, html, text };
}

/* ---------- Resend transport ---------- */

export async function sendEmail({ to, replyTo, subject, html, text }) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail(),
      to,
      reply_to: replyTo,
      subject,
      html,
      text,
    }),
  });
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Resend ${res.status}: ${detail}`);
  }
  return res.json();
}