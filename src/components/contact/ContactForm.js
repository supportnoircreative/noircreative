"use client";

import { Children, cloneElement, useState } from "react";
import { Loader2 } from "lucide-react";
import { EMAIL_RE, cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
// Read from the single source rather than hardcoding: the previous literal
// here pointed at noircreative.com, missing the "llc" in the real domain.
import { site } from "@/data/site";

const initialStatus = { type: null, text: "" };

const SERVICE_OPTIONS = [
  "Graphic Design",
  "Web Development",
  "Digital Marketing",
  "Brand Strategy",
  "UI/UX Design",
  "Video Editing",
  "Amazon & Walmart",
  "Something else",
];

const BUDGET_OPTIONS = [
  "Under $1,000",
  "$1,000 - $5,000",
  "$5,000 - $15,000",
  "$15,000+",
];

/**
 * The site's enquiry form. Defaults to the general project brief; every
 * label and option list can be overridden, which is how the Amazon audit
 * page reuses it. `kind` is sent with the submission and only changes the
 * wording of the notification emails ("project" | "audit").
 */
export function ContactForm({
  kind = "project",
  services = SERVICE_OPTIONS,
  multiService = false,
  budgetLabel = "Budget",
  budgets = BUDGET_OPTIONS,
  messageLabel = "Project details",
  messagePlaceholder = "What are you building, and by when?",
  messageError = "Give us a few details about the project.",
  submitLabel = "Send message",
}) {
  const [status, setStatus] = useState(initialStatus);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState(false);
  const [service, setService] = useState(multiService ? [] : "");
  const [budget, setBudget] = useState("");

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
    if (!message) nextErrors.message = messageError;
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
      setService(multiService ? [] : "");
      setBudget("");
      setStatus({
        type: "ok",
        text: "Message sent. We'll reply within one business day.",
      });
      setToast(true);
      setTimeout(() => setToast(false), 4200);
    } catch (err) {
      setStatus({
        type: "err",
        text: (
          <>
            Couldn&apos;t reach the server. Please email us directly at{" "}
            <a href={`mailto:${site.email}`} className="underline">
              {site.email}
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
        <input type="hidden" name="kind" value={kind} />
        <ChoiceField
          name="service"
          label={multiService ? "Marketplaces" : "Service"}
          hint={multiService ? "Pick one or both" : undefined}
          options={services}
          value={service}
          onChange={setService}
          multiple={multiService}
        />
        <ChoiceField
          name="budget"
          label={budgetLabel}
          options={budgets}
          value={budget}
          onChange={setBudget}
        />
        <Field
          id="message"
          label={messageLabel}
          error={errors.message}
          onClear={() => clearError("message")}
          className="mb-5"
        >
          <textarea
            name="message"
            placeholder={messagePlaceholder}
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
            {sending ? "Sending…" : submitLabel}
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
          "rounded-[2px] border border-(--line) text-text-1 transition-colors duration-250 focus-within:border-lime focus-within:bg-lime/[0.03]",
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

/* Pill choices. Single-select by default; `multiple` keeps an array and
   submits it comma-joined, so the API still receives one string. */
function ChoiceField({ name, label, hint, options, value, onChange, multiple = false }) {
  const isOn = (opt) => (multiple ? value.includes(opt) : value === opt);
  const toggle = (opt) => {
    if (!multiple) return onChange(value === opt ? "" : opt);
    onChange(value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt]);
  };

  return (
    <div className="mb-5">
      <span className="mb-2.5 block text-[11.5px] font-semibold uppercase tracking-[0.1em] text-ash">
        {label}
        {hint && <span className="ml-2 font-normal normal-case tracking-normal text-mute">({hint})</span>}
      </span>
      <div className="flex flex-wrap gap-2" role="group" aria-label={label}>
        {options.map((opt) => {
          const active = isOn(opt);
          return (
            <button
              key={opt}
              type="button"
              aria-pressed={active}
              onClick={() => toggle(opt)}
              className={cn(
                "rounded-full border px-4 py-2 text-[13px] font-medium leading-none transition-colors duration-200",
                active
                  ? "border-lime bg-lime text-ink"
                  : "border-(--line) text-body hover:border-lime hover:text-text-1"
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>
      <input type="hidden" name={name} value={multiple ? value.join(", ") : value} />
    </div>
  );
}