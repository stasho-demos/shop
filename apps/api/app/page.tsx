export const dynamic = "force-dynamic";

const style: Record<string, string> = {
  background: "#08090c",
  color: "#e8eaef",
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
  padding: "3rem 1.5rem",
  lineHeight: "1.7",
};

export default function Index() {
  return (
    <main style={style}>
      <div style={{ maxWidth: "40rem", margin: "0 auto" }}>
        <h1 style={{ fontSize: "1.25rem", margin: "0 0 1rem" }}>
          Foldwork Catalog API
        </h1>
        <p style={{ color: "#8b93a3", margin: "0 0 1.5rem" }}>
          Stock and pricing for the storefront. There is no interface here on
          purpose. The endpoints are:
        </p>
        <ul style={{ color: "#8b93a3", paddingLeft: "1.25rem" }}>
          <li>
            <code style={{ color: "#fbbf24" }}>GET /api/catalog</code> every
            product with price and stock
          </li>
          <li>
            <code style={{ color: "#fbbf24" }}>GET /api/catalog/[sku]</code> one
            product, 404 if the sku is unknown
          </li>
          <li>
            <code style={{ color: "#fbbf24" }}>GET /api/status</code> liveness,
            uptime and boot id
          </li>
        </ul>
      </div>
    </main>
  );
}
