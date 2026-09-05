// 防漂移：worker 的 slug 白名单必须覆盖站点注册表的全部工具 + menu-maker。
// 新工具上线时若忘了更新 worker，这里会先红。
import { describe, expect, it } from 'vitest';
import { SLUGS } from './index';
import { TOOLS } from '../../src/tools';

describe('worker SLUGS allowlist', () => {
  it('covers every registered tool', () => {
    const missing = TOOLS.map((t) => t.slug).filter((s) => !SLUGS.has(s));
    expect(missing).toEqual([]);
  });

  it('covers menu-maker', () => {
    expect(SLUGS.has('menu-maker')).toBe(true);
  });

  it('has no unknown slugs', () => {
    const known = new Set([...TOOLS.map((t) => t.slug), 'menu-maker']);
    const extra = [...SLUGS].filter((s) => !known.has(s));
    expect(extra).toEqual([]);
  });
});
