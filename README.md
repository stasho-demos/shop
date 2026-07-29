# Foldwork

A small bookbinding supply shop, split into two workspaces that deploy
independently.

```
apps/web    storefront, renders the catalogue
apps/api    catalog service, owns stock and pricing
```

Both are Next.js applications built with `output: "standalone"`, so each runs
as its own long lived Node process. The repository is an npm workspaces
monorepo with a single lockfile at the root.

## Develop

```bash
npm install                        # once, at the root
npm run dev --workspace apps/api   # catalog service
npm run dev --workspace apps/web   # storefront
```

## Build

```bash
npm run build --workspace apps/api
npm run build --workspace apps/web
```

## Configuration

### `apps/api`

| Variable       | Effect                                             |
| -------------- | -------------------------------------------------- |
| `CORS_ORIGIN`  | Origin allowed to read responses. Defaults to `*`. |
| `PORT`         | Listen port. Supplied by the host.                 |

### `apps/web`

| Variable                   | Effect                                                          |
| -------------------------- | --------------------------------------------------------------- |
| `API_BASE`                 | Base URL of the catalog service. Read at runtime.               |
| `NEXT_PUBLIC_ACCENT_COLOR` | Accent colour. Inlined at build time, so it takes a rebuild.    |

The storefront prefers the catalog service and falls back to a committed
snapshot when `API_BASE` is unset or the service cannot be reached. The page
always states which of the two it is showing, so a fallback is visible rather
than silent.
