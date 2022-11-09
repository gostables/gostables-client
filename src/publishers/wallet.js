import { usddContract } from "../contracts/usdContract";
import { getCurrencies } from "../utils/currencies";
import getWalletDetails from "../utils/tronWeb";

class WalletPublisher {
  observers = [];
  walletDetails = {};
  usdd = null;
  usdj = null;
  timer = null;
  constructor() {
    this.init();
  }
  get_gStableBalances = async (currencies) => {
    let gStableBalances = [];
    for (let index = 0; index < currencies.length; index += 1) {
      const currency = currencies[index];
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
    for (let index = 0; index < currencies.length; index += 1) {
      const currency = currencies[index];
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
      } catch (error) {
        console.error(error);
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
    this.walletDetails = await getWalletDetails();
    console.log(this.walletDetails);

    this.usdd = await usddContract();

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
