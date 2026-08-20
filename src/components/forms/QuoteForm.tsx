"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useSelection } from "@/components/selection-context";
import { whatsappLink } from "@/lib/data/site";

const personas = [
  { value: "homeowner", label: "Homeowner" },
  { value: "architect", label: "Architect / Designer" },
  { value: "dealer", label: "Dealer / Contractor" },
];

export function QuoteForm({
  initialPersona,
  initialProduct,
}: {
  initialPersona?: string;
  initialProduct?: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [persona, setPersona] = useState(initialPersona ?? "homeowner");
  const { items, remove } = useSelection();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const summaryText = [
    "Hi SolBath, I'd like a quote for:",
    initialProduct ? `- ${initialProduct}` : null,
    ...items.map((i) => `- ${i.name} (${i.collection})`),
  ]
    .filter(Boolean)
    .join("\n");

  if (submitted) {
    return (
      <div className="flex flex-col items-start gap-3 rounded-none border border-success/30 bg-success/5 p-8">
        <CheckCircle2 size={28} className="text-success" />
        <h3 className="font-heading text-xl text-ink">Quote request received</h3>
        <p className="text-sm leading-relaxed text-ink-soft">
          Our sales team will review your requirements and respond within one business day
          with pricing and availability.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
      <form onSubmit={handleSubmit} className="space-y-5 rounded-none border border-border p-8">
        {initialProduct ? (
          <div className="rounded-none bg-stone px-4 py-3 text-sm text-ink-soft">
            Requesting a quote for <span className="font-medium text-ink">{initialProduct}</span>
          </div>
        ) : null}

        <div>
          <p className="text-sm font-medium text-ink">I am a...</p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {personas.map((p) => (
              <button
                key={p.value}
                type="button"
                onClick={() => setPersona(p.value)}
                className={`rounded-none border px-4 py-2 text-xs font-medium transition-colors ${
                  persona === p.value
                    ? "border-navy bg-navy text-white"
                    : "border-border text-ink-soft hover:border-navy"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Full Name" name="name" required />
          <Field label="Phone Number" name="phone" type="tel" required />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Email Address" name="email" type="email" required />
          <Field label="City / Pincode" name="city" required />
        </div>
        <div>
          <label className="text-sm font-medium text-ink" htmlFor="requirement">
            Requirement Details
          </label>
          <textarea
            id="requirement"
            name="requirement"
            rows={4}
            defaultValue={initialProduct ? `I'd like pricing and availability for ${initialProduct}.` : ""}
            className="mt-2 w-full rounded-none border border-border bg-cream px-4 py-3 text-sm text-ink placeholder:text-ink-soft/50 focus:border-accent focus:outline-none"
            placeholder="Tell us about your project, quantities and timelines..."
          />
        </div>

        <Button type="submit" size="lg" className="w-full">
          Submit Quote Request
        </Button>

        <a
          href={whatsappLink(summaryText)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 text-sm font-medium text-success hover:text-success/80"
        >
          <Image src="/whatsapp-current.png" alt="" width={18} height={18} className="h-[18px] w-[18px]" />
          Prefer WhatsApp? Send this as a chat instead
        </a>
      </form>

      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.1em] text-ink-soft">
          My Selection ({items.length})
        </p>
        {items.length === 0 ? (
          <p className="mt-3 text-sm text-ink-soft">
            No products added yet. Browse the catalog and tap &ldquo;Add to My Selection&rdquo;
            to build a multi-product quote list.
          </p>
        ) : (
          <div className="mt-3 space-y-3">
            {items.map((item) => (
              <div
                key={item.slug}
                className="flex items-center justify-between gap-3 rounded-none border border-border px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-ink">{item.name}</p>
                  <p className="text-xs text-ink-soft">{item.collection}</p>
                </div>
                <button
                  onClick={() => remove(item.slug)}
                  aria-label={`Remove ${item.name}`}
                  className="text-ink-soft hover:text-error"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
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
