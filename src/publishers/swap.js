import { TTDDVaultAddress } from "../contracts/address";
import { ttddSwap as ttddSwap_ } from "../contracts/swapContract";
import { usddContract, usdjContract } from "../contracts/usdContract";
import { getCurrency } from "../utils/currencies";

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
  observers = [];
  swapDetails = swapDetails;
  usdd = null;
  timer = null;
  constructor(currency) {
    this.init();
  }

  init = async () => {
    try {
      this.usdd = await usddContract();
      try {
        let ttddSwap = await ttddSwap_();
        this.swapDetails.stableCoinAddress =
          await ttddSwap.getStableCoinAddress();
        this.swapDetails.marketAddress = await ttddSwap.getMarketAddress();
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }

    // Continuous polling as per https://github.com/ibnzUK/Tron-Wallet-React-Integration/blob/main/src/App.js
    this.timer = setInterval(async () => {
      try {
        let ttddSwap = await ttddSwap_();
        this.swapDetails.conversionRatio = await ttddSwap.getConversion();
      } catch (error) {
        console.error(error);
      }
      try {
        let ttddSwap = await ttddSwap_();
        this.swapDetails.swapFeesFactor = await ttddSwap.getSwapFeesFactor();
      } catch (error) {
        console.error(error);
      }
      try {
        if (this.usdd) {
          let ttddCurr = getCurrency("TTDD");

          this.swapDetails.usddBalance = await this.usdd.balanceOf(
            ttddCurr.swapAddress
          );
        }
      } catch (error) {
        console.error(error);
      }

      this.notify();
    }, 3 * 1000);
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

const ttddSwapPublisher = new SwapPublisher();

export default ttddSwapPublisher;
