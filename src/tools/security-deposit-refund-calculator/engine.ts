// Security Deposit Refund Calculator — 州法定退还期限引擎（闸 3 预研 docs/benchmarks-security-deposit-refund.md）。
// 仅收录已逐州核对 statute 现行文本的州；未收录州不做任何推测数字（禁二手转引）。
// 规则字段：{days, calendar vs business, 起算点 trigger, 清单义务, 罚则}——起算点不是统一「move-out + N 天」，
// AZ/SC 有 demand 要件、WI 有三选一触发、CO 取两日期后并按自然月进位（月末截断）、WA/AL/PA/CO 取后、OH/IN/GA 取「终止+交房」二者后。
// 上线前复核记录：CO C.R.S. §38-12-103（2026-01-01 修正后现行文本，2026-10-13 经 colorado.public.law 核对）、
// FL §83.49（2025 版 flsenate.gov，2026-10-13）、AZ §33-1321（azleg.gov，2026-10-13）。
// 二期 14 州（2026-10-20 逐州 statute/官方源核对）：IL 765 ILCS 710（ilga.gov；45 天为 2024-01-01 修正值，旧指南写 30 已过时）、
// MA c.186 §15B（mass.gov）、NJ 2A:18-61.9（nj.gov/dca）、CT §47a-21（portal.ct.gov；21 天为 PA 23-207 后现行值，旧值 30 已废）、
// OH 5321.16（codes.ohio.gov）、MI 554.614（legislature.mi.gov）、IN 32-31-3-12（Justia 留档）、MO 535.300（revisor.mo.gov）、
// GA §44-7-55（Justia 留档；注意押金上限 §44-7-30.1 为 2024-07-01 新法）、NC §42-52（lawhelpnc.org 留档）、
// SC §27-40-410（scstatehouse.gov；起算=终止/交房/书面索要三者最晚）、MN 504B.178（revisor.mn.gov）、
// MD Real Prop. §8-203（mgaleg.maryland.gov）、VA §55.1-1226（law.lis.virginia.gov）。

