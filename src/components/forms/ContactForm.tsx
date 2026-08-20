"use client";

import { useActionState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { submitContactAction, type ContactActionState } from "@/lib/actions/contact";

const initialState: ContactActionState = { status: "idle" };

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactAction, initialState);

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-start gap-3 rounded-none border border-success/30 bg-success/5 p-8">
        <CheckCircle2 size={28} className="text-success" />
        <h3 className="font-heading text-xl text-ink">Thanks — we&rsquo;ve got your message</h3>
        <p className="text-sm leading-relaxed text-ink-soft">
          Our team will get back to you within one business day. For anything urgent, reach us
          directly on WhatsApp using the button in the corner of your screen.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full Name" name="name" required />
        <Field label="Phone Number" name="phone" type="tel" required />
      </div>
      <Field label="Email Address" name="email" type="email" required />
      <div>
        <label className="text-sm font-medium text-ink" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-2 w-full rounded-none border border-border bg-cream px-4 py-3 text-sm text-ink placeholder:text-ink-soft/50 focus:border-accent focus:outline-none"
          placeholder="Tell us a bit about what you're looking for..."
        />
      </div>

      {state.status === "error" ? (
        <p className="flex items-start gap-2 text-sm text-error">
          <AlertCircle size={16} className="mt-0.5 shrink-0" /> {state.error}
        </p>
      ) : null}

      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isPending}>
        {isPending ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-ink" htmlFor={name}>
        {label} {required ? <span className="text-error">*</span> : null}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full rounded-none border border-border bg-cream px-4 py-3 text-sm text-ink placeholder:text-ink-soft/50 focus:border-accent focus:outline-none"
      />
    </div>
  );
}
