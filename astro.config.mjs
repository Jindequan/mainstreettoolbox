import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://mainstreettoolbox.com',
  // 权威形态 = apex 主机 + 尾斜杠（canonical/sitemap 全站已按此输出）。
  // 生产端由 vercel.json 两条 301 兜底（无斜杠→斜杠、www→apex），此处 'force' 仅让本地 dev 与生产行为一致。
  trailingSlash: 'always',
  integrations: [sitemap()],
  build: { inlineStylesheets: 'auto' },
});
