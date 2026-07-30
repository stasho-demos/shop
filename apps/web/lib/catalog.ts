export type Product = {
  sku: string;
  name: string;
  blurb: string;
  priceGbp: number;
  stock: number;
};

export type CatalogResult = {
  items: Product[];
  /** Where the rendered stock figures came from. */
  source: "live" | "snapshot";
  /** Why the live read was not used. Null when it was. */
  reason: string | null;
  servedAt: string | null;
};

/**
 * Last known good catalog, committed alongside the storefront.
 *
 * The storefront prefers the catalog service and falls back to this when the
 * service is unset or unreachable, so a cold start renders a real shop rather
 * than an error page. The page always says which of the two it is showing.
 */
const snapshot: Product[] = [
  {
    sku: "FW-014",
    name: "Bookbinder's awl",
    blurb: "Beech handle, hardened tip, ground to a diamond point.",
    priceGbp: 18.0,
    stock: 23,
  },
  {
    sku: "FW-021",
    name: "Bone folder, 6 inch",
    blurb: "Real bone, not the plastic sort. Takes a polish with use.",
    priceGbp: 12.5,
    stock: 41,
  },
  {
    sku: "FW-033",
    name: "Linen thread, 25 m",
    blurb: "Waxed, four ply, natural. The one we use for everything.",
    priceGbp: 7.25,
    stock: 88,
  },
  {
    sku: "FW-047",
    name: "Brass corner punch",
    blurb: "Cuts a clean 8 mm radius through four sheets of board.",
    priceGbp: 44.0,
    stock: 6,
  },
  {
    sku: "FW-052",
    name: "Cloth tape, black",
    blurb: "Bookcloth backed, 20 m roll. Holds a spine flat.",
    priceGbp: 9.8,
    stock: 0,
  },
  {
    sku: "FW-060",
    name: "Weight bar, 2 kg",
    blurb: "Powder coated steel. Sits on glued work while it dries.",
    priceGbp: 31.0,
    stock: 14,
  },
  {
    sku: "FW-071",
    name: "Waxed cotton apron",
    blurb: "Full-length, one pocket for the awl. Wipes clean of PVA.",
    priceGbp: 26.5,
    stock: 19,
  },
];

function isProduct(value: unknown): value is Product {
  if (typeof value !== "object" || value === null) return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item["sku"] === "string" &&
    typeof item["name"] === "string" &&
    typeof item["blurb"] === "string" &&
    typeof item["priceGbp"] === "number" &&
    typeof item["stock"] === "number"
  );
}

/**
 * Reads the catalog service, falling back to the committed snapshot.
 *
 * `API_BASE` is read at runtime, so pointing the storefront at a different
 * catalog service is a restart rather than a rebuild.
 */
export async function loadCatalog(): Promise<CatalogResult> {
  const base = process.env.API_BASE?.replace(/\/+$/, "");

  if (!base) {
    return {
      items: snapshot,
      source: "snapshot",
      reason: "API_BASE is not set",
      servedAt: null,
    };
  }

  try {
    const response = await fetch(`${base}/api/catalog`, { cache: "no-store" });
    if (!response.ok) {
      return {
        items: snapshot,
        source: "snapshot",
        reason: `catalog service returned HTTP ${response.status}`,
        servedAt: null,
      };
    }

    const body: unknown = await response.json();
    const items = (body as { items?: unknown }).items;
    if (!Array.isArray(items) || !items.every(isProduct)) {
      return {
        items: snapshot,
        source: "snapshot",
        reason: "catalog service returned an unexpected shape",
        servedAt: null,
      };
    }

    const servedAt = (body as { servedAt?: unknown }).servedAt;
    return {
      items,
      source: "live",
      reason: null,
      servedAt: typeof servedAt === "string" ? servedAt : null,
    };
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    return {
      items: snapshot,
      source: "snapshot",
      reason: `catalog service unreachable: ${detail}`,
      servedAt: null,
    };
  }
}
