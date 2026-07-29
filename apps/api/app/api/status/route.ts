import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { jsonHeaders, preflight } from "@/lib/cors";

export const dynamic = "force-dynamic";

const bootId = randomUUID();
let requestCount = 0;

export function GET() {
  requestCount += 1;
  return NextResponse.json(
    {
      ok: true,
      service: "foldwork-catalog",
      time: new Date().toISOString(),
      uptimeSeconds: Math.round(process.uptime()),
      requestCount,
      bootId,
      rssBytes: process.memoryUsage().rss,
    },
    { headers: jsonHeaders() },
  );
}

export function OPTIONS() {
  return preflight("GET");
}
