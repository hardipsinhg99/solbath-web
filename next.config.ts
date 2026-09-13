import type { NextConfig } from "next";

// The deployed Strapi host (e.g. https://test-api.solbath.com), derived from the
// same STRAPI_URL that src/lib/cms/client.ts prefixes media URLs with, so a
// deployed build accepts its own CMS's /uploads without hand-editing this list.
// Skipped for localhost, which the static patterns below already cover.
const strapiUrl = new URL(process.env.STRAPI_URL ?? "http://localhost:1337");
const strapiUploads =
  strapiUrl.hostname === "localhost" || strapiUrl.hostname === "127.0.0.1"
    ? []
    : [
        {
          protocol: strapiUrl.protocol.replace(":", "") as "http" | "https",
          hostname: strapiUrl.hostname,
          ...(strapiUrl.port ? { port: strapiUrl.port } : {}),
          pathname: "/uploads/**",
        },
      ];

const nextConfig: NextConfig = {
  images: {
    // Next.js 16 blocks local-IP image sources by default (SSRF hardening).
    // MinIO/Strapi genuinely run on localhost/127.0.0.1 in dev, so opt back
    // in — this is a no-op once the production media host is a real domain.
    dangerouslyAllowLocalIP: true,
    // Strapi's own /uploads (local provider) and the MinIO bucket the CMS
    // uploads to in dev (docker-compose.yml). Add the production media host
    // here too once the CMS is deployed.
    remotePatterns: [
      { protocol: "http", hostname: "localhost", port: "1337", pathname: "/uploads/**" },
      { protocol: "http", hostname: "127.0.0.1", port: "1337", pathname: "/uploads/**" },
      { protocol: "http", hostname: "localhost", port: "9000", pathname: "/solbath-media/**" },
      { protocol: "http", hostname: "127.0.0.1", port: "9000", pathname: "/solbath-media/**" },
      ...strapiUploads,
    ],
  },
};

export default nextConfig;
