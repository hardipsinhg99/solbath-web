import { mediaSizeLabel, mediaUrl, StrapiMedia, strapiList } from "@/lib/cms/client";
import { Catalog, Vertical } from "@/lib/types";

interface StrapiCatalog {
  documentId: string;
  title: string;
  vertical: { key: Vertical }[];
  file: StrapiMedia | null;
}

function toCatalog(raw: StrapiCatalog): Catalog {
  return {
    id: raw.documentId,
    title: raw.title,
    vertical: raw.vertical[0]?.key ?? "all",
    fileSize: mediaSizeLabel(raw.file) ?? "Pending upload",
    fileUrl: mediaUrl(raw.file),
  };
}

export async function getCatalogs(): Promise<Catalog[]> {
  const data = await strapiList<StrapiCatalog>(
    "/api/catalogs?filters[isActive][$eq]=true&sort=sortOrder" +
      "&populate[vertical][fields][0]=key&populate[file]=true&pagination[pageSize]=100",
    ["catalogs"],
  );
  return data.map(toCatalog);
}
