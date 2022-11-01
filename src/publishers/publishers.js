import { getCurrency } from "../utils/currencies";
import SwapPublisher from "./swap";

const ttddSwapPublisher = new SwapPublisher(getCurrency("TTDD"));

export const getSwapPublisherByCurrencyKey = (key) => {
  switch (key) {
    case "TTDD":
      return ttddSwapPublisher;

    default:
      throw new Error(`unknown currency ${key}`);
  }
};
