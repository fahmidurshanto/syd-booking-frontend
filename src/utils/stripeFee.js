// Stripe Surcharge & Processing Fee Utilities for Australia (AUD)

/**
 * Stripe Australia Real Processing Fee Rates:
 * - Domestic (Australian Cards): 1.65% + A$0.30
 * - International Cards: 3.50% + A$0.30
 */
export const STRIPE_RATES = {
  domestic: {
    percentage: 0.0165,
    fixed: 0.30,
    label: "Australian Card (1.65% + $0.30)",
  },
  international: {
    percentage: 0.0350,
    fixed: 0.30,
    label: "International Card (3.50% + $0.30)",
  },
};

/**
 * Calculates the exact surcharge required so that after Stripe deducts its fee,
 * the merchant receives the exact base fare, or standard direct pass-through.
 *
 * Direct pass-through formula:
 * Surcharge = (BaseFare * percentage) + fixedFee
 *
 * @param {number} baseFare - Base fare amount in AUD
 * @param {'domestic' | 'international'} cardType - Card region
 * @returns {{ baseFare: number, surcharge: number, total: number, rateLabel: string }}
 */
export function calculateStripeSurcharge(baseFare, cardType = "domestic") {
  const numBase = Math.max(0, Number(baseFare) || 0);
  const rate = STRIPE_RATES[cardType] || STRIPE_RATES.domestic;

  const rawSurcharge = (numBase * rate.percentage) + rate.fixed;
  const surcharge = Number(rawSurcharge.toFixed(2));
  const total = Number((numBase + surcharge).toFixed(2));

  return {
    baseFare: numBase,
    surcharge,
    total,
    cardType,
    rateLabel: rate.label,
    percentageRate: (rate.percentage * 100).toFixed(2) + "%",
    fixedFee: rate.fixed.toFixed(2),
  };
}

