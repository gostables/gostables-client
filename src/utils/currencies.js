export const CurrencyType = {
  TTDD: { type: "TTDD", value: "TTDD", label: "TTDD", icon: "ttdd.png" },
};

export const getCurrencyValues = () => {
  return Object.values(CurrencyType);
};

export const getCurrency = (stableCoinType) => {
  return CurrencyType[stableCoinType];
};
