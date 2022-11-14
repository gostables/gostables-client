import gStableContract from "../contracts/gStableContract ";
import MarketContract from "../contracts/marketContract";
import SwapContract from "../contracts/swapContract";
import VaultContract from "../contracts/vaultContract";

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

class Currency {
  key = null;
  label = null;
  text = null;
  icon = null;
  swapAddress = null;
  swapMarketAddress = null;
  swapStableAddress = null;
  gStableAddress = null;
  vaultAddress = null;
  swapContract_ = null;
  vaultContract_ = null;
  marketContract_ = null;
  gStableContract_ = null;
  constructor(
    _key,
    _label,
    _text,
    _icon,
    _swapAddress,
    _swapMarketAddress,
    _swapStableAddress,
    _gStableAddress,
    _vaultAddress
  ) {
    this.key = _key;
    this.label = _label;
    this.text = _text;
    this.icon = _icon;
    this.swapAddress = _swapAddress;
    this.swapMarketAddress = _swapMarketAddress;
    this.swapStableAddress = _swapStableAddress;
    this.gStableAddress = _gStableAddress;
    this.vaultAddress = _vaultAddress;
  }
  swapContract = async () => {
    if (!this.swapContract_) {
      console.log("initializing SwapContract");
      const contract_ = new SwapContract(this.swapAddress);
      this.swapContract_ = await contract_.init();
    }
    return this.swapContract_;
  };
  vaultContract = async () => {
    if (!this.vaultContract_) {
      console.log("initializing VaultContract");
      const contract_ = new VaultContract(this.vaultAddress);
      this.vaultContract_ = await contract_.init();
    }
    return this.vaultContract_;
  };
  marketContract = async () => {
    if (!this.marketContract_) {
      console.log("initializing MarketContract");
      const contract_ = new MarketContract(this.swapMarketAddress);
      this.marketContract_ = await contract_.init();
    }
    return this.marketContract_;
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
    "TTDD",
    "gTTD",
    "Trinidad & Tobago Dollar",
    ttddImg,
    "TTRfHS3zCQKDDPQVPPebmAXq8BtxnqRRfZ" /*swapAddress */,
    "TQq9o4PahyoLociVzCnBMRRDdPZrNNkW1f" /*swapMarketAddress*/,
    "THJ6CYd8TyNzHFrdLTYQ1iAAZDrf5sEsZU" /*swapStableAddress*/,
    "TY72rJ9tjnQSxgsqUDuXPUh2oPWC7cRmY6" /*gStableAddress*/,
    "TFq1VGyhbMxPc85FtZ5x2QNZqBVsYX1DPL" /*vaultAddress */
  ),
  XCD: new Currency(
    "XCD",
    "gXCD",
    "East Caribbean Dollar",
    xcddImg,
    "TJCfkDjutgARxZyh5NQ39yY8GBqWmWYjtJ" /*swapAddress */,
    "TQq9o4PahyoLociVzCnBMRRDdPZrNNkW1f" /*swapMarketAddress*/,
    "THJ6CYd8TyNzHFrdLTYQ1iAAZDrf5sEsZU" /*swapStableAddress*/,
    "TNpsUntsPFwUEkRJN3CVVPVnif1v8RcL9B" /*gStableAddress*/,
    "TTuig6rx6u7uB72oVQ4U9sB76HVVTALhFD" /*vaultAddress */
  ),
  BBD: new Currency(
    "BBD",
    "gBBD",
    "Barbadian Dollar",
    bbddImg,
    "TGwoDsbkaPdthjUd9KGbzVLMDTD5RjzkhK" /*swapAddress */,
    "TQq9o4PahyoLociVzCnBMRRDdPZrNNkW1f" /*swapMarketAddress*/,
    "THJ6CYd8TyNzHFrdLTYQ1iAAZDrf5sEsZU" /*swapStableAddress*/,
    "TWXi48ddESfk6wFjNXK4XwW1yvRMPSSnSB" /*gStableAddress*/,
    "THr8iVE5Yqa4Xwpn3chLx5sghM4x47PYmB" /*vaultAddress */
  ),
  JMD: new Currency(
    "JMD",
    "gJMD",
    "Jamaican Dollar",
    jmddImg,
    "TDZxD5w62c7yWpjagiRMgK77J9a7iB4kgy" /*swapAddress */,
    "TQq9o4PahyoLociVzCnBMRRDdPZrNNkW1f" /*swapMarketAddress*/,
    "THJ6CYd8TyNzHFrdLTYQ1iAAZDrf5sEsZU" /*swapStableAddress*/,
    "THVTLRiwWTUUeYMz1nSxdb1BVbUWmEzy3c" /*gStableAddress*/,
    "TKH5keuvdekoXjMigHELygw2nnJY96qMuq" /*vaultAddress */
  ),
  AWG: new Currency(
    "AWG",
    "gAWG",
    "Aruban Florin",
    awgdImg,
    "TWQ3q3KWDeLHT3Tey9xmvJbbK7R4Y89fV7" /*swapAddress */,
    "TQq9o4PahyoLociVzCnBMRRDdPZrNNkW1f" /*swapMarketAddress*/,
    "THJ6CYd8TyNzHFrdLTYQ1iAAZDrf5sEsZU" /*swapStableAddress*/,
    "TP7RNcfoSkmTSA5ZSdKeXfUnBb1KoU51VY" /*gStableAddress*/,
    "TAVcMmTrqq7HcLSoqXHNyzwKJgcpRivSD1" /*vaultAddress */
  ),
  BSD: new Currency(
    "BSD",
    "gBSD",
    "Bahamian Dollar",
    bsdImg,
    "TESpEbXgVVnPKM4a1PJF9QUMLTwt7FrHTW" /*swapAddress */,
    "TQq9o4PahyoLociVzCnBMRRDdPZrNNkW1f" /*swapMarketAddress*/,
    "THJ6CYd8TyNzHFrdLTYQ1iAAZDrf5sEsZU" /*swapStableAddress*/,
    "TRN9LBmG1N3Vue1eidkn1s3bBFyAAabyC9" /*gStableAddress*/,
    "TLmCeSuLSMY8Zmac7Q9K9jzC2A5ap3TKVY" /*vaultAddress */
  ),
  KYD: new Currency(
    "KYD",
    "gKYD",
    "Cayman Islands Dollar",
    kydImg,
    "TW1BXwd5bfHf9J1CxC3an772RyjEgS4ccD" /*swapAddress */,
    "TQq9o4PahyoLociVzCnBMRRDdPZrNNkW1f" /*swapMarketAddress*/,
    "THJ6CYd8TyNzHFrdLTYQ1iAAZDrf5sEsZU" /*swapStableAddress*/,
    "TRpvxootqXTB5omn919BGFEiiAqBjGPqzt" /*gStableAddress*/,
    "TX7NBRRe3HHmVBfJfbAGny33pPa8vLxj5f" /*vaultAddress */
  ),
  CUP: new Currency(
    "CUP",
    "gCUP",
    "Cuban Peso",
    cupImg,
    "TAPaFRa6n2BT1Mx6CFPob2kzW6pTyV85me" /*swapAddress */,
    "TQq9o4PahyoLociVzCnBMRRDdPZrNNkW1f" /*swapMarketAddress*/,
    "THJ6CYd8TyNzHFrdLTYQ1iAAZDrf5sEsZU" /*swapStableAddress*/,
    "TNsZegdPzUWKbBQ52o7ruF5gGe5NqyALCQ" /*gStableAddress*/,
    "TNH55PkTJcB9f8T4HCqaSKE5p5Qx8Ugjh3" /*vaultAddress */
  ),
  // HTG: new Currency(
  //   "HTG",
  //   "gHTG",
  //   "Haitian Gourde",
  //   htgImg,
  //   "TXZ9jNtBExXsq7RRLiACVKGtTcUGWNDjJH" /*swapAddress */,
  //   "TQq9o4PahyoLociVzCnBMRRDdPZrNNkW1f" /*swapMarketAddress*/,
  //   "THJ6CYd8TyNzHFrdLTYQ1iAAZDrf5sEsZU" /*swapStableAddress*/,
  //   "TMuABgZr5rStDa639CKaxEoNc1sVEgEoKF" /*gStableAddress*/,
  //   "TRmsA2ovjuqDVM3g7E4TEm4GCgtpenj6Ey" /*vaultAddress */
  // ),
  EUR: new Currency(
    "EUR",
    "gEUR",
    "Euro",
    eurImg,
    "TLzWvtcfuJvQmVs2K21bypnGq63KDGzRr3" /*swapAddress */,
    "TQq9o4PahyoLociVzCnBMRRDdPZrNNkW1f" /*swapMarketAddress*/,
    "THJ6CYd8TyNzHFrdLTYQ1iAAZDrf5sEsZU" /*swapStableAddress*/,
    "TBWqK2pQXxRxmei95Xo6hA35YNzkdGuynR" /*gStableAddress*/,
    "THto1DfPgubEYybMxRsgzoMTZFoAvketCp" /*vaultAddress */
  ),
  DOP: new Currency(
    "DOP",
    "gDOP",
    "Dominican Peso",
    dopImg,
    "TGamR9tdqeNmmU9EWkxRooPndTYjUCTbcc" /*swapAddress */,
    "TQq9o4PahyoLociVzCnBMRRDdPZrNNkW1f" /*swapMarketAddress*/,
    "THJ6CYd8TyNzHFrdLTYQ1iAAZDrf5sEsZU" /*swapStableAddress*/,
    "TQkp7SKM6UEYNJmQQfC7YeYYUdsnkq9Xb5" /*gStableAddress*/,
    "TUxGrkSicXdDhMssg1MXqnZ8rKNfS9bcN1" /*vaultAddress */
  ),
};

export const getCurrencies = () => {
  return Object.values(CurrencyList);
};

export const getCurrency = (currKey) => {
  return CurrencyList[currKey];
};
