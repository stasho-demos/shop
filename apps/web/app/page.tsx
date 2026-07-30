import { loadCatalog } from "@/lib/catalog";

export const dynamic = "force-dynamic";

const gbp = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

function stockLabel(stock: number): { text: string; className: string } {
  if (stock === 0) return { text: "Out of stock", className: "stock stock-out" };
  if (stock <= 10) return { text: `${stock} left`, className: "stock stock-low" };
  return { text: `${stock} in stock`, className: "stock" };
}

export default async function Storefront() {
  const catalog = await loadCatalog();

  return (
    <main>
      <div className="hero">
        <h1>Tools for folding, sewing and pressing paper.</h1>
        <p className="lede">
          A short list, kept short on purpose. Everything here is something we
          use ourselves, and we restock the things that wear out rather than
          adding more lines.
        </p>
      </div>

      <div className="source">
        <span
          className={
            catalog.source === "live" ? "dot dot-live" : "dot dot-snapshot"
          }
          aria-hidden="true"
        />
        {catalog.source === "live" ? (
          <span>
            Live stock from the catalog service
            {catalog.servedAt ? `, read ${catalog.servedAt}` : null}
          </span>
        ) : (
          <span>Showing the committed snapshot ({catalog.reason})</span>
        )}
      </div>

      <div className="grid">
        {catalog.items.map((item) => {
          const stock = stockLabel(item.stock);
          return (
            <article className="item" key={item.sku}>
              <span className="item-sku">{item.sku}</span>
              <h2>{item.name}</h2>
              <p>{item.blurb}</p>
              <div className="item-foot">
                <span className="price">{gbp.format(item.priceGbp)}</span>
                <span className={stock.className}>{stock.text}</span>
              </div>
            </article>
          );
        })}
      </div>

      <footer>
        Foldwork Supply. The storefront and the catalog service are two
        workspaces in one repository, deployed separately. Restocked this
        week: a waxed cotton apron (FW-071).
      </footer>
    </main>
  );
}
