import gStableContract from "../contracts/gStableContract ";
import MarketContract from "../contracts/marketContract";
import SwapContract from "../contracts/swapContract";
import VaultContract from "../contracts/vaultContract";

import ttddImg from "../ttdd.png";
import xcddImg from "../gxcd.png";

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
  swapContract() {
    if (!this.swapContract_) {
      console.log("initializing SwapContract");
      const contract_ = new SwapContract(this.swapAddress);
      this.swapContract_ = contract_.init();
    }
    return this.swapContract_;
  }
  vaultContract() {
    if (!this.vaultContract_) {
      console.log("initializing VaultContract");
      const contract_ = new VaultContract(this.vaultAddress);
      this.vaultContract_ = contract_.init();
    }
    return this.vaultContract_;
  }
  marketContract() {
    if (!this.marketContract_) {
      console.log("initializing MarketContract");
      const contract_ = new MarketContract(this.swapMarketAddress);
      this.marketContract_ = contract_.init();
    }
    return this.marketContract_;
  }
  gStableContract() {
    if (!this.gStableContract_) {
      console.log("initializing gStableContract");
      const contract_ = new gStableContract(this.gStableAddress);
      this.gStableContract_ = contract_.init();
    }
    return this.gStableContract_;
  }
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
};

export const getCurrencies = () => {
  return Object.values(CurrencyList);
};

export const getCurrency = (currKey) => {
  return CurrencyList[currKey];
};
