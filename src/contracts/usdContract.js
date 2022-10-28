import { StableCoinType } from "../utils/stableCoins";
import Web3 from "web3";
import { USDDAddress, USDJAddress } from "./address";

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
      feeLimit: 100_000_000,
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

  approve = async (spender, amount) => {
    this.check();
    if (!spender) throw new Error(`Spender : ${spender}`);
    if (amount < 0) throw new Error(`Amount : ${amount}`);
    let success = await this.contract
      .approve(spender, this.web3.utils.toWei(String(amount), "ether"))
      .send({
        feeLimit: 100_000_000,
        callValue: 0,
        shouldPollResponse: false,
      });
  };
}

const usddContract_ = new USDContract(USDDAddress, StableCoinType.USDD);

export const usddContract = async () => await usddContract_.init();

const usdjContract_ = new USDContract(USDJAddress, StableCoinType.USDJ);

export const usdjContract = async () => await usdjContract_.init();