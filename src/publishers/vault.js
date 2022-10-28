import { TTDDVaultAddress } from "../contracts/address";
import { usddContract, usdjContract } from "../contracts/usdContract";
import { ttddVault as ttddVault_ } from "../contracts/vaultContract";

export let vaultDetails = {
  address: "none",
  usddBalance: "",
  usdjBalance: "",
  stableCoinsSupported: [],
  conversionRatio: 0,
};

class VaultPublisher {
  observers = [];
  vaultDetails = vaultDetails;
  usdd = null;
  usdj = null;
  timer = null;
  constructor() {
    this.init();
  }

  init = async () => {
    try {
      this.usdd = await usddContract();
      this.usdj = await usdjContract();
      await ttddVault_();
    } catch (error) {
      console.error(error);
    }

    // Continuous polling as per https://github.com/ibnzUK/Tron-Wallet-React-Integration/blob/main/src/App.js
    this.timer = setInterval(async () => {
      try {
        let ttddVault = await ttddVault_();
        this.vaultDetails.stableCoinsSupported =
          await ttddVault.stableCoinsSupported();
      } catch (error) {
        console.error(error);
      }
      try {
        let ttddVault = await ttddVault_();
        this.vaultDetails.conversionRatio = await ttddVault.getConversion();
      } catch (error) {
        console.error(error);
      }
      try {
        if (this.usdd) {
          this.vaultDetails.usddBalance = await this.usdd.balanceOf(
            TTDDVaultAddress
          );
        }
      } catch (error) {
        console.error(error);
      }
      try {
        if (this.usdd) {
          this.vaultDetails.usdjBalance = await this.usdj.balanceOf(
            TTDDVaultAddress
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
    this.observers.forEach((observer) => observer(this.vaultDetails));
  };
}

const vaultPublisher = new VaultPublisher();

export default vaultPublisher;
