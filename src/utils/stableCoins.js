export const StableCoinType = {
  USDD: { type: "USDD", value: 1, label: "USDD", icon: "usdd.png" },
  USDJ: { type: "USDJ", value: 2, label: "USDJ", icon: "usdj.png" },
};

export const getStableCoinValues = () => {
  return Object.values(StableCoinType);
};

export const getStableCoin = (stableCoinType) => {
  return StableCoinType[stableCoinType];
};
