import { getCurrency } from "../utils/currencies";
import SwapPublisher from "./swap";

const ttddSwapPublisher = new SwapPublisher(getCurrency("TTDD"));
const xcddSwapPublisher = new SwapPublisher(getCurrency("XCD"));

export const getSwapPublisherByCurrencyKey = (key) => {
  switch (key) {
    case "TTDD":
      return ttddSwapPublisher;
    case "XCD":
      return xcddSwapPublisher;

    default:
      throw new Error(`unknown currency ${key}`);
  }
};
