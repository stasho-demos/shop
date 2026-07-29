import { NextResponse } from "next/server";
import { catalog } from "@/lib/catalog";
import { jsonHeaders, preflight } from "@/lib/cors";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json(
    {
      currency: "GBP",
      count: catalog.length,
      inStock: catalog.filter((item) => item.stock > 0).length,
      items: catalog,
      servedAt: new Date().toISOString(),
    },
    { headers: jsonHeaders() },
  );
}

export function OPTIONS() {
  return preflight("GET");
}
