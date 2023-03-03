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
  TTDD: new Currency(
    1,
    "TTDD",
    "gTTD",
    "Trinidad & Tobago Dollar",
    ttddImg,
    "TJp1ypHrEf78KTHJJWR9EeK46dYyvZwcvb" /*gStableAddress*/,
  ),
  XCD: new Currency(
    2,
    "XCD",
    "gXCD",
    "Eastern Caribbean Dollar",
    xcddImg,
    "TXpBBZFqEkwa8pYsJdS6nz9Uucuao2WBbq" /*gStableAddress*/,
  ),
  // BBD: new Currency(
  //   3,
  //   "BBD",
  //   "gBBD",
  //   "Barbadian Dollar",
  //   bbddImg,
  //   "TQKJkghADgVpb5KgRYu5MXAdZg2SgqW3iU" /*swapAddress */,
  //   "TQq9o4PahyoLociVzCnBMRRDdPZrNNkW1f" /*swapMarketAddress*/,
  //   "THJ6CYd8TyNzHFrdLTYQ1iAAZDrf5sEsZU" /*swapStableAddress*/,
  //   "TWXi48ddESfk6wFjNXK4XwW1yvRMPSSnSB" /*gStableAddress*/,
  //   "THr8iVE5Yqa4Xwpn3chLx5sghM4x47PYmB" /*vaultAddress */
  // ),
  // JMD: new Currency(
  //   4,
  //   "JMD",
  //   "gJMD",
  //   "Jamaican Dollar",
  //   jmddImg,
  //   "TQKJkghADgVpb5KgRYu5MXAdZg2SgqW3iU" /*swapAddress */,
  //   "TQq9o4PahyoLociVzCnBMRRDdPZrNNkW1f" /*swapMarketAddress*/,
  //   "THJ6CYd8TyNzHFrdLTYQ1iAAZDrf5sEsZU" /*swapStableAddress*/,
  //   "THVTLRiwWTUUeYMz1nSxdb1BVbUWmEzy3c" /*gStableAddress*/,
  //   "TKH5keuvdekoXjMigHELygw2nnJY96qMuq" /*vaultAddress */
  // ),
  // AWG: new Currency(
  //   5,
  //   "AWG",
  //   "gAWG",
  //   "Aruban Florin",
  //   awgdImg,
  //   "TQKJkghADgVpb5KgRYu5MXAdZg2SgqW3iU" /*swapAddress */,
  //   "TQq9o4PahyoLociVzCnBMRRDdPZrNNkW1f" /*swapMarketAddress*/,
  //   "THJ6CYd8TyNzHFrdLTYQ1iAAZDrf5sEsZU" /*swapStableAddress*/,
  //   "TP7RNcfoSkmTSA5ZSdKeXfUnBb1KoU51VY" /*gStableAddress*/,
  //   "TAVcMmTrqq7HcLSoqXHNyzwKJgcpRivSD1" /*vaultAddress */
  // ),
  // BSD: new Currency(
  //   6,
  //   "BSD",
  //   "gBSD",
  //   "Bahamian Dollar",
  //   bsdImg,
  //   "TQKJkghADgVpb5KgRYu5MXAdZg2SgqW3iU" /*swapAddress */,
  //   "TQq9o4PahyoLociVzCnBMRRDdPZrNNkW1f" /*swapMarketAddress*/,
  //   "THJ6CYd8TyNzHFrdLTYQ1iAAZDrf5sEsZU" /*swapStableAddress*/,
  //   "TRN9LBmG1N3Vue1eidkn1s3bBFyAAabyC9" /*gStableAddress*/,
  //   "TLmCeSuLSMY8Zmac7Q9K9jzC2A5ap3TKVY" /*vaultAddress */
  // ),
  // KYD: new Currency(
  //   7,
  //   "KYD",
  //   "gKYD",
  //   "Cayman Islands Dollar",
  //   kydImg,
  //   "TQKJkghADgVpb5KgRYu5MXAdZg2SgqW3iU" /*swapAddress */,
  //   "TQq9o4PahyoLociVzCnBMRRDdPZrNNkW1f" /*swapMarketAddress*/,
  //   "THJ6CYd8TyNzHFrdLTYQ1iAAZDrf5sEsZU" /*swapStableAddress*/,
  //   "TRpvxootqXTB5omn919BGFEiiAqBjGPqzt" /*gStableAddress*/,
  //   "TX7NBRRe3HHmVBfJfbAGny33pPa8vLxj5f" /*vaultAddress */
  // ),
  // DOP: new Currency(
  //   8,
  //   "DOP",
  //   "gDOP",
  //   "Dominican Peso",
  //   dopImg,
  //   "TQKJkghADgVpb5KgRYu5MXAdZg2SgqW3iU" /*swapAddress */,
  //   "TQq9o4PahyoLociVzCnBMRRDdPZrNNkW1f" /*swapMarketAddress*/,
  //   "THJ6CYd8TyNzHFrdLTYQ1iAAZDrf5sEsZU" /*swapStableAddress*/,
  //   "TQkp7SKM6UEYNJmQQfC7YeYYUdsnkq9Xb5" /*gStableAddress*/,
  //   "TUxGrkSicXdDhMssg1MXqnZ8rKNfS9bcN1" /*vaultAddress */
  // ),
  // CUP: new Currency(
  //   9,
  //   "CUP",
  //   "gCUP",
  //   "Cuban Peso",
  //   cupImg,
  //   "TQKJkghADgVpb5KgRYu5MXAdZg2SgqW3iU" /*swapAddress */,
  //   "TQq9o4PahyoLociVzCnBMRRDdPZrNNkW1f" /*swapMarketAddress*/,
  //   "THJ6CYd8TyNzHFrdLTYQ1iAAZDrf5sEsZU" /*swapStableAddress*/,
  //   "TNsZegdPzUWKbBQ52o7ruF5gGe5NqyALCQ" /*gStableAddress*/,
  //   "TNH55PkTJcB9f8T4HCqaSKE5p5Qx8Ugjh3" /*vaultAddress */
  // ),
  // HTG: new Currency(
  //   10,
  //   "HTG",
  //   "gHTG",
  //   "Haitian Gourde",
  //   htgImg,
  //   "TQKJkghADgVpb5KgRYu5MXAdZg2SgqW3iU" /*swapAddress */,
  //   "TQq9o4PahyoLociVzCnBMRRDdPZrNNkW1f" /*swapMarketAddress*/,
  //   "THJ6CYd8TyNzHFrdLTYQ1iAAZDrf5sEsZU" /*swapStableAddress*/,
  //   "TMuABgZr5rStDa639CKaxEoNc1sVEgEoKF" /*gStableAddress*/,
  //   "TRmsA2ovjuqDVM3g7E4TEm4GCgtpenj6Ey" /*vaultAddress */
  // ),
  // EUR: new Currency(
  //   11,
  //   "EUR",
  //   "gEUR",
  //   "Euro",
  //   eurImg,
  //   "TQKJkghADgVpb5KgRYu5MXAdZg2SgqW3iU" /*swapAddress */,
  //   "TQq9o4PahyoLociVzCnBMRRDdPZrNNkW1f" /*swapMarketAddress*/,
  //   "THJ6CYd8TyNzHFrdLTYQ1iAAZDrf5sEsZU" /*swapStableAddress*/,
  //   "TBWqK2pQXxRxmei95Xo6hA35YNzkdGuynR" /*gStableAddress*/,
  //   "THto1DfPgubEYybMxRsgzoMTZFoAvketCp" /*vaultAddress */
  // ),
  // GBP: new Currency(
  //   12,
  //   "GBP",
  //   "gGBP",
  //   "British Pound",
  //   gbpImg,
  //   "TQKJkghADgVpb5KgRYu5MXAdZg2SgqW3iU" /*swapAddress */,
  //   "TQq9o4PahyoLociVzCnBMRRDdPZrNNkW1f" /*swapMarketAddress*/,
  //   "THJ6CYd8TyNzHFrdLTYQ1iAAZDrf5sEsZU" /*swapStableAddress*/,
  //   "TJBhh6JPtBoDWPQqdRXzR27SEJooBvfJ7r" /*gStableAddress*/,
  //   "THEqDCTFEXtr9rdAtSVKbiHzhZLbnaCgTK" /*vaultAddress */
  // ),

};

export const getCurrencies = () => {
  return Object.values(CurrencyList);
};

export const getCurrency = (currKey) => {
  return CurrencyList[currKey];
};
