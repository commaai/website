import { browser } from '$app/environment';

export const REFERRAL_QUERY_PARAM = 'ref';
export const REFERRAL_DISCOUNT = 50;
export const isReferralCode = (code) => /^[a-z0-9]+$/i.test(code || '');

export function getReferralCode(url = browser ? window.location.href : '') {
  if (!browser || !url) return null;

  const code = new URL(url).searchParams.get(REFERRAL_QUERY_PARAM);
  return isReferralCode(code) ? code : null;
}

export function getReferralWarning(discountCodes, warnings = []) {
  const referral = discountCodes.find(({ code }) => isReferralCode(code));
  if (!referral || referral.applicable) return null;

  const warning = warnings.find(({ code }) =>
    code === 'DISCOUNT_NOT_FOUND' || code === 'DISCOUNT_USAGE_LIMIT_REACHED'
  );
  return warning ? { code: referral.code, reason: warning.code } : null;
}