export interface DepositInput {
  vacate: string;        // YYYY-MM-DD 搬出/交还日
  termination?: string;  // YYYY-MM-DD 租约终止日（可选）
  demand?: string;       // YYYY-MM-DD 租客书面索要日（AZ/SC 法定要件）
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

export type Slug =
  | 'CA' | 'NY' | 'TX' | 'FL' | 'WA' | 'CO' | 'AZ' | 'WI' | 'AL' | 'PA'
  | 'IL' | 'MA' | 'NJ' | 'CT' | 'OH' | 'MI' | 'IN' | 'MO' | 'GA' | 'NC'
  | 'SC' | 'MN' | 'MD' | 'VA';

export const VERIFIED_STATES: Slug[] = [
  'CA', 'NY', 'TX', 'FL', 'WA', 'CO', 'AZ', 'WI', 'AL', 'PA',
  'IL', 'MA', 'NJ', 'CT', 'OH', 'MI', 'IN', 'MO', 'GA', 'NC',
  'SC', 'MN', 'MD', 'VA',
];

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
    case 'IL': {
      const trigger = vacate;
      return {
        ...base, state: 'Illinois', triggerDate: trigger,
        triggerRule: 'Clock starts the day tenants vacate the premises.',
        daysRule: '45 calendar days after move-out (raised from 30 days by the 2024 amendment — older guides still print 30). The Act exempts buildings with 5 or more units.',
        statement: 'A written itemized statement of damages is due earlier than the refund: within 30 days of vacate.',
        penalty: 'Willful non-compliance = 2× the deposit plus court costs and attorney\'s fees.',
        deadline: addDays(trigger, 45),
        alt: { label: 'Itemized statement deadline', date: addDays(trigger, 30) },
        statuteUrl: 'https://www.ilga.gov/Legislation/ILCS/Articles?ActID=2202&ChapterID=62',
        statuteCite: '765 ILCS 710/1 (Security Deposit Return Act)',
      };
    }
    case 'MA': {
      const trigger = term ?? vacate;
      return {
        ...base, state: 'Massachusetts', triggerDate: trigger,
        triggerRule: 'Clock starts on termination of the tenancy.',
        daysRule: '30 calendar days after termination of tenancy.',
        statement: 'Refund or an itemized list of damages is due within the same 30 days; the deposit must have been held in a separate escrow account with interest at 5% or the bank\'s rate, and first/last/security receipts are mandatory at signing.',
        penalty: 'Among the harshest in the country: violations expose the landlord to 3× the amount at issue plus attorney\'s fees and court costs — and skipping the handling rules can forfeit the right to keep any of the deposit.',
        deadline: addDays(trigger, 30),
        statuteUrl: 'https://www.mass.gov/info-details/mass-general-laws-c186-ss-15b',
        statuteCite: 'Mass. Gen. Laws c.186 §15B',
      };
    }
    case 'NJ': {
      const trigger = term ?? vacate;
      return {
        ...base, state: 'New Jersey', triggerDate: trigger,
        triggerRule: 'Clock starts on termination of the lease or tenancy.',
        daysRule: '30 calendar days after termination of the lease (also 30 days when the deposit is transferred to a new owner). Buildings with fewer than 3 rental units are exempt unless the owner rents 10 or more units across buildings.',
        statement: 'Any claim against the deposit requires a written itemized list of damages delivered with the refund balance; interest at the standard rate applies from the deposit being placed in an interest-bearing account.',
        penalty: 'Failure to return the deposit within 30 days lets the tenant sue for the full amount plus court costs — and the court shall award 2× the amount owed as punitive damages on top.',
        deadline: addDays(trigger, 30),
        statuteUrl: 'https://www.nj.gov/dca/codes/publications/pdf_lti/evic_law.pdf',
        statuteCite: 'N.J.S.A. 2A:18-61.9',
      };
    }
    case 'CT': {
      const trigger = term ?? vacate;
      return {
        ...base, state: 'Connecticut', triggerDate: trigger,
        triggerRule: 'Clock starts on termination of the tenancy.',
        daysRule: '21 calendar days after termination, or within 15 days after the landlord receives the tenant\'s written forwarding address — whichever is later (raised under Public Act 23-207; the old 30-day rule is gone). In an eviction case the deadline is 30 days after judgment.',
        statement: 'Refund with interest, or written notice of damages claimed, is due inside the same window.',
        penalty: 'Failure to comply = 2× the amount of the deposit, plus attorney\'s fees to the prevailing tenant.',
        deadline: addDays(trigger, 21),
        statuteUrl: 'https://portal.ct.gov/dob/rental-security-deposits/rental-security-deposits/rental-security-deposits',
        statuteCite: 'Conn. Gen. Stat. §47a-21',
      };
    }
    case 'OH': {
      const trigger = later(vacate, term);
      return {
        ...base, state: 'Ohio', triggerDate: trigger,
        triggerRule: 'Clock starts when both lease termination and delivery of possession have happened — the later of the two.',
        daysRule: '30 calendar days to return the deposit or send a written itemized deduction list plus the owed balance.',
        statement: 'Itemized written list of deductions due with the balance; deposits over $50 or one month\'s rent bear interest on amounts held past six months.',
        penalty: 'Wrongfully withholding any portion = the tenant recovers that portion plus an equal amount as damages, plus reasonable attorney\'s fees.',
        deadline: addDays(trigger, 30),
        statuteUrl: 'https://codes.ohio.gov/ohio-revised-code/section-5321.16',
        statuteCite: 'Ohio Rev. Code §5321.16',
      };
    }
    case 'MI': {
      const trigger = term ?? vacate;
      return {
        ...base, state: 'Michigan', triggerDate: trigger,
        triggerRule: 'Clock starts on termination of occupancy.',
        daysRule: '30 calendar days after termination to refund or mail an itemized list of damages by first-class mail to the tenant\'s forwarding address, with the undisputed balance enclosed.',
        statement: 'Itemized damage list must be mailed; tenants have 7 days after receipt to dispute it in writing or the itemization stands. The landlord\'s required move-in notices (amount, bank, address) failing at lease start also expose the landlord to liability.',
        penalty: 'Non-compliance = 2× the deposit amount in damages.',
        deadline: addDays(trigger, 30),
        statuteUrl: 'https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-554-614',
        statuteCite: 'Mich. Comp. Laws §554.614',
      };
    }
    case 'IN': {
      const trigger = later(vacate, term);
      return {
        ...base, state: 'Indiana', triggerDate: trigger,
        triggerRule: 'Clock starts when both lease termination and delivery of possession have happened — the later of the two.',
        daysRule: '45 calendar days to refund the deposit (less lawful deductions) with an itemized statement.',
        statement: 'Written itemized list of due deductions accompanies the refund.',
        penalty: 'No statutory multiplier — a landlord who fails to comply owes the full deposit due plus reasonable attorney\'s fees.',
        deadline: addDays(trigger, 45),
        statuteUrl: 'https://codes.findlaw.com/in/title-32-property/in-code-sect-32-31-3-12/',
        statuteCite: 'Ind. Code §32-31-3-12',
      };
    }
    case 'MO': {
      const trigger = term ?? vacate;
      return {
        ...base, state: 'Missouri', triggerDate: trigger,
        triggerRule: 'Clock starts on termination of the tenancy.',
        daysRule: '30 calendar days to refund the deposit or mail an itemized list of damages with the balance owed. (Deposits are capped at two months\' rent.)',
        statement: 'Written itemized list of damages due with the refund balance.',
        penalty: 'A landlord who wrongfully withholds — or fails to strictly comply — is liable for 2× the amount withheld, plus the tenant\'s actual damages.',
        deadline: addDays(trigger, 30),
        statuteUrl: 'https://revisor.mo.gov/main/OneSection.aspx?section=535.300',
        statuteCite: 'Mo. Rev. Stat. §535.300',
      };
    }
    case 'GA': {
      const trigger = later(vacate, term);
      return {
        ...base, state: 'Georgia', triggerDate: trigger,
        triggerRule: 'Clock starts when both lease termination and delivery of possession have happened — the later of the two.',
        daysRule: 'One month (30 calendar days) after termination and delivery of possession to refund or send a written itemized list of damages. (A 2024 law, O.C.G.A. §44-7-30.1, caps deposits at two months\' rent.)',
        statement: 'Written itemized list of damages due with the refund; the deposit must sit in an escrow account at a regulated bank while held.',
        penalty: 'The return statute sets no deadline penalty multiplier — disputes run through ordinary claims (inspect-before-move-out and escrow rules are strictly enforced, so paperwork failures are the risk).',
        deadline: addDays(trigger, 30),
        statuteUrl: 'https://law.justia.com/codes/georgia/title-44/chapter-7/article-3/section-44-7-55/',
        statuteCite: 'O.C.G.A. §44-7-55',
      };
    }
    case 'NC': {
      const trigger = term ?? vacate;
      return {
        ...base, state: 'North Carolina', triggerDate: trigger,
        triggerRule: 'Clock starts on termination of the tenancy.',
        daysRule: '30 calendar days after termination to refund the deposit in full, or mail a written itemized accounting of deductions with the balance. If the tenant\'s address is unknown, the deposit is disposed of under §42-51 after the 30 days.',
        statement: 'Written itemized accounting of any deductions, mailed with the balance owed.',
        penalty: 'No automatic multiplier in the return statute — tenants recover the wrongfully held deposit through the Tenant Security Deposit Act remedies.',
        deadline: addDays(trigger, 30),
        statuteUrl: 'https://www.lawhelpnc.org/resource/housing-your-security-deposit',
        statuteCite: 'N.C.G.S. §42-52',
      };
    }
    case 'SC': {
      const trigger = later(later(vacate, term), input.demand ?? '');
      return {
        ...base, state: 'South Carolina', triggerDate: trigger,
        triggerRule: 'Clock starts on the latest of: termination of the tenancy, surrender and delivery of possession, or the tenant\'s written demand for the deposit.',
        daysRule: '30 calendar days from the latest of the three trigger events.',
        statement: 'Written itemized account of deductions due with the refund balance.',
        penalty: 'Wrongful withholding exposes the landlord to up to 3× the wrongfully withheld amount plus attorney\'s fees.',
        deadline: addDays(trigger, 30),
        statuteUrl: 'https://www.scstatehouse.gov/code/t27c040.php',
        statuteCite: 'S.C. Code §27-40-410',
      };
    }
    case 'MN': {
      const trigger = term ?? vacate;
      return {
        ...base, state: 'Minnesota', triggerDate: trigger,
        triggerRule: 'Clock starts when the tenancy ends and the tenant provides a forwarding address (in writing or by email).',
        daysRule: '21 days (three weeks) after the tenancy ends and the forwarding address arrives. A narrow 5-day rule applies in foreclosure-related evictions.',
        statement: 'Refund with interest (annual rate set by statute) or a written statement of deductions due inside the window.',
        penalty: 'The return statute sets no penalty multiplier — interest keeps accruing while the deposit is wrongfully held.',
        deadline: addDays(trigger, 21),
        statuteUrl: 'https://www.revisor.mn.gov/statutes/cite/504b.178',
        statuteCite: 'Minn. Stat. §504B.178',
      };
    }
    case 'MD': {
      const trigger = term ?? vacate;
      return {
        ...base, state: 'Maryland', triggerDate: trigger,
        triggerRule: 'Clock starts at the end of the tenancy.',
        daysRule: '45 calendar days after the end of the tenancy (plus accrued 3%-plus-yield interest). If repair costs cannot be determined in time, the landlord must send a written estimate — nothing withheld without it.',
        statement: 'Written itemized statement of deductions with the balance; missing the estimate provision forfeits the right to withhold.',
        penalty: 'A landlord who fails to return any part without a reasonable basis can be sued for up to 3× the amount withheld, plus reasonable attorney\'s fees.',
        deadline: addDays(trigger, 45),
        statuteUrl: 'https://mgaleg.maryland.gov/mgawebsite/Laws/StatuteText?article=grp&section=8-203',
        statuteCite: 'Md. Code, Real Prop. §8-203',
      };
    }
    case 'VA': {
      const trigger = term ?? vacate;
      return {
        ...base, state: 'Virginia', triggerDate: trigger,
        triggerRule: 'Clock starts on termination of the lease.',
        daysRule: '45 calendar days after lease termination. (Deposits are capped at two months\' periodic rent.)',
        statement: 'Written itemized notice of damages due with the refund; tenants owe the landlord written notice of their forwarding address.',
        penalty: 'Willful failure to comply or wrongful withholding = the tenant recovers the deposit plus actual damages, or up to 2× the deposit. No interest is required on deposits.',
        deadline: addDays(trigger, 45),
        statuteUrl: 'https://law.lis.virginia.gov/vacode/title55.1/chapter12/section55.1-1226',
        statuteCite: 'Va. Code §55.1-1226',
      };
    }
  }
}

// FL 文案拼接（claim 与否清单义务不同）
function notice(a: string, b: string, claim: boolean): string {
  return claim ? a + ' ' + b : a + ' ' + b;
}
