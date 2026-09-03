import { browser } from '$app/environment';

export const REFERRAL_QUERY_PARAM = 'ref';
export const REFERRAL_DISCOUNT = 50;
export const isReferralCode = (code) => /^[a-z0-9]{7}$/i.test(code || '');

export function getReferralCode() {
  if (!browser) return null;

  const code = new URL(window.location.href).searchParams.get(REFERRAL_QUERY_PARAM);

  return isReferralCode(code) ? code : null;
}
