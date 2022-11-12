import { usddContract } from "../contracts/usdContract";

export let swapDetails = {
  status: false,
  address: "",
  conversion: "",
  stableCoinAddress: "",
  accumulatedSwapFees: 0,
  swapFeesFactor: 0,
  marketAddress: "",
};

class SwapPublisher {
  currency = null;
  observers = [];
  swapDetails = swapDetails;
  usdd = null;
  timer = null;
  constructor(_currency) {
    this.currency = _currency;
    try {
      this.init();
    } catch (error) {
      console.error(error);
    }
  }

  init = async () => {
    try {
      this.usdd = await usddContract();
      try {
        let swapContract = await this.currency.swapContract();

        //dynamic read from smart contract
        // this.swapDetails.stableCoinAddress =
        //   await swapContract.getStableCoinAddress();
        // this.swapDetails.marketAddress = await swapContract.getMarketAddress();

        // static read from currency "config" - see currencies.js
        this.swapDetails.stableCoinAddress = this.currency.swapStableAddress;
        this.swapDetails.marketAddress = this.currency.swapStableAddress;
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
    // Continuous polling as per https://github.com/ibnzUK/Tron-Wallet-React-Integration/blob/main/src/App.js
    this.timer = setInterval(async () => {
      if (this.observers.length < 1) {
        console.log(
          `no observers for swap ${this.currency.key} no notification`
        );
        return;
      }
      console.log("swap Publisher updating : ", this.currency.key);
      let swapContract = await this.currency.swapContract();
      try {
        this.swapDetails.conversionRatio = await swapContract.getConversion();
        console.log(
          "swap Publisher conversionRatio updating : ",
          this.currency.key,
          this.swapDetails.conversionRatio
        );
      } catch (error) {
        console.error(error);
      }
      try {
        this.swapDetails.swapFeesFactor =
          await swapContract.getSwapFeesFactor();
      } catch (error) {
        console.error(error);
      }
      try {
        if (this.usdd) {
          this.swapDetails.usddBalance = await this.usdd.balanceOf(
            this.currency.swapAddress
          );
        }
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
