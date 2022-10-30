import { getCurrency } from "../utils/currencies";
import SmartContractBase from "./smartContractBase";

class gStableContract extends SmartContractBase {
  currency = null;
  constructor(_currency) {
    super(_currency.gStableAddress);
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
      clients: await this.getClients(),
    };
    return swapDetails;
  };
  // GET
  getNameSymbol = async () => {
    this.check();
    const name = await this.contract.name().call();
    const symbol = await this.contract.symbol().call();

    return { name, symbol };
  };
  getBalanceOf = async (address) => {
    this.check();
    let c = await this.contract.balanceOf(address).call();
    return String(c);
  };
  getClients = async () => {
    this.check();
    let c = await this.contract.getClients().call();
    return c;
  };
  // GET end
  // SET
  setClient = async (address) => {
    this.check();
    if (!address) throw new Error(`address : ${address}`);

    await this.contract.setClient(address).send({
      feeLimit: 100_000_000,
      callValue: 0,
      shouldPollResponse: false,
    });
  };
  removeClient = async (index) => {
    this.check();
    if (!index) throw new Error(`index : ${index}`);

    await this.contract.removeClient(index).send({
      feeLimit: 100_000_000,
      callValue: 0,
      shouldPollResponse: false,
    });
  };
  //SET end
  balanceOf = async (hodlerAddress) => {
    this.check();
    const balHex = await this.contract.balanceOf(hodlerAddress).call();
    const bal = this.web3.utils.fromWei(String(balHex), "ether");

    return bal;
  };
}

const ttdd_ = new gStableContract(getCurrency("TTDD"));

export const ttdd = async () => await ttdd_.init();
