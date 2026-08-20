"use server";

const STRAPI_URL = process.env.STRAPI_URL ?? "http://localhost:1337";

export interface ContactActionState {
  status: "idle" | "success" | "error";
  error?: string;
}

export async function submitContactAction(
  _prevState: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  const name = formData.get("name")?.toString().trim();
  const phone = formData.get("phone")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const message = formData.get("message")?.toString().trim();

  if (!name || !phone || !email || !message) {
    return { status: "error", error: "Please fill in every field before sending." };
  }

  const res = await fetch(`${STRAPI_URL}/api/contact-submissions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: { name, phone, email, message } }),
  });

  if (!res.ok) {
    return {
      status: "error",
      error: "Something went wrong sending your message. Please try again or use WhatsApp.",
    };
  }

  return { status: "success" };
}
