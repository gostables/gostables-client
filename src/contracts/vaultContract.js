import SmartContractBase from "./smartContractBase";

class VaultContract extends SmartContractBase {
  currency = null;
  constructor(vaultAddress) {
    super(vaultAddress);
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
    return null;
  };

  getDetails = async (currencyId) => {
    let interval = await this.getInterval(currencyId);
    let details = {
      interval,
    };
    return details;
  };
  // GET
  getTVL = async (currencyId) => {
    this.check();
    let c = await this.contract.gStableTotalValueMap(currencyId).call();
    return this.web3.utils.fromWei(String(c), "ether");
  };
  getInterval = async (currencyId) => {
    this.check();
    let c = await this.contract.gStableIntervalMap(currencyId).call();
    return String(c);
  };

  deposit = async (currencyId, _val) => {
    this.check();
    if (!_val) throw new Error(`Number : ${_val}`);

    console.log("deposit", this.web3.utils.toWei(String(_val), "ether"));

    try {
      await this.contract
        .deposit(
          currencyId,
          this.web3.utils.toWei(String(_val), "ether")
        )
        .send({
          feeLimit: 100_000_000,
          callValue: 0,
          shouldPollResponse: false,
        });
    } catch (error) {
      console.error(error);
    }
  };

  withdraw = async (currencyId, _val) => {
    this.check();
    if (!_val) throw new Error(`Number : ${_val}`);

    console.log("withdraw", this.web3.utils.toWei(String(_val), "ether"));

    try {
      await this.contract
        .withdraw(currencyId, this.web3.utils.toWei(String(_val), "ether"))
        .send({
          feeLimit: 100_000_000,
          callValue: 0,
          shouldPollResponse: false,
        });
    } catch (error) {
      console.error(error);
    }
  };

  balanceOf = async (currencyId, hodlerAddress) => {
    this.check();
    const [balHex, lockHex] = await this.contract
      .getBalance(currencyId, hodlerAddress)
      .call();
    const balance = this.web3.utils.fromWei(String(balHex), "ether");
    let lock = new Date(lockHex * 1000);
    return { balance, lock };
  };

  getPendingRewards = async (currencyId, hodlerAddress) => {
    this.check();
    const balHex = await this.contract.getPendingRewards(currencyId, hodlerAddress).call();
    const rewards = this.web3.utils.fromWei(String(balHex), "ether");
    return rewards;
  };

  claimPendingRewards = async (currencyId, hodlerAddress) => {
    this.check();
    const balHex = await this.contract.getPendingRewards(currencyId, hodlerAddress).call();
    // const rewards = this.web3.utils.fromWei(String(balHex), "ether");
    await this.contract.claimRewards(currencyId, balHex).send({
      feeLimit: 100_000_000,
      callValue: 0,
      shouldPollResponse: false,
    });
  };
}

export default VaultContract;
