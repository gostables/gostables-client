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
      treasuryStableCoinValue: this.getTreasuryStableCoinValue(),
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
  //
  getTreasuryStableCoinValue = async () => {
    this.check();
    let balHex = await this.contract.treasuryStableCoinValue().call();
    const bal = this.web3.utils.fromWei(String(balHex), "ether");
    return bal;
  };
  // GET end
  // SET
  setMarket = async (address) => {
    this.check();
    if (!address) throw new Error(`address : ${address}`);

    await this.contract.setMarket(address).send({
      feeLimit: 200_000_000,
      callValue: 0,
      shouldPollResponse: false,
    });
  };
  setStableCoin = async (address) => {
    this.check();
    if (!address) throw new Error(`address : ${address}`);

    await this.contract.setStableCoin(address).send({
      feeLimit: 200_000_000,
      callValue: 0,
      shouldPollResponse: false,
    });
  };
  setgStable = async (address) => {
    this.check();
    if (!address) throw new Error(`address : ${address}`);

    await this.contract.setgStable(address).send({
      feeLimit: 200_000_000,
      callValue: 0,
      shouldPollResponse: false,
    });
  };
  //SET end
  invest = async (_val) => {
    this.check();
    if (!_val) throw new Error(`Number : ${_val}`);

    console.log("invest", this.web3.utils.toWei(String(_val), "ether"));

    try {
      await this.contract
        .investIntoTreasury(
          // _val,
          this.web3.utils.toWei(String(_val), "ether")
        )
        .send({
          feeLimit: 200_000_000,
          callValue: 0,
          shouldPollResponse: false,
        });
    } catch (error) {
      console.error(error);
    }
  };
  withdrawFromTreasury = async (_val) => {
    this.check();
    if (!_val) throw new Error(`Number : ${_val}`);

    console.log(
      "withdrawFromTreasury",
      this.web3.utils.toWei(String(_val), "ether")
    );

    try {
      await this.contract
        .withdrawFromTreasury(
          // _val,
          this.web3.utils.toWei(String(_val), "ether")
        )
        .send({
          feeLimit: 200_000_000,
          callValue: 0,
          shouldPollResponse: false,
        });
    } catch (error) {
      console.error(error);
    }
  };
}

export default GoStableBaseContract;
