import { ttdd } from "../contracts/gStableContract ";
import { usddContract } from "../contracts/usdContract";
import { ttddVault } from "../contracts/vaultContract";
import getWalletDetails from "../utils/tronWeb";

class WalletPublisher {
  observers = [];
  walletDetails = {};
  usdd = null;
  usdj = null;
  gStable = null;
  vault = null;
  timer = null;
  constructor() {
    this.init();
  }
  init = async () => {
    // Continuous polling as per https://github.com/ibnzUK/Tron-Wallet-React-Integration/blob/main/src/App.js
    this.walletDetails = await getWalletDetails();
    console.log(this.walletDetails);
    this.usdd = await usddContract();
    this.gStable = await ttdd();
    this.vault = await ttddVault();
    this.timer = setInterval(async () => {
      try {
        // Continuous polling as per https://github.com/ibnzUK/Tron-Wallet-React-Integration/blob/main/src/App.js
        this.walletDetails = await getWalletDetails();
      } catch (error) {
        console.error(error);
      }
      let usddBal, ttddBal, vaultBal;
      try {
        if (this.usdd) {
          usddBal = await this.usdd.balanceOf(this.walletDetails.address);
          // console.log("usddBal", usddBal);
        }
      } catch (error) {
        console.error(error);
      }
      try {
        if (this.gStable) {
          ttddBal = await this.gStable.balanceOf(this.walletDetails.address);
          // console.log("ttddBal", ttddBal);
        }
      } catch (error) {
        console.error(error);
      }
      try {
        if (this.vault) {
          vaultBal = await this.vault.balanceOf(this.walletDetails.address);
          // console.log("vaultBal", vaultBal);
        }
      } catch (error) {
        console.error(error);
      }
      this.walletDetails = {
        ...this.walletDetails,
        usddBalance: usddBal,
        ttddBalance: ttddBal,
        vaultBalance: vaultBal,
      };
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
    this.observers.forEach((observer) => observer(this.walletDetails));
  };
}

const walletPublisher = new WalletPublisher();

export default walletPublisher;
