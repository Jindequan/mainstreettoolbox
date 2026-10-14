// Security Deposit Refund Calculator — 州法定退还期限引擎（闸 3 预研 docs/benchmarks-security-deposit-refund.md）。
// 一期仅收录 10 个已逐州核对 statute 现行文本的州；未收录州不做任何推测数字（禁二手转引）。
// 规则字段：{days, calendar vs business, 起算点 trigger, 清单义务, 罚则}——起算点不是统一「move-out + N 天」，
// AZ 有 demand 要件、WI 有三选一触发、CO 取两日期后并按自然月进位（月末截断）、WA/AL/PA/CO 取后。
// 上线前复核记录：CO C.R.S. §38-12-103（2026-01-01 修正后现行文本，2026-10-13 经 colorado.public.law 核对）、
// FL §83.49（2025 版 flsenate.gov，2026-10-13）、AZ §33-1321（azleg.gov，2026-10-13）。

export interface DepositInput {
  vacate: string;        // YYYY-MM-DD 搬出/交还日
  termination?: string;  // YYYY-MM-DD 租约终止日（可选）
  demand?: string;       // YYYY-MM-DD 租客书面索要日（AZ 法定要件）
  intendsClaim?: boolean; // FL：房东拟扣押金
}

export interface DepositResult {
  state: string;
  deadline: string;      // ISO：法定退款截止日
  triggerDate: string;   // ISO：时钟起算日
  triggerRule: string;   // 人话：起算规则
  daysRule: string;      // 人话：天数与口径
  statement: string;     // 清单义务
  penalty: string;       // 逾期后果
  alt?: { label: string; date: string };
  statuteUrl: string;
  statuteCite: string;
}

const MS_DAY = 86_400_000;
export const iso = (d: Date): string => d.toISOString().slice(0, 10);
export const parse = (s: string): Date => new Date(s + 'T00:00:00Z');
export const addDays = (s: string, n: number): string => iso(new Date(parse(s).getTime() + n * MS_DAY));
export const addMonthsClamped = (s: string, n: number): string => {
  const d = parse(s);
  const y = d.getUTCFullYear();
  const m = d.getUTCMonth() + n;
  const target = new Date(Date.UTC(y, m, 1));
  const dim = new Date(Date.UTC(target.getUTCFullYear(), target.getUTCMonth() + 1, 0)).getUTCDate();
  target.setUTCDate(Math.min(d.getUTCDate(), dim));
  return iso(target);
};
export const later = (a: string, b?: string): string => (!b || b < a ? a : b);
export const isWeekend = (s: string): boolean => [0, 6].includes(parse(s).getUTCDay());
export const addBusinessDays = (s: string, n: number): string => {
  let cur = s;
  let left = n;
  while (left > 0) {
    cur = addDays(cur, 1);
    if (!isWeekend(cur)) left--;
  }
  return cur;
};

type Slug = 'CA' | 'NY' | 'TX' | 'FL' | 'WA' | 'CO' | 'AZ' | 'WI' | 'AL' | 'PA';

export const VERIFIED_STATES: Slug[] = ['CA', 'NY', 'TX', 'FL', 'WA', 'CO', 'AZ', 'WI', 'AL', 'PA'];

