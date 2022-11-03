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
    const contract_ = new SwapContract(this.swapAddress);
    return contract_.init();
  }
  vaultContract() {
    const contract_ = new VaultContract(this.vaultAddress);
    return contract_.init();
  }
  marketContract() {
    const contract_ = new MarketContract(this.swapMarketAddress);
    return contract_.init();
  }
  gStableContract() {
    const contract_ = new gStableContract(this.gStableAddress);
    return contract_.init();
  }
}

const CurrencyList = {
  TTDD: new Currency(
    "TTDD",
    "gTTD",
    "Trinidad & Tobago Dollar",
    ttddImg,
    "TX4hAg2DQXnPuuQHYuvTfnEH69c6vUe4fW" /*swapAddress */,
    "TQq9o4PahyoLociVzCnBMRRDdPZrNNkW1f" /*swapMarketAddress*/,
    "THJ6CYd8TyNzHFrdLTYQ1iAAZDrf5sEsZU" /*swapStableAddress*/,
    "TY72rJ9tjnQSxgsqUDuXPUh2oPWC7cRmY6" /*gStableAddress*/,
    "TR7Hby8oo6iEnwVh2WeTEfaBEAWXjeZXSJ" /*vaultAddress */
  ),
  // XCD: new Currency(
  //   "XCD",
  //   "gXCD",
  //   "East Caribbean Dollar",
  //   xcddImg,
  //   "TBRGNBkWVVXpVjGvmi7LhBhmj6rCvdCsgU",
  //   "TDLbLFD68VBqeTjsmneroJazrUSgSXf8f9",
  //   "THJ6CYd8TyNzHFrdLTYQ1iAAZDrf5sEsZU",
  //   "TXfUYdQeLZ6VtqTaEYQkRifbGZBXF9Xb71",
  //   "THwPd7EbZKvLbC52aZB795xZm2Jcr392iP"
  // ),
};

export const getCurrencies = () => {
  return Object.values(CurrencyList);
};

export const getCurrency = (currKey) => {
  return CurrencyList[currKey];
};
