#!/usr/bin/env node
// llms.txt 对账：注册表 TOOLS vs public/llms.txt 收录（memory 纪律：每次新工具上线必须对账）。
// 用法：node scripts/llms-audit.mjs            # 只对账，退出码 1=有缺口
//       node scripts/llms-audit.mjs --fix     # 自动把缺失工具按行业分组补进 ## Tools 段
import { readFileSync, writeFileSync } from 'node:fs';
import { TOOLS } from '../src/tools/index.ts';

const text = readFileSync('public/llms.txt', 'utf8');
const missing = TOOLS.filter((t) => !text.includes(`/${t.industry}/${t.slug}/`));

console.log(`注册表 ${TOOLS.length} 个工具；llms.txt 缺 ${missing.length} 个：`);
for (const t of missing) console.log(`  - [${t.industry}] ${t.name} — /${t.industry}/${t.slug}/`);

const hubLines = ['restaurant', 'cleaning', 'construction', 'lawn', 'salon', 'retail']
  .filter((ind) => !text.includes(`https://mainstreettoolbox.com/${ind}/`));
if (hubLines.length) console.log(`行业枢纽缺失：${hubLines.join(', ')}`);

if (process.argv.includes('--fix') && missing.length) {
  let out = text;
  for (const t of missing) {
    const line = `- [${t.name}](https://mainstreettoolbox.com/${t.industry}/${t.slug}/): ${t.tagline}`;
    // 插到 ## Tools 段内该行业最后一个条目后（无同行业条目则插在段尾）
    const toolsIdx = out.indexOf('## Tools');
    const industryRe = new RegExp(`^(- \\[[^\\]]*\\]\\(https://mainstreettoolbox\\.com/${t.industry}/[^)]*\\):.*$)`, 'gm');
    const after = toolsIdx >= 0 ? out.indexOf('## ', toolsIdx + 5) : -1;
    let insertAt = after >= 0 ? after : out.length;
    let lastMatch = null;
    for (const m of out.slice(toolsIdx).matchAll(industryRe)) lastMatch = m;
    if (lastMatch) insertAt = toolsIdx + lastMatch.index + lastMatch[0].length;
    out = out.slice(0, insertAt) + '\n' + line + out.slice(insertAt);
  }
  // 修工具总数（"N free tools" → 实际注册数）
  out = out.replace(/\b(\d+) free tools\b/g, `${TOOLS.length} free tools`);
  out = out.replace(/\ball \d+ free tools\b/g, `all ${TOOLS.length} free tools`);
  writeFileSync('public/llms.txt', out);
  console.log(`\n已回填 ${missing.length} 条并修正总数 → public/llms.txt（重跑无 --fix 验证应为 0 缺口）`);
  process.exit(missing.length ? 1 : 0);
}
process.exit(missing.length ? 1 : 0);
