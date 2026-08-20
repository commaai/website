import { browser } from '$app/environment';

export const REFERRAL_QUERY_PARAM = 'ref';
export const REFERRAL_COOKIE_NAME = 'referral_code';
export const REFERRAL_CART_ATTRIBUTE = 'referral_code';
export const REFERRAL_DISCOUNT = 50;

const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

export function getReferralCode() {
  if (!browser) return null;

  const queryReferralCode = new URL(window.location.href).searchParams.get(
    REFERRAL_QUERY_PARAM,
  );
  if (queryReferralCode) return queryReferralCode;

  const prefix = `${REFERRAL_COOKIE_NAME}=`;
  const cookie = document.cookie
    .split(';')
    .map((value) => value.trim())
    .find((value) => value.startsWith(prefix));

  if (!cookie) return null;

  return decodeURIComponent(cookie.slice(prefix.length));
}

export function captureReferralCode(url = browser ? window.location.href : '') {
  if (!browser || !url) return null;

  const referralCode = new URL(url).searchParams.get(REFERRAL_QUERY_PARAM);
  if (!referralCode) return null;

  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${REFERRAL_COOKIE_NAME}=${encodeURIComponent(referralCode)}; Path=/; Max-Age=${COOKIE_MAX_AGE_SECONDS}; SameSite=Lax${secure}`;
  return referralCode;
}
