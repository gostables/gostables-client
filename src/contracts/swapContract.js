import { gStableManagerContract } from "./gStableManagerContract";
import SmartContractBase from "./smartContractBase";

class SwapContract extends SmartContractBase {
  gStableManagerContract_;
  init = async () => {
    try {
      if (!this.contract) {
        this.contract = await window.tronWeb.contract().at(this.address);
        this.gStableManagerContract_ = await gStableManagerContract();
      }
      return this;
    } catch (error) {
      console.error(error);
    }
    return null;
  };

  getConversion = async (currencyId) => {
    this.check();
    if(!this.gStableManagerContract_){
      this.gStableManagerContract_ = await gStableManagerContract();
    }
    let cr = await this.gStableManagerContract_.getConversion(currencyId);
    return String(cr) / 10000;
  };

  getSwapFeesFactor = async (currencyId) => {
    this.check();
    let c = await this.contract.gStableSwapFeesFactorMap(currencyId).call();
    return c / 10000;
  };
  getRewardsPercent = async () => {
    this.check();
    let c = await this.contract.rewardPC().call();
    return String(c);
  };


  deposit = async (currencyId, _val) => {
    this.check();
    if (!_val) throw new Error(`Number : ${_val}`);

    console.log("deposit", this.web3.utils.toWei(String(_val), "ether"));
    let result = null;
    try {
      result = await this.contract
        .deposit(
          currencyId,
          this.web3.utils.toWei(String(_val), "ether")
        )
        .send({
          feeLimit: 200_000_000,
          callValue: 0,
          shouldPollResponse: false,
        });
    } catch (error) {
      console.error(error);
    }
    return result;
  };

  withdraw = async (currencyId, _val) => {
    this.check();
    if (!_val) throw new Error(`Number : ${_val}`);

    console.log("withdraw", this.web3.utils.toWei(String(_val), "ether"));
    let result = null;
    try {
      result = await this.contract
        .withdraw(currencyId, this.web3.utils.toWei(String(_val), "ether"))
        .send({
          feeLimit: 200_000_000,
          callValue: 0,
          shouldPollResponse: false,
        });
    } catch (error) {
      console.error("withdrawError", error);
    }
    return result;
  };
}

export default SwapContract;
