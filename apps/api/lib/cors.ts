/** Origin allowed to read responses. Runtime configurable, defaults to open. */
export function corsOrigin(): string {
  return process.env.CORS_ORIGIN ?? "*";
}

export function jsonHeaders(): Record<string, string> {
  return {
    "cache-control": "no-store",
    "access-control-allow-origin": corsOrigin(),
  };
}

export function preflight(methods: string): Response {
  return new Response(null, {
    status: 204,
    headers: {
      "access-control-allow-origin": corsOrigin(),
      "access-control-allow-methods": methods,
    },
  });
}
