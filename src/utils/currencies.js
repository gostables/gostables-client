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
    // "TEhTXahLuKVgnBX1yWVmLaykLGeEZ8yq9K" /*gStableAddress nile*/,
    "TTyTrwsnsi5Fr6YjhPsqc3cbTLqPALTe4U" /*gStableAddress mainnet*/,
  ),
  XCD: new Currency(
    2,
    "XCD",
    "gXCD",
    "Eastern Caribbean Dollar",
    xcddImg,
    // "TMqjGVksF4RLN67YugsUbbNHiZejzsSWq6" /*gStableAddress nile*/,
    "TBovdWbXNQEhERaRTB7MdY2h1Ykchji1Xw" /*gStableAddress mainnet*/,
  ),
  BBD: new Currency(
    3,
    "BBD",
    "gBBD",
    "Barbadian Dollar",
    bbddImg,
  //   // "TNpqgkKcaKa7vZH5GC4nxSL6FMjMfdCRSn" /*gStableAddress nile*/,
    "TGsz1q1ryn5DLZngM2xxek3jN1X53qW7vZ" /*gStableAddress mainnet*/,
  ),
  JMD: new Currency(
    4,
    "JMD",
    "gJMD",
    "Jamaican Dollar",
    jmddImg,
  //   // "TBeTCPQFXjgVk1xKpFw5b24MsgCkvLdBnk" /*gStableAddress nile*/,
    "TPoyDSNF7F2h5ZTRh25ypXvtn5hJfjaZ2K" /*gStableAddress mainnet*/,
  ),
  AWG: new Currency(
    5,
    "AWG",
    "gAWG",
    "Aruban Florin",
    awgdImg,
    // "TQT5dFRmWCR2mJNpSrypVUfq4Rar4WSe8Y" /*gStableAddress nile*/,
    "TJ1wyr39g79qStW8GhCkexz3DHXs4DcBCq" /*gStableAddress mainnet*/,
  ),
  BSD: new Currency(
    6,
    "BSD",
    "gBSD",
    "Bahamian Dollar",
    bsdImg,
    // "TTQTdMtxiastmhKU8CkgWomYzwhBEfnNuX" /*gStableAddress nile*/,
    "THo47joX34Ms3TAFNdpnovno6a7JsP4x9A" /*gStableAddress mainnet*/,
  ),
  KYD: new Currency(
    7,
    "KYD",
    "gKYD",
    "Cayman Islands Dollar",
    kydImg,
    // "TTWSqDo9g5K86G5xQVLhBEzWwgy8tgURHQ" /*gStableAddress nile*/,
    "TVP6k4U37d2W9r86fVKV4N4fTgiCJVLMfg" /*gStableAddress mainnet*/,
  ),
  DOP: new Currency(
    8,
    "DOP",
    "gDOP",
    "Dominican Peso",
    dopImg,
    // "TUpoXcrgPMMzvvzGdbtWwzcdU39D27ab8w" /*gStableAddress nile*/,
    "TAa3RAnMh2ppJdczHsVrdRcvD9bELXS5Pj" /*gStableAddress mainnet*/,
  ),
  CUP: new Currency(
    9,
    "CUP",
    "gCUP",
    "Cuban Peso",
    cupImg,
    // "TUMPPfnX5jnKvJbh8CtDAeUKTUXSv9Bhkx" /*gStableAddress nile*/,
    "TTmfn4Bpkr3wn3nWJEvotWAwpFK32CXZjQ" /*gStableAddress mainnet*/,
  ),
  HTG: new Currency(
    10,
    "HTG",
    "gHTG",
    "Haitian Gourde",
    htgImg,
    // "THyUafLhw1w4bJzSvH2BDGA4ph5iRaqeyV" /*gStableAddress nile*/,
    "TEANt8Qu1GWvDdGt2NhJyANk1HacZyJRHy" /*gStableAddress mainnet*/,
  ),
  EUR: new Currency(
    11,
    "EUR",
    "gEUR",
    "Euro",
    eurImg,
    // "TNLtM7F696Qjcc7Lj5krBqCAoXNzS2enQH" /*gStableAddress nile*/,
    "TM1E5cCVYziLpLqRt1tjJDHdQP27AWYCjc" /*gStableAddress mainnet*/,
  ),
  GBP: new Currency(
    12,
    "GBP",
    "gGBP",
    "British Pound",
    gbpImg,
    // "TVnCkaJUjrek5H2xcVq9azLMVBLiyUAnvx" /*gStableAddress nile*/,
    "TXSGoiEfkA8uovrrXqNUZiZ6RwbjC8o15q" /*gStableAddress mainnet*/,
  ),

};

export const getCurrencies = () => {
  return Object.values(CurrencyList);
};

export const getCurrency = (currKey) => {
  return CurrencyList[currKey];
};
