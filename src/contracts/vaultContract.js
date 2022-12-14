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

  getDetails = async () => {
    //getMarketAddress
    //getStableCoinAddress
    // getInterval
    //getAllocatedRewards
    let stableCoinAddress = await this.getStableCoinAddress();
    let marketAddress = await this.getMarketAddress();
    let interval = await this.getInterval();
    let allocatedRewards = await this.getAllocatedRewards();
    let details = {
      status: this.contract ? true : false,
      address: this.address,
      interval,
      allocatedRewards,
      stableCoinAddress,
      marketAddress,
    };
    return details;
  };
  // GET
  getTVL = async () => {
    this.check();
    let c = await this.contract.totalValue().call();
    return this.web3.utils.fromWei(String(c), "ether");
  };
  getInterval = async () => {
    this.check();
    let c = await this.contract.interval().call();
    return String(c);
  };
  getStableCoinAddress = async () => {
    this.check();
    let c = await this.contract.getStableCoinAddress().call();
    return String(c);
  };
  getMarketAddress = async () => {
    this.check();
    let c = await this.contract.getMarketAddress().call();
    return String(c);
  };
  getAllocatedRewards = async () => {
    this.check();
    let c = await this.contract.allocatedRewards().call();
    return this.web3.utils.fromWei(String(c), "ether");
  };
  // GET end
  //SET
  setInterval = async (interval) => {
    this.check();
    if (!interval) throw new Error(`interval : ${interval}`);

    await this.contract.setLockInterval(interval).send({
      feeLimit: 100_000_000,
      callValue: 0,
      shouldPollResponse: false,
    });
  };
  setStableCoin = async (address) => {
    this.check();
    if (!address) throw new Error(`Address : ${address}`);

    await this.contract.setStableCoin(address).send({
      feeLimit: 100_000_000,
      callValue: 0,
      shouldPollResponse: false,
    });
  };
  setMarket = async (address) => {
    this.check();
    if (!address) throw new Error(`Address : ${address}`);

    await this.contract.setMarket(address).send({
      feeLimit: 100_000_000,
      callValue: 0,
      shouldPollResponse: false,
    });
  };
  //SET end

  deposit = async (_val) => {
    this.check();
    if (!_val) throw new Error(`Number : ${_val}`);

    console.log("deposit", this.web3.utils.toWei(String(_val), "ether"));

    try {
      await this.contract
        .deposit(
          // _val,
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

  withdraw = async (_val) => {
    this.check();
    if (!_val) throw new Error(`Number : ${_val}`);

    console.log("withdraw", this.web3.utils.toWei(String(_val), "ether"));

    try {
      await this.contract
        .withdraw(this.web3.utils.toWei(String(_val), "ether"))
        .send({
          feeLimit: 100_000_000,
          callValue: 0,
          shouldPollResponse: false,
        });
    } catch (error) {
      console.error(error);
    }
  };

  setRewards = async (_val) => {
    this.check();
    if (!_val) throw new Error(`Number : ${_val}`);

    console.log("setRewards", this.web3.utils.toWei(String(_val), "ether"));
    try {
      await this.contract
        .setRewards(this.web3.utils.toWei(String(_val), "ether"))
        // .setRewards(_val)
        .send({
          feeLimit: 100_000_000,
          callValue: 0,
          shouldPollResponse: false,
        });
    } catch (error) {
      console.error(error);
    }
  };

  // distributeRewards = async () => {
  //   this.check();

  //   try {
  //     await this.contract.distributeRewards().send({
  //       feeLimit: 100_000_000,
  //       callValue: 0,
  //       shouldPollResponse: false,
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  balanceOf = async (hodlerAddress) => {
    this.check();
    const [balHex, lockHex] = await this.contract
      .getBalance(hodlerAddress)
      .call();
    const balance = this.web3.utils.fromWei(String(balHex), "ether");
    let lock = new Date(lockHex * 1000);
    return { balance, lock };
  };

  getPendingRewards = async (hodlerAddress) => {
    this.check();
    const balHex = await this.contract.getPendingRewards(hodlerAddress).call();
    const rewards = this.web3.utils.fromWei(String(balHex), "ether");
    return rewards;
  };

  claimPendingRewards = async (hodlerAddress) => {
    this.check();
    const balHex = await this.contract.getPendingRewards(hodlerAddress).call();
    // const rewards = this.web3.utils.fromWei(String(balHex), "ether");
    await this.contract.claimRewards(balHex).send({
      feeLimit: 100_000_000,
      callValue: 0,
      shouldPollResponse: false,
    });
  };
}

export default VaultContract;
