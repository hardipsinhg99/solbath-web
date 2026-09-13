import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { getSiteSettings } from "@/lib/data/site";
import { InstagramIcon, FacebookIcon, YoutubeIcon } from "@/components/ui/SocialIcons";

export async function Footer() {
  const site = await getSiteSettings();

  return (
    <footer className="border-t border-border bg-navy text-white/80">
      <Container className="grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="inline-flex items-center">
            <Image
              src="/logo.png"
              alt="SolBath Global Private Limited"
              width={460}
              height={127}
              className="h-12 w-auto object-contain"
            />
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/60">
            {site.footerTagline}
          </p>
          <div className="mt-6 space-y-2.5 text-sm text-white/70">
            <p className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0" /> {site.address}
            </p>
            <p className="flex items-center gap-2">
              <Phone size={16} className="shrink-0" /> {site.phone}
            </p>
            <p className="flex items-center gap-2">
              <Mail size={16} className="shrink-0" /> {site.email}
            </p>
          </div>
          <div className="mt-6 flex gap-4">
            <a href={site.social.instagram} aria-label="Instagram" className="text-white/60 hover:text-white">
              <InstagramIcon size={18} />
            </a>
            <a href={site.social.facebook} aria-label="Facebook" className="text-white/60 hover:text-white">
              <FacebookIcon size={18} />
            </a>
            <a href={site.social.youtube} aria-label="YouTube" className="text-white/60 hover:text-white">
              <YoutubeIcon size={18} />
            </a>
          </div>
        </div>

        {site.footerColumns.map((col) => (
          <div key={col.title}>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
              {col.title}
            </p>
            <ul className="mt-4 space-y-3">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/70 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/45 sm:flex-row">
          <p>Copyright {new Date().getFullYear()} SolBath. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-white/70">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white/70">
              Terms of Use
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
