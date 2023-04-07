//Nile
// export const USDDAddress = "THJ6CYd8TyNzHFrdLTYQ1iAAZDrf5sEsZU";

//Mainnet
export const USDDAddress = "TPYmHEhy5n8TCEfYGqW2rPxsghSfzghPDn";

export const StableCoinType = {
  USDD: { type: "USDD", value: 1, label: "USDD", icon: "usdd.png" },
};

export const getStableCoinValues = () => {
  return Object.values(StableCoinType);
};

export const getStableCoin = (stableCoinType) => {
  return StableCoinType[stableCoinType];
};
