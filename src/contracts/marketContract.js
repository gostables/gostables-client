import { getCurrency } from "../utils/currencies";
import SmartContractBase from "./smartContractBase";

class MarketContract extends SmartContractBase {
  currency = null;
  constructor(_currency) {
    super(_currency.swapMarketAddress);
    this.currency = _currency;
  }
  init = async () => {
    try {
      if (!this.contract) {
        this.contract = await window.tronWeb.contract().at(this.address);
      }
      return this;
    } catch (error) {
      console.error(error);
    }
    return null;
  };

  getDetails = async () => {
    let swapDetails = {
      status: this.contract ? true : false,
      address: this.address,
    };
    return swapDetails;
  };
  // GET
  balanceOf = async (hodlerAddress) => {
    this.check();
    const balHex = await this.contract.balanceOf(hodlerAddress).call();
    const bal = this.web3.utils.fromWei(String(balHex), "ether");

    return bal;
  };

  getNameSymbol = async () => {
    this.check();
    const name = await this.contract.name().call();
    const symbol = await this.contract.symbol().call();

    return { name, symbol };
  };
  // GET end
}

const ttddMarket_ = new MarketContract(getCurrency("TTDD"));

export const ttddMarket = async () => await ttddMarket_.init();
