# Main Street Toolbox

**Free calculators for people who actually run the place.**

25 browser-based calculators for small business owners — restaurants, cleaning
businesses, lawn care, construction, salon & barber, retail — plus a menu maker
with Kasavana–Smith menu engineering analysis.

**Live:** <https://mainstreettoolbox.com>

## What's inside

- **25 tools across 6 trades** — food cost %, tip-out splits, break-even,
  cleaning quotes, lawn pricing, contractor rates, booth rent vs commission,
  retail markup/markdown math, and more
- **Menu workbench** (`/menu-maker/`) — full menu dataset, engineering analysis
  (Stars / Plowhorses / Puzzles / Dogs), auto-fit typesetting on Letter/A4,
  PDF / PNG / CSV / JSON export, named versions
- **Doc tools** — printable invoices, work orders, receipts, checklists,
  price lists, inventory count sheets
- **Zero backend** — every calculation runs in the browser. No signup, no
  account, nothing stored server-side.

## Stack

- [Astro 5](https://astro.build) static site (43 pages), TypeScript throughout
- Tool factory pattern: each tool = declarative config + isomorphic compute
  function (same engine renders server-side first paint and client-side live
  updates — one source of truth, no drift)
- Cloudflare Worker + D1 for optional anonymous usage counts (off by default;
  site is fully functional without it)
- Vitest for engine unit tests, `astro check` for type checking

## Repo layout

```
src/
  tools/           # 25 tool definitions (config + compute)
  engines/         # calculation engines (price / split / quote / doc)
  pages/           # routes incl. dynamic [industry]/[tool] factory
  layouts/         # BaseLayout + ToolLayout (tool page template)
  scripts/         # client runtime + usage stats UI
  sdk/             # usage/auth/documents/entitlements capability interface
worker/            # optional stats worker (Cloudflare, D1)
docs/              # product/architecture specs (Chinese) + distribution kit
```

## Development

```bash
npm install
npm run dev      # local dev
npm test         # engine unit tests
npm run check    # astro typecheck
npm run build    # production build
```

## License

All rights reserved (site content & copy). Tool formulas and benchmark bands
are fair game — steal the math, not the words.
