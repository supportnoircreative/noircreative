"use client";

import { Children, cloneElement, useState } from "react";
import { ChevronDown, Loader2 } from "lucide-react";
import { EMAIL_RE, cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const initialStatus = { type: null, text: "" };

export function ContactForm() {
  const [status, setStatus] = useState(initialStatus);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState(false);

  function clearError(name) {
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    const nextErrors = {};
    if (!name) nextErrors.name = "Please tell us your name.";
    if (!EMAIL_RE.test(email)) nextErrors.email = "Enter a valid email address.";
    if (!message) nextErrors.message = "Give us a few details about the project.";
    setErrors(nextErrors);
    setStatus(initialStatus);

    if (Object.keys(nextErrors).length) {
      setStatus({ type: "err", text: "Please fix the highlighted fields before sending." });
      return;
    }

    setSending(true);
    try {
      const res = await fetch("/api/contact", { method: "POST", body: data });
      if (!res.ok) throw new Error("Submission rejected");
      form.reset();
      setStatus({
        type: "ok",
        text: "Message sent — we'll reply within one business day.",
      });
      setToast(true);
      setTimeout(() => setToast(false), 4200);
    } catch (err) {
      setStatus({
        type: "err",
        text: (
          <>
            Couldn&apos;t reach the server — please email us directly at{" "}
            <a href="mailto:support@noircreative.com" className="underline">
              support@noircreative.com
            </a>
            .
          </>
        ),
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <form className="bg-ink-raised p-14 max-sm:p-[26px]" onSubmit={onSubmit} noValidate>
        <div className="mb-5 grid grid-cols-1 gap-[18px] sm:grid-cols-2">
          <Field
            id="name"
            label="Name"
            error={errors.name}
            onClear={() => clearError("name")}
          >
            <input
              type="text"
              name="name"
              placeholder="Jordan Lee"
              autoComplete="name"
              required
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
          </Field>
          <Field
            id="email"
            label="Email"
            error={errors.email}
            onClear={() => clearError("email")}
          >
            <input
              type="email"
              name="email"
              placeholder="you@company.com"
              autoComplete="email"
              required
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
          </Field>
        </div>
        <div className="mb-5 grid grid-cols-1 gap-[18px] sm:grid-cols-2">
          <Field id="service" label="Service">
            <div className="relative">
              <select name="service" defaultValue="" className="pr-10">
                <option value="">What do you need?</option>
                <option>Graphic Design</option>
                <option>Web Development</option>
                <option>Digital Marketing</option>
                <option>Brand Strategy</option>
                <option>UI/UX Design</option>
                <option>Video Editing</option>
                <option>Something else</option>
              </select>
              <ChevronDown
                size={14}
                strokeWidth={1.6}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ash"
              />
            </div>
          </Field>
          <Field id="budget" label="Budget">
            <div className="relative">
              <select name="budget" defaultValue="" className="pr-10">
                <option value="">Approximate range</option>
                <option>Under $1,000</option>
                <option>$1,000 – $5,000</option>
                <option>$5,000 – $15,000</option>
                <option>$15,000+</option>
              </select>
              <ChevronDown
                size={14}
                strokeWidth={1.6}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ash"
              />
            </div>
          </Field>
        </div>
        <Field
          id="message"
          label="Project details"
          error={errors.message}
          onClear={() => clearError("message")}
          className="mb-5"
        >
          <textarea
            name="message"
            placeholder="What are you building, and by when?"
            required
            rows={5}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
        </Field>

        <div className="sr-only" aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="mt-2 flex flex-wrap items-center justify-between gap-5">
          <span className="text-xs text-ash">We&apos;ll never share your info. Reply within 1 business day.</span>
          <Button type="submit" disabled={sending} className="max-sm:w-full">
            {sending && <Loader2 size={15} className="animate-spin" />}
            {sending ? "Sending…" : "Send message"}
          </Button>
        </div>

        {status.text && (
          <div
            role="status"
            aria-live="polite"
            className={cn(
              "mt-[18px] rounded-[2px] border px-4 py-[14px] text-[13.5px]",
              status.type === "ok"
                ? "border-lime lime-accent"
                : "border-[#FF6B6B] text-[#FF6B6B]"
            )}
          >
            {status.text}
          </div>
        )}
      </form>

      <div
        className={cn("toast", toast && "is-show")}
        role="status"
        aria-live="polite"
        aria-hidden={!toast}
      >
        {toast ? "Thanks! Your message is on its way." : ""}
      </div>
    </>
  );
}

function Field({ id, label, error, onClear, children, className }) {
  const describedBy = error ? `${id}-error` : undefined;
  return (
    <div className={cn("mb-0", className)}>
      <label htmlFor={id} className="mb-2.5 block text-[11.5px] font-semibold uppercase tracking-[0.1em] text-ash">
        {label}
      </label>
      <div
        className={cn(
          "rounded-[2px] border border-(--line-strong) text-text-1 transition-colors duration-250 focus-within:border-lime focus-within:bg-lime/[0.03]",
          error && "border-[#FF6B6B]"
        )}
      >
        {onClear
          ? Children.map(children, (child) =>
              cloneElement(child, { onInput: onClear })
            )
          : children}
      </div>
      {error && (
        <div id={`${id}-error`} className="mt-2 text-xs text-[#FF6B6B]">
          {error}
        </div>
      )}
    </div>
  );
}