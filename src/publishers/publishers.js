import { getCurrency } from "../utils/currencies";
import SwapPublisher from "./swap";

let swapPublisher = new SwapPublisher();

export const getSwapPublisherByCurrencyKey = (key) => {
  console.log(`setting SwapPublisher to ${key}`);
  swapPublisher.setCurrency(getCurrency(key));
  return swapPublisher;
}
