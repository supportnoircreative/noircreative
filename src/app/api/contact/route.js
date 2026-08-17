export async function POST(request) {
  const form = await request.formData();

  // honeypot — silently drop bot submissions
  if (form.get("company")) {
    return Response.json({ ok: true });
  }

  const email = process.env.CONTACT_EMAIL || "support@noircreative.com";
  const endpoint = process.env.FORMSUBMIT_URL || `https://formsubmit.co/ajax/${email}`;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: form,
    });
    const json = await res.json();
    if (!res.ok) throw new Error("Submission rejected");
    return Response.json(json);
  } catch (err) {
    return Response.json({ error: "Submission failed" }, { status: 502 });
  }
}