export function computeDeadline(state: Slug, input: DepositInput): DepositResult {
  const vacate = input.vacate;
  const term = input.termination;
  const base = {
    statuteUrl: '', statuteCite: '',
    statement: 'Refund and the itemized deduction statement are due at the same time.',
    penalty: '', daysRule: '', triggerRule: '',
    alt: undefined as DepositResult['alt'],
  };
  switch (state) {
    case 'CA': {
      return {
        ...base, state: 'California', triggerDate: vacate,
        triggerRule: 'Clock starts the day tenants vacate the premises.',
        daysRule: '21 calendar days after move-out.',
        statement: 'Itemized statement is due with the refund. Receipts are required for deductions over $125; for unfinished repairs the landlord may deduct a good-faith estimate and must send the final receipts within 14 days of completing the work.',
        penalty: 'Bad-faith retention can expose the landlord to up to 2× the deposit in statutory damages plus actual damages.',
        deadline: addDays(vacate, 21),
        statuteUrl: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1950.5',
        statuteCite: 'Cal. Civ. Code §1950.5',
      };
    }
    case 'NY': {
      return {
        ...base, state: 'New York', triggerDate: vacate,
        triggerRule: 'Clock starts the day tenants vacate.',
        daysRule: '14 calendar days after move-out.',
        statement: 'An itemized statement of any claimed deductions must be delivered within the same 14 days — miss it and the landlord forfeits the right to keep any part of the deposit.',
        penalty: 'No statement within 14 days = the landlord gives up the right to retain any portion of the deposit.',
        deadline: addDays(vacate, 14),
        statuteUrl: 'https://www.nysenate.gov/legislation/laws/GOB/7-108',
        statuteCite: 'N.Y. Gen. Oblig. Law §7-108(1-a)',
      };
    }
    case 'TX': {
      return {
        ...base, state: 'Texas', triggerDate: vacate,
        triggerRule: 'Clock starts when tenants surrender the property (move-out).',
        daysRule: '30 calendar days after surrender.',
        statement: 'Refund and itemized deductions are due within the same 30 days (the lease must include a forwarding-address requirement for this clock to run).',
        penalty: 'No refund or statement within 30 days is presumptively bad faith: $100 plus 3× the wrongfully withheld portion plus attorney\'s fees.',
        deadline: addDays(vacate, 30),
        statuteUrl: 'https://statutes.capitol.texas.gov/Docs/PR/htm/PR.92.htm',
        statuteCite: 'Tex. Prop. Code §92.103 / §92.109',
      };
    }
    case 'FL': {
      const t = term ?? vacate;
      const claim = input.intendsClaim === true;
      return {
        ...base, state: 'Florida', triggerDate: t,
        triggerRule: 'Clock starts on termination of the rental agreement.',
        daysRule: claim
          ? '30 calendar days to send a written notice of claim; the 15-day refund window does not apply when deductions are claimed.'
          : '15 calendar days to refund in full when no deductions are claimed.',
        statement: notice(
          'If the landlord intends to claim, written notice stating the reasons must go out within 30 days; tenants have 15 days to object in writing.',
          'Interest applies only where the deposit was held in a surety bond (5% per year) or an interest-bearing account (at least 75% of the federal discount rate or 5%, whichever is less).',
          claim),
        penalty: 'Missing the 30-day notice window forfeits the right to impose any claim on the deposit.',
        deadline: claim ? addDays(t, 30) : addDays(t, 15),
        alt: claim
          ? { label: 'Tenant objection window closes', date: addDays(addDays(t, 30), 15) }
          : { label: 'Claim-notice deadline if the landlord does claim', date: addDays(t, 30) },
        statuteUrl: 'https://www.flsenate.gov/Laws/Statutes/2025/83.49',
        statuteCite: 'Fla. Stat. §83.49(3)',
      };
    }
    case 'WA': {
      const trigger = later(vacate, term);
      return {
        ...base, state: 'Washington', triggerDate: trigger,
        triggerRule: 'Clock starts on the later of lease termination or move-out.',
        daysRule: '30 calendar days (raised from 21 by HB 1074, effective July 23, 2023).',
        statement: 'Itemized statement due within the same period. Deductions for ordinary wear are banned; carpet cleaning can only be charged for damage beyond ordinary wear; anything missing from the move-in checklist cannot be deducted.',
        penalty: 'Missing the deadline forfeits the right to withhold any of the deposit; willful refusal can add up to 2× the deposit plus court costs and attorney\'s fees.',
        deadline: addDays(trigger, 30),
        statuteUrl: 'https://app.leg.wa.gov/RCW/default.aspx?cite=59.18.280',
        statuteCite: 'RCW 59.18.280',
      };
    }
    case 'CO': {
      const trigger = later(vacate, term);
      return {
        ...base, state: 'Colorado', triggerDate: trigger,
        triggerRule: 'Clock starts on the later of lease termination or surrender and acceptance of the premises.',
        daysRule: 'One calendar month after the trigger (a lease may extend this, but never beyond 60 days).',
        statement: 'A written itemized statement is due with the refund; without it the landlord forfeits the right to withhold any portion.',
        penalty: 'Willful retention of a wrongfully withheld portion = 3× that portion plus court costs and attorney\'s fees (a 7-day written demand must precede suit).',
        deadline: addMonthsClamped(trigger, 1),
        alt: { label: 'Absolute cap with a lease extension (60 days)', date: addDays(trigger, 60) },
        statuteUrl: 'https://leg.colorado.gov/statutes',
        statuteCite: 'C.R.S. §38-12-103',
      };
    }
    case 'AZ': {
      const trigger = later(later(vacate, term), input.demand ?? '');
      return {
        ...base, state: 'Arizona', triggerDate: trigger,
        triggerRule: 'Clock starts on the latest of: lease termination, surrender and acceptance, or the tenant\'s written demand for return.',
        daysRule: '14 days excluding Saturdays, Sundays, and legal holidays (this engine skips weekends; federal holidays can add a day or two).',
        statement: 'Refund plus an itemized list of deductions (with reasons) is due inside the same 14-business-day window.',
        penalty: 'Wrongful withholding exposes the landlord to 2× the wrongfully withheld portion; tenants have 60 days to object in writing or the decision becomes final.',
        deadline: addBusinessDays(trigger, 14),
        statuteUrl: 'https://www.azleg.gov/viewdocument/?docName=https://www.azleg.gov/ars/33/01321.htm',
        statuteCite: 'A.R.S. §33-1321(D)-(E)',
      };
    }
    case 'WI': {
      const trigger = term ?? vacate;
      return {
        ...base, state: 'Wisconsin', triggerDate: trigger,
        triggerRule: 'Clock starts on the earliest of: the lease termination date, a new tenant\'s start date after an approved transfer, or the date the landlord learns tenants have vacated.',
        daysRule: '21 calendar days after the trigger.',
        statement: 'Itemized statement due within the 21 days. Deductions are limited to six statutory categories unless the lease signed nonstandard rental provisions.',
        penalty: 'No statutory penalty — disputes run through common-law claims (Wisconsin tenants regularly win 2× awards in small-claims court).',
        deadline: addDays(trigger, 21),
        statuteUrl: 'https://docs.legis.wisconsin.gov/document/administrativecode/ATCP%20134.06(2)',
        statuteCite: 'Wis. Adm. Code ATCP 134.06(2)',
      };
    }
    case 'AL': {
      const trigger = later(vacate, term);
      return {
        ...base, state: 'Alabama', triggerDate: trigger,
        triggerRule: 'Clock starts on the later of lease termination and delivery of possession.',
        daysRule: '60 calendar days (current statute — older guides citing 35 days are out of date).',
        statement: 'Refund with an itemized statement is due within the same 60 days; deposits unclaimed for 90 days belong to the landlord.',
        penalty: 'Failure to return or account within 60 days = 2× the original deposit.',
        deadline: addDays(trigger, 60),
        statuteUrl: 'https://alison.legislature.state.al.us/code-of-alabama',
        statuteCite: 'Ala. Code §35-9A-201',
      };
    }
    case 'PA': {
      const trigger = later(vacate, term);
      return {
        ...base, state: 'Pennsylvania', triggerDate: trigger,
        triggerRule: 'Clock starts on the later of lease termination or surrender and acceptance of the premises.',
        daysRule: '30 calendar days.',
        statement: 'Refund and itemized list of deductions are due simultaneously. Deposits over $100 must sit in escrow; from the third year of the lease the landlord pays escrow interest (less a 1%/year admin fee).',
        penalty: 'Missing the window means the landlord forfeits the right to withhold — tenants can recover 2× the wrongfully withheld amount.',
        deadline: addDays(trigger, 30),
        statuteUrl: 'https://www.palegis.us',
        statuteCite: '68 P.S. §250.512 (Landlord and Tenant Act of 1951, §512)',
      };
    }
  }
}

// FL 文案拼接（claim 与否清单义务不同）
function notice(a: string, b: string, claim: boolean): string {
  return claim ? a + ' ' + b : a + ' ' + b;
}
