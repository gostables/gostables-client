import gStableContract from "../contracts/gStableContract ";
import SwapUSDDFactory from "./swapUSDDFactory";
import VaultUSDDFactory from "./vaultUSDDFactory";
import MarketFactory from "./marketFactory";


import ttddImg from "../ttdd.png";
import xcddImg from "../gxcd.png";
import bbddImg from "../gbbd.png";
import jmddImg from "../gjmd.png";
import awgdImg from "../gawg.png";
import dopImg from "../gDOP.png";
import bsdImg from "../gbsd.png";
import kydImg from "../gKYD.png";
import cupImg from "../gcup.png";
import htgImg from "../gHTG.png";
import eurImg from "../gEUR.png";
import gbpImg from "../gGBP.png";

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
  // AWG: new Currency(
  //   5,
  //   "AWG",
  //   "gAWG",
  //   "Aruban Florin",
  //   awgdImg,
  //   "---" /*gStableAddress nile*/,
  //   "---" /*gStableAddress mainnet*/,
  // ),
  // BSD: new Currency(
  //   6,
  //   "BSD",
  //   "gBSD",
  //   "Bahamian Dollar",
  //   bsdImg,
  //   "---" /*gStableAddress nile*/,
  //   "---" /*gStableAddress mainnet*/,
  // ),
  // KYD: new Currency(
  //   7,
  //   "KYD",
  //   "gKYD",
  //   "Cayman Islands Dollar",
  //   kydImg,
  //   "---" /*gStableAddress nile*/,
  //   "---" /*gStableAddress mainnet*/,
  // ),
  // DOP: new Currency(
  //   8,
  //   "DOP",
  //   "gDOP",
  //   "Dominican Peso",
  //   dopImg,
  //   "---" /*gStableAddress nile*/,
  //   "---" /*gStableAddress mainnet*/,
  // ),
  // CUP: new Currency(
  //   9,
  //   "CUP",
  //   "gCUP",
  //   "Cuban Peso",
  //   cupImg,
  //   "---" /*gStableAddress nile*/,
  //   "---" /*gStableAddress mainnet*/,
  // ),
  // HTG: new Currency(
  //   10,
  //   "HTG",
  //   "gHTG",
  //   "Haitian Gourde",
  //   htgImg,
  //   "---" /*gStableAddress nile*/,
  //   "---" /*gStableAddress mainnet*/,
  // ),
  // EUR: new Currency(
  //   11,
  //   "EUR",
  //   "gEUR",
  //   "Euro",
  //   eurImg,
  //   "---" /*gStableAddress nile*/,
  //   "---" /*gStableAddress mainnet*/,
  // ),
  // GBP: new Currency(
  //   12,
  //   "GBP",
  //   "gGBP",
  //   "British Pound",
  //   gbpImg,
  //   "---" /*gStableAddress nile*/,
  //   "---" /*gStableAddress mainnet*/,
  // ),

};

export const getCurrencies = () => {
  return Object.values(CurrencyList);
};

export const getCurrency = (currKey) => {
  return CurrencyList[currKey];
};
