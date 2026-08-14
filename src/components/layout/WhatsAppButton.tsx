import Image from "next/image";
import { whatsappLink } from "@/lib/data/site";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink("Hi SolBath, I'd like to know more about your products.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 block h-14 w-14"
    >
      <Image
        src="/whatsapp-current.png"
        alt=""
        width={56}
        height={56}
        className="h-full w-full object-contain"
      />
    </a>
  );
}
