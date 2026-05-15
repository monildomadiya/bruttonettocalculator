// Shared calculation utility functions for all German payroll calculators

export interface BruttoNettoResult {
  brutto: number;
  lst: number;
  soli: number;
  kist: number;
  kv: number;
  rv: number;
  av: number;
  pv: number;
  netto: number;
  agKV: number;
  agRV: number;
  agAV: number;
  agPV: number;
  agGesamt: number;
}

export function calcBruttoNetto(params: {
  bruttoYear: number;
  steuerklasse: number;
  bundesland: string;
  geburtsjahr: number;
  kirchensteuer: boolean;
  pkv: boolean;
  kvZusatz: number;
  kinderanzahl: number;
  period: "monthly" | "yearly";
}): BruttoNettoResult {
  const { bruttoYear, steuerklasse, bundesland, geburtsjahr, kirchensteuer, pkv, kvZusatz, kinderanzahl, period } = params;
  const alter = 2024 - geburtsjahr;
  const isEast = bundesland === "east";

  const bbgKV = Math.min(bruttoYear, 62100);
  const bbgRV = isEast ? Math.min(bruttoYear, 89400) : Math.min(bruttoYear, 90600);

  const zusatzSatz = kvZusatz / 100;
  const kvSatzAN = pkv ? 0 : 0.073 + zusatzSatz / 2;
  const kvSatzAG = pkv ? 0 : 0.073 + zusatzSatz / 2;
  const kvYear = pkv ? 0 : bbgKV * kvSatzAN;
  const agKV = pkv ? 0 : bbgKV * kvSatzAG;

  const rvYear = bbgRV * 0.093;
  const agRV = bbgRV * 0.093;
  const avYear = Math.min(bruttoYear, 90600) * 0.013;
  const agAV = Math.min(bruttoYear, 90600) * 0.013;

  const pvZuschlag = alter >= 23 && kinderanzahl === 0 ? 0.006 : 0;
  const pvSatzAN = 0.017 + pvZuschlag;
  const pvSatzAG = 0.017;
  const pvYear = Math.min(bruttoYear, 62100) * pvSatzAN;
  const agPV = Math.min(bruttoYear, 62100) * pvSatzAG;

  const svYear = kvYear + rvYear + avYear + pvYear;
  const zvE = Math.max(0, bruttoYear - svYear - Math.min(1230, bruttoYear * 0.05) - 36);

  const formula = (x: number): number => {
    const z = Math.max(0, x - kinderanzahl * 6384);
    if (z <= 11604) return 0;
    if (z <= 17005) { const y = (z - 11604) / 10000; return (979.18 * y + 1400) * y; }
    if (z <= 66760) { const y = (z - 17005) / 10000; return (192.59 * y + 2397) * y + 966.53; }
    if (z <= 277825) return 0.42 * z - 10602.13;
    return 0.45 * z - 18936.88;
  };

  let lstYear = 0;
  if (steuerklasse === 3) lstYear = Math.max(0, Math.round(formula(zvE / 2) * 2));
  else {
    let st = formula(zvE);
    if (steuerklasse === 5) st = Math.max(0, st * 1.4);
    if (steuerklasse === 6) st = Math.max(0, zvE * 0.42);
    lstYear = Math.max(0, Math.round(st));
  }

  const soliYear = lstYear <= 18130 ? 0 : lstYear <= 31386 ? (lstYear - 18130) * 0.119 : lstYear * 0.055;
  const kistYear = kirchensteuer ? lstYear * (bundesland === "bavaria" || bundesland === "bw" ? 0.08 : 0.09) : 0;
  const nettoYear = bruttoYear - lstYear - soliYear - kistYear - kvYear - rvYear - avYear - pvYear;
  const agGesamt = bruttoYear + agKV + agRV + agAV + agPV;

  const div = period === "monthly" ? 12 : 1;
  return {
    brutto: bruttoYear / div, lst: lstYear / div, soli: soliYear / div,
    kist: kistYear / div, kv: kvYear / div, rv: rvYear / div,
    av: avYear / div, pv: pvYear / div, netto: nettoYear / div,
    agKV: agKV / div, agRV: agRV / div, agAV: agAV / div, agPV: agPV / div,
    agGesamt: agGesamt / div,
  };
}

export const fmtEUR = (n: number) =>
  new Intl.NumberFormat("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n) + " €";

export const STEUERKLASSEN = [
  { value: "1", label: "Klasse I – Ledig / Alleinstehend" },
  { value: "2", label: "Klasse II – Alleinerziehend" },
  { value: "3", label: "Klasse III – Verheiratet (höheres Einkommen)" },
  { value: "4", label: "Klasse IV – Verheiratet (gleiches Einkommen)" },
  { value: "5", label: "Klasse V – Verheiratet (geringeres Einkommen)" },
  { value: "6", label: "Klasse VI – Zweitjob / Nebeneinkommen" },
];

export const BUNDESLAENDER = [
  { value: "west", label: "Westdeutschland (allgemein)" },
  { value: "east", label: "Ostdeutschland (allgemein)" },
  { value: "bavaria", label: "Bayern" },
  { value: "bw", label: "Baden-Württemberg" },
];
