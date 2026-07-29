import { NextResponse } from "next/server";
import { findBySku } from "@/lib/catalog";
import { jsonHeaders, preflight } from "@/lib/cors";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ sku: string }> },
) {
  const { sku } = await params;
  const item = findBySku(sku);

  if (!item) {
    return NextResponse.json(
      { error: `no product with sku "${sku}"` },
      { status: 404, headers: jsonHeaders() },
    );
  }

  return NextResponse.json(
    { currency: "GBP", item, servedAt: new Date().toISOString() },
    { headers: jsonHeaders() },
  );
}

export function OPTIONS() {
  return preflight("GET");
}
