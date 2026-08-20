import { browser } from '$app/environment';

export const REFERRAL_QUERY_PARAM = 'ref';
export const REFERRAL_DISCOUNT = 50;

export function getReferralCode(url = browser ? window.location.href : '') {
  if (!browser || !url) return null;

  return new URL(url).searchParams.get(REFERRAL_QUERY_PARAM);
}
