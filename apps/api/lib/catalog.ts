export type Product = {
  sku: string;
  name: string;
  blurb: string;
  priceGbp: number;
  stock: number;
};

/**
 * The shop's stock list. A real storefront would read this from a database;
 * keeping it in the process is enough to make the API honest about what it
 * serves without pulling in infrastructure the demo does not need.
 */
export const catalog: Product[] = [
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
];

export function findBySku(sku: string): Product | undefined {
  return catalog.find((item) => item.sku.toLowerCase() === sku.toLowerCase());
}
