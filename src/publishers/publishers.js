import { getCurrency } from "../utils/currencies";
import SwapPublisher from "./swap";

let ttddSwapPublisher = null;
let xcddSwapPublisher = null;
let bbddSwapPublisher = null;
let jmddSwapPublisher = null;
let awgdSwapPublisher = null;
let dopSwapPublisher = null;
let bsdSwapPublisher = null;
let kydSwapPublisher = null;
let cupSwapPublisher = null;
let htgSwapPublisher = null;
let eurSwapPublisher = null;

export const getSwapPublisherByCurrencyKey = (key) => {
  switch (key) {
    case "TTDD":
      if (!ttddSwapPublisher) {
        ttddSwapPublisher = new SwapPublisher(getCurrency("TTDD"));
      }
      return ttddSwapPublisher;
    case "XCD":
      if (!xcddSwapPublisher) {
        xcddSwapPublisher = new SwapPublisher(getCurrency("XCD"));
      }
      return xcddSwapPublisher;
    case "BBD":
      if (!bbddSwapPublisher) {
        bbddSwapPublisher = new SwapPublisher(getCurrency("BBD"));
      }
      return bbddSwapPublisher;
    case "JMD":
      if (!jmddSwapPublisher) {
        jmddSwapPublisher = new SwapPublisher(getCurrency("JMD"));
      }
      return jmddSwapPublisher;
    case "AWG":
      if (!awgdSwapPublisher) {
        awgdSwapPublisher = new SwapPublisher(getCurrency("AWG"));
      }
      return awgdSwapPublisher;
    case "DOP":
      if (!dopSwapPublisher) {
        dopSwapPublisher = new SwapPublisher(getCurrency("DOP"));
      }
      return dopSwapPublisher;
    case "BSD":
      if (!bsdSwapPublisher) {
        bsdSwapPublisher = new SwapPublisher(getCurrency("BSD"));
      }
      return bsdSwapPublisher;
    case "KYD":
      if (!kydSwapPublisher) {
        kydSwapPublisher = new SwapPublisher(getCurrency("KYD"));
      }
      return kydSwapPublisher;
    case "CUP":
      if (!cupSwapPublisher) {
        cupSwapPublisher = new SwapPublisher(getCurrency("CUP"));
      }
      return cupSwapPublisher;
    case "HTG":
      if (!htgSwapPublisher) {
        htgSwapPublisher = new SwapPublisher(getCurrency("HTG"));
      }
      return htgSwapPublisher;
    case "EUR":
      if (!eurSwapPublisher) {
        eurSwapPublisher = new SwapPublisher(getCurrency("EUR"));
      }
      return eurSwapPublisher;

    default:
      throw new Error(`unknown currency ${key}`);
  }
};
