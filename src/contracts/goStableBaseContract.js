import SmartContractBase from "./smartContractBase";

class GoStableBaseContract extends SmartContractBase {
  currency = null;
  constructor(address) {
    super(address);
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
    let details = {
      status: this.contract ? true : false,
      address: this.address,
      stableCoinAddress: await this.getStableCoinAddress(),
      marketAddress: await this.getMarketAddress(),
      gStableCoinAddress: await this.getgStableCoinAddress(),
    };
    return details;
  };
  // GET

  getStableCoinAddress = async () => {
    this.check();
    let c = await this.contract.getStableCoinAddress().call();
    return c;
  };
  getMarketAddress = async () => {
    this.check();
    let c = await this.contract.getMarketAddress().call();
    return c;
  };
  getgStableCoinAddress = async () => {
    this.check();
    let c = await this.contract.getgStableCoinAddress().call();
    return c;
  };
  // GET end
  // SET
  setMarket = async (address) => {
    this.check();
    if (!address) throw new Error(`address : ${address}`);

    await this.contract.setMarket(address).send({
      feeLimit: 100_000_000,
      callValue: 0,
      shouldPollResponse: false,
    });
  };
  setStableCoin = async (address) => {
    this.check();
    if (!address) throw new Error(`address : ${address}`);

    await this.contract.setStableCoin(address).send({
      feeLimit: 100_000_000,
      callValue: 0,
      shouldPollResponse: false,
    });
  };
  setgStable = async (address) => {
    this.check();
    if (!address) throw new Error(`address : ${address}`);

    await this.contract.setgStable(address).send({
      feeLimit: 100_000_000,
      callValue: 0,
      shouldPollResponse: false,
    });
  };
  //SET end
}

export default GoStableBaseContract;
