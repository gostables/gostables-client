import { StableCoinType, USDDAddress } from "../utils/stableCoins";
import Web3 from "web3";

class USDContract {
  address;
  stableCoinType;
  contract = null;
  web3 = null;
  constructor(_address, _stableCoinType) {
    this.address = _address;
    this.stableCoinType = _stableCoinType;
    this.web3 = new Web3();
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
  };
  check = () => {
    if (!this.contract)
      throw new Error(`contract at ${this.address} not initialized`);
  };
  mint = async (num) => {
    this.check();
    if (!num) throw new Error(`Number : ${num}`);

    await this.contract.mint(this.web3.utils.toWei(String(num), "ether")).send({
      feeLimit: 200_000_000,
      callValue: 0,
      shouldPollResponse: false,
    });
  };

  balanceOf = async (hodlerAddress) => {
    this.check();
    const balHex = await this.contract.balanceOf(hodlerAddress).call();
    const bal = this.web3.utils.fromWei(String(balHex), "ether");

    return bal;
  };

  getNameSymbol = async () => {
    this.check();
    const name = await this.contract.name().call();

    return name;
  };

  approve = async (spender, amount) => {
    this.check();
    if (!spender) throw new Error(`Spender : ${spender}`);
    if (amount < 0) throw new Error(`Amount : ${amount}`);
    await this.contract
      .approve(spender, this.web3.utils.toWei(String(amount), "ether"))
      .send({
        feeLimit: 200_000_000,
        callValue: 0,
        shouldPollResponse: false,
      });
  };
}

const usddContract_ = new USDContract(USDDAddress, StableCoinType.USDD);

let usddContractInitialized = null;

export const usddContract = async () => {
  if (!usddContractInitialized) {
    console.log("initializing USDD contract");
    usddContractInitialized = await usddContract_.init();
  }
  return usddContractInitialized;
};
