const getCurrencySymbol = (currencyCode) => {
  return (0).toLocaleString("en-US", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).replace(/\d/g, "").trim();
}

export const formatCurrency = ({ currencyCode, amount }, decimals = 2) => {
  return `${getCurrencySymbol(currencyCode)}${Number(amount).toFixed(decimals)}`;
}
