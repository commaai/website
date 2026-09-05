import { browser } from '$app/environment';

export const REFERRAL_QUERY_PARAM = 'ref';
export const REFERRAL_DISCOUNT = 50;
export const isReferralCode = (code) => /^[a-z0-9]{7}$/i.test(code || '');

export function getReferralCode(url = browser ? window.location.href : '') {
  if (!browser || !url) return null;

  const code = new URL(url).searchParams.get(REFERRAL_QUERY_PARAM);
  return isReferralCode(code) ? code : null;
}

export function getReferralWarning(discountCodes, warnings = []) {
  const referral = discountCodes.find(({ code }) => isReferralCode(code));
  if (!referral || referral.applicable) return null;

  const warning = warnings.find(({ code }) => REFERRAL_REJECTION_MESSAGES[code]);
  return warning ? {
    code: referral.code,
    reason: warning.code,
  } : null;
}

export const REFERRAL_REJECTION_MESSAGES = {
  DISCOUNT_NOT_FOUND: 'This referral code is not valid.',
  DISCOUNT_USAGE_LIMIT_REACHED: 'This referral code has reached its usage limit.',
  DISCOUNT_CURRENTLY_INACTIVE: 'This referral code is not active.',
  DISCOUNT_CUSTOMER_USAGE_LIMIT_REACHED: 'You have already used this referral discount.',
  DISCOUNT_CUSTOMER_NOT_ELIGIBLE: 'This referral discount is only valid for new customers',
};
