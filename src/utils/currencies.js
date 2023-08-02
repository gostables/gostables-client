import gStableContract from "../contracts/gStableContract ";
import SwapUSDDFactory from "./swapUSDDFactory";
import VaultUSDDFactory from "./vaultUSDDFactory";
import MarketFactory from "./marketFactory";


import ttddImg from "../img/ttdd.png";
import xcddImg from "../img/gxcd.png";
import bbddImg from "../img/gbbd.png";
import jmddImg from "../img/gjmd.png";
import awgdImg from "../img/gawg.png";
import dopImg from "../img/gDOP.png";
import bsdImg from "../img/gbsd.png";
import kydImg from "../img/gKYD.png";
import cupImg from "../img/gcup.png";
import htgImg from "../img/gHTG.png";
import eurImg from "../img/gEUR.png";
import gbpImg from "../img/gGBP.png";

class Currency {
  id = 0;
  key = null;
  label = null;
  text = null;
  icon = null;
  gStableAddress = null;
  gStableContract_ = null;
  constructor(
    _id,
    _key,
    _label,
    _text,
    _icon,
    _gStableAddress,
  ) {
    this.id = _id;
    this.key = _key;
    this.label = _label;
    this.text = _text;
    this.icon = _icon;
    this.gStableAddress = _gStableAddress;
  }
  swapContract = async () => {
    return SwapUSDDFactory.getSwapUSDD();
  };
  vaultContract = async () => {
    return VaultUSDDFactory.getVaultUSDD();
  };
  marketContract = async () => {
    return MarketFactory.getMarket()
  };
  gStableContract = async () => {
    if (!this.gStableContract_) {
      console.log("initializing gStableContract");
      const contract_ = new gStableContract(this.gStableAddress);
      this.gStableContract_ = await contract_.init();
    }
    return this.gStableContract_;
  };
}

const CurrencyList = {
  TTD: new Currency(
    1,
    "TTD",
    "gTTD",
    "Trinidad & Tobago Dollar",
    ttddImg,
    "TLEfS9LbpyTmsSgsSEJzNzT9w33P1wzQ69" /*gStableAddress mainnet*/,
  ),
  XCD: new Currency(
    2,
    "XCD",
    "gXCD",
    "Eastern Caribbean Dollar",
    xcddImg,
    "TUid6kcrJ9Jg8S5nQKNA2ppVd8wGP4bpqT" /*gStableAddress mainnet*/,
  ),
  // BBD: new Currency(
  //   3,
  //   "BBD",
  //   "gBBD",
  //   "Barbadian Dollar",
  //   bbddImg,
  //   "TGsz1q1ryn5DLZngM2xxek3jN1X53qW7vZ" /*gStableAddress mainnet*/,
  // ),
  // JMD: new Currency(
  //   4,
  //   "JMD",
  //   "gJMD",
  //   "Jamaican Dollar",
  //   jmddImg,
  //   "TPoyDSNF7F2h5ZTRh25ypXvtn5hJfjaZ2K" /*gStableAddress mainnet*/,
  // ),
  // AWG: new Currency(
  //   5,
  //   "AWG",
  //   "gAWG",
  //   "Aruban Florin",
  //   awgdImg,
  //   "TJ1wyr39g79qStW8GhCkexz3DHXs4DcBCq" /*gStableAddress mainnet*/,
  // ),
  // BSD: new Currency(
  //   6,
  //   "BSD",
  //   "gBSD",
  //   "Bahamian Dollar",
  //   bsdImg,
  //   "THo47joX34Ms3TAFNdpnovno6a7JsP4x9A" /*gStableAddress mainnet*/,
  // ),
  // KYD: new Currency(
  //   7,
  //   "KYD",
  //   "gKYD",
  //   "Cayman Islands Dollar",
  //   kydImg,
  //   "TVP6k4U37d2W9r86fVKV4N4fTgiCJVLMfg" /*gStableAddress mainnet*/,
  // ),
  // DOP: new Currency(
  //   8,
  //   "DOP",
  //   "gDOP",
  //   "Dominican Peso",
  //   dopImg,
  //   "TAa3RAnMh2ppJdczHsVrdRcvD9bELXS5Pj" /*gStableAddress mainnet*/,
  // ),
  // CUP: new Currency(
  //   9,
  //   "CUP",
  //   "gCUP",
  //   "Cuban Peso",
  //   cupImg,
  //   "TTmfn4Bpkr3wn3nWJEvotWAwpFK32CXZjQ" /*gStableAddress mainnet*/,
  // ),
  // HTG: new Currency(
  //   10,
  //   "HTG",
  //   "gHTG",
  //   "Haitian Gourde",
  //   htgImg,
  //   "TEANt8Qu1GWvDdGt2NhJyANk1HacZyJRHy" /*gStableAddress mainnet*/,
  // ),
  // EUR: new Currency(
  //   11,
  //   "EUR",
  //   "gEUR",
  //   "Euro",
  //   eurImg,
  //   "TM1E5cCVYziLpLqRt1tjJDHdQP27AWYCjc" /*gStableAddress mainnet*/,
  // ),
  // GBP: new Currency(
  //   12,
  //   "GBP",
  //   "gGBP",
  //   "British Pound",
  //   gbpImg,
  //   "TXSGoiEfkA8uovrrXqNUZiZ6RwbjC8o15q" /*gStableAddress mainnet*/,
  // ),

};

export const getCurrencies = () => {
  return Object.values(CurrencyList);
};

export const getCurrency = (currKey) => {
  return CurrencyList[currKey];
};
