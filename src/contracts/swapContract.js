import SmartContractBase from "./smartContractBase";

class SwapContract extends SmartContractBase {
  currency = null;
  constructor(swapAddress) {
    super(swapAddress);
    // this.currency = _currency;
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
    //getConversion
    //getSwapFeesFactor
    //getAccumulatedSwapFees
    let conversion = await this.getConversion();
    let stableCoinAddress = await this.getStableCoinAddress();
    let accumulatedSwapFees = await this.getAccumulatedSwapFees();
    let swapFeesFactor = await this.getSwapFeesFactor();
    let marketAddress = await this.getMarketAddress();
    let rewardsPC = await this.getRewardsPercent();
    let swapDetails = {
      status: this.contract ? true : false,
      address: this.address,
      conversion,
      stableCoinAddress,
      accumulatedSwapFees,
      swapFeesFactor,
      marketAddress,
      rewardsPC,
    };
    return swapDetails;
  };
  // GET
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
  getConversion = async () => {
    this.check();
    let cr = await this.contract.conversionRatio().call();
    return String(cr) / 10000;
  };
  getAccumulatedSwapFees = async () => {
    this.check();
    let c = await this.contract.accumulatedSwapFees().call();
    return this.web3.utils.fromWei(String(c), "ether");
  };
  getSwapFeesFactor = async () => {
    this.check();
    let c = await this.contract.swapFeesFactor().call();
    return c / 10000;
  };
  getRewardsPercent = async () => {
    this.check();
    let c = await this.contract.rewardPC().call();
    return String(c);
  };
  // GET end
  // SET
  setConversion = async (cr) => {
    this.check();
    if (!cr) throw new Error(`CR : ${cr}`);
    await this.contract.setConversion(cr * 10000).send({
      feeLimit: 100_000_000,
      callValue: 0,
      shouldPollResponse: false,
    });
  };
  setSwapFeesFactor = async (sff) => {
    this.check();
    if (!sff) throw new Error(`SFF : ${sff}`);
    await this.contract.setSwapFeesFactor(sff * 10000).send({
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
  setRewardsPercent = async (rp) => {
    this.check();
    if (!rp) throw new Error(`SFF : ${rp}`);
    await this.contract.setRewardsPercent(rp).send({
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
    let result = null;
    try {
      result = await this.contract
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
    return result;
  };

  withdraw = async (_val) => {
    this.check();
    if (!_val) throw new Error(`Number : ${_val}`);

    console.log("withdraw", this.web3.utils.toWei(String(_val), "ether"));
    let result = null;
    try {
      result = await this.contract
        .withdraw(this.web3.utils.toWei(String(_val), "ether"))
        .send({
          feeLimit: 100_000_000,
          callValue: 0,
          shouldPollResponse: false,
        });
    } catch (error) {
      console.error("withdrawError", error);
    }
    return result;
  };

  clearAccumulatedSwapFees = async (vaultAddress) => {
    this.check();
    if (!vaultAddress) throw new Error(`Vault Address : ${vaultAddress}`);
    try {
      await this.contract.transferRewards(vaultAddress).send({
        feeLimit: 100_000_000,
        callValue: 0,
        shouldPollResponse: false,
      });
    } catch (error) {
      console.error(error);
    }
  };

  balanceOf = async (hodlerAddress) => {
    this.check();
    const balHex = await this.contract.balanceOf(hodlerAddress).call();
    const bal = this.web3.utils.fromWei(String(balHex), "ether");

    return bal;
  };
}

export default SwapContract;
