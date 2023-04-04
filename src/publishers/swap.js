import { gStableManagerContract } from "../contracts/gStableManagerContract";

export let swapDetails = {
  conversionRatio: "",
  swapFeesFactor: 0,
};

class SwapPublisher {
  currency = null;
  observers = [];
  swapDetails = swapDetails;
  timer = null;
  constructor() {}

  setCurrency = (_currency) => {
    this.currency = _currency;
    try {
      clearInterval(this.timer);
      this.init();
    } catch (error) {
      console.error(error);
    }
  }

  init = async () => {
    // Continuous polling as per https://github.com/ibnzUK/Tron-Wallet-React-Integration/blob/main/src/App.js
    this.timer = setInterval(async () => {

      console.log("swap Publisher updating : ", this.currency.key);
      let swapContract = await this.currency.swapContract();
      try {
        if(this.currency == null){
          throw new Error("Currency not set in SwapPublisher")
        }
        let gStableManagerContract_ = await gStableManagerContract();
        let cr = await gStableManagerContract_.getConversion(this.currency.id);
        this.swapDetails.conversionRatio = String(cr) / 10000;
        console.log(
          "swap Publisher conversionRatio updating : ",
          this.currency.key,
          this.swapDetails.conversionRatio
        );
      } catch (error) {
        console.error(error);
      }
      try {
        if(this.currency == null){
          throw new Error("Currency not set in SwapPublisher")
        }
        this.swapDetails.swapFeesFactor =
          await swapContract.getSwapFeesFactor(this.currency.id);
      } catch (error) {
        console.error(error);
      }
      this.notify();
    }, 10 * 1000);
  };

  attach = (observer) => {
    this.observers.push(observer);
  };

  detach = (observer) => {
    this.observers = this.observers.filter((observed) => observed !== observer);
  };

  notify = () => {
    this.observers.forEach((observer) => observer(this.swapDetails));
  };
}

export default SwapPublisher;
