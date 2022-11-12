import { usddContract } from "../contracts/usdContract";
import { getCurrencies, getCurrency } from "../utils/currencies";
import getWalletDetails from "../utils/tronWeb";
import currencyPublisher from "./currency";

class WalletPublisher {
  observers = [];
  walletDetails = {};
  usdd = null;
  usdj = null;
  timer = null;
  currencykey = null;
  constructor() {
    this.init();
    this.currencykey = currencyPublisher.getCurrencyKey();
    currencyPublisher.attach(this.updateCurrency);
  }
  updateCurrency = (currencyKey_) => {
    this.currencykey = currencyKey_;
  };
  get_gStableBalances = async (currencies) => {
    let gStableBalances = [];
    if (this.currencykey) {
      console.log(`getting gStable data for ${this.currencyKey}`);
      let currency = getCurrency(this.currencykey);
      let gStableContract = await currency.gStableContract();
      let gStableBal = await gStableContract.balanceOf(
        this.walletDetails.address
      );
      gStableBalances.push({
        currencyKey: currency.key,
        balance: gStableBal,
      });
    }

    return gStableBalances;
  };
  getVaultBalances = async (currencies) => {
    let vaultBalances = [];
    if (this.currencykey) {
      console.log(`getting vault data for ${this.currencyKey}`);
      let currency = getCurrency(this.currencykey);
      let vaultContract = await currency.vaultContract();
      let vaultBalData = await vaultContract.balanceOf(
        this.walletDetails.address
      );
      let vaultRewards = await vaultContract.getPendingRewards(
        this.walletDetails.address
      );
      vaultBalances.push({
        currencyKey: currency.key,
        balanceData: vaultBalData,
        rewards: vaultRewards,
      });
    }
    return vaultBalances;
  };
  getUSDDBalance = async () => {
    let usddBal;
    try {
      if (this.usdd) {
        usddBal = await this.usdd.balanceOf(this.walletDetails.address);
      }
    } catch (error) {
      console.error(error);
    }
    return usddBal;
  };
  getData = async () => {
    {
      try {
        // Continuous polling as per https://github.com/ibnzUK/Tron-Wallet-React-Integration/blob/main/src/App.js
        this.walletDetails = await getWalletDetails();
        console.log(this.walletDetails);
      } catch (error) {
        console.error(error);
      }
      if (!this.usdj) {
        this.usdd = await usddContract();
      }
      let usddBal = await this.getUSDDBalance();

      let currencies = getCurrencies();
      // reading gStable Balances
      let gStableBalances = await this.get_gStableBalances(currencies);

      // reading vault Balances
      let vaultBalances = await this.getVaultBalances(currencies);

      this.walletDetails = {
        ...this.walletDetails,
        usddBalance: usddBal,
        gStableBalances: gStableBalances,
        vaultBalances: vaultBalances,
      };
      this.notify();
    }
  };
  init = async () => {
    try {
      this.walletDetails = await getWalletDetails();
      console.log(this.walletDetails);

      this.usdd = await usddContract();
    } catch (error) {
      console.error(error);
    }

    this.timer = setInterval(() => this.getData(), 3 * 1000);
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
