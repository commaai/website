import { browser } from '$app/environment';

export const REFERRAL_QUERY_PARAM = 'ref';
export const REFERRAL_DISCOUNT = 50;
export const isReferralCode = (code) => /^[a-z0-9]{7}$/i.test(code || '');

export function getReferralCode() {
  if (!browser) return null;

  const referralUrl = new URL(window.location.href);
  const code = referralUrl.searchParams.get(REFERRAL_QUERY_PARAM);
  if (referralUrl.searchParams.has(REFERRAL_QUERY_PARAM)) {
    referralUrl.searchParams.delete(REFERRAL_QUERY_PARAM);
    window.history.replaceState(window.history.state, '', referralUrl);
  }
  return isReferralCode(code) ? code : null;
}
