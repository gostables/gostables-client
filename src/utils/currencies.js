export const Currency = {
  TTDD: {
    value: "TTDD",
    label: "gTTDD",
    icon: "ttdd.png",
    swapAddress: "TBRGNBkWVVXpVjGvmi7LhBhmj6rCvdCsgU",
    swapMarketAddress: "TDLbLFD68VBqeTjsmneroJazrUSgSXf8f9",
    swapStableAddress: "THJ6CYd8TyNzHFrdLTYQ1iAAZDrf5sEsZU",
    gStableAddress: "TXfUYdQeLZ6VtqTaEYQkRifbGZBXF9Xb71",
  },
};

export const getCurrencies = () => {
  return Object.values(Currency);
};

export const getCurrency = (currValue) => {
  return Currency[currValue];
};
