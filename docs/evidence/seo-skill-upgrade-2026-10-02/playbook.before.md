# Clustering, scoring, and report template

## Intent clusters (assign every term exactly one)

- **tool-intent** — wants to DO something now: *calculator, generator, maker, converter, template, app, free X*. Money cluster: map to existing tool pages first.
- **how-to/info** — *how to, what is, why, guide, formula, example*. Cluster for articles that internally link to the matching tool.
- **comparison/commercial** — *best, vs, top, alternative, for X business*. High value, often harder; usually article or dedicated landing page.
- **job/role vertical** — *for restaurant, for salon, for landlord…* Vertical landing pages (matches mainstreettoolbox's per-industry strategy).
- **ignore** — brand queries of others, jobs/hiring, news, non-commercial.

## Demand signals (no volume API — score honestly)

- `source breadth`: term returned by both Google AND Bing → stronger than single-source.
- `seed breadth`: term appeared under many different seeds/modifiers → deeper, stable demand.
- `specificity`: 3+ word terms are usually winnable for a new site; 1–2 word head terms are usually not.
- Monetization fit: tool-intent + vertical terms beat generic info terms.

## Tiers

- **T1 quick wins** — long-tail tool-intent or vertical terms, specific, maps to an existing page (or a 1-day page). Actions: optimize title/H1/intro, add FAQ, internal links.
- **T2 build pages** — clear demand cluster with no page yet; each new page needs a "why winnable" line (long-tail, specific vertical, weak SERPs expected).
- **T3 watch** — real demand but too competitive for now; revisit after T1/T2 indexed.
- **ignore** — listed at the end so nobody re-litigates them.

## Report template

```markdown
# Keyword Research — <site> (<date>)
Data: Google+Bing autocomplete, N unique terms, sources responded: …
Seeds: from site inventory (<n> tools / industries). Volume numbers NOT included (no paid API); verify shortlist in GSC/Keyword Planner.

## Top 10 opportunities (table)
| keyword | cluster | signal (src/seeds) | page | action |

## T1 quick wins (per cluster, bullet lists)
## T2 build pages (each with why-winnable)
## T3 watch
## Ignore
## Next actions (10 concrete steps)
```
