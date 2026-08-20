"use server";

const STRAPI_URL = process.env.STRAPI_URL ?? "http://localhost:1337";

export interface QuoteActionState {
  status: "idle" | "success" | "error";
  error?: string;
}

export async function submitQuoteAction(
  _prevState: QuoteActionState,
  formData: FormData,
): Promise<QuoteActionState> {
  const persona = formData.get("persona")?.toString() || undefined;
  const name = formData.get("name")?.toString().trim();
  const phone = formData.get("phone")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const city = formData.get("city")?.toString().trim();
  const requirement = formData.get("requirement")?.toString().trim() || undefined;
  const initialProduct = formData.get("initialProduct")?.toString().trim() || undefined;
  const selectionRaw = formData.get("selection")?.toString();

  if (!name || !phone || !email || !city) {
    return { status: "error", error: "Please fill in every required field before submitting." };
  }

  let selection: unknown;
  if (selectionRaw) {
    try {
      const parsed = JSON.parse(selectionRaw);
      if (Array.isArray(parsed) && parsed.length > 0) selection = parsed;
    } catch {
      // malformed client payload — ignore, submission still proceeds without it
    }
  }

  const res = await fetch(`${STRAPI_URL}/api/quote-submissions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: { persona, name, phone, email, city, requirement, initialProduct, selection },
    }),
  });

  if (!res.ok) {
    return {
      status: "error",
      error: "Something went wrong submitting your request. Please try again or use WhatsApp.",
    };
  }

  return { status: "success" };
}
