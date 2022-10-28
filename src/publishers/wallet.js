import { usddContract, usdjContract } from "../contracts/usdContract";
import { ttddVault } from "../contracts/vaultContract";
import getWalletDetails from "../utils/tronWeb";

let walletDetails = {
  status: -1,
  name: "none",
  address: "none",
  network: "none",
  link: "false",
  usddBalance: "",
  usdjBalance: "",
  ttddBalance: "",
};

class WalletPublisher {
  observers = [];
  walletDetails = {};
  usdd = null;
  usdj = null;
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
    this.usdj = await usdjContract();
    this.vault = await ttddVault();
    this.timer = setInterval(async () => {
      try {
        // Continuous polling as per https://github.com/ibnzUK/Tron-Wallet-React-Integration/blob/main/src/App.js
        this.walletDetails = await getWalletDetails();
      } catch (error) {
        console.error(error);
      }
      let usddBal, usdjBal, ttddBal;
      try {
        if (this.usdd) {
          usddBal = await this.usdd.balanceOf(this.walletDetails.address);
        }
      } catch (error) {
        console.error(error);
      }
      try {
        if (this.usdd) {
          usdjBal = await this.usdj.balanceOf(this.walletDetails.address);
        }
      } catch (error) {
        console.error(error);
      }
      try {
        if (this.vault) {
          ttddBal = await this.vault.balanceOf(this.walletDetails.address);
        }
      } catch (error) {
        console.error(error);
      }
      this.walletDetails = {
        ...this.walletDetails,
        usddBalance: usddBal,
        usdjBalance: usdjBal,
        ttddBalance: ttddBal,
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
