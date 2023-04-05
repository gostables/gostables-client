import SmartContractBase from "./smartContractBase";

class MarketContract extends SmartContractBase {
  currency = null;
  constructor(swapMarketAddress) {
    super(swapMarketAddress);
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
    let swapDetails = {
      status: this.contract ? true : false,
      address: this.address,
    };
    return swapDetails;
  };
  // GET
  balanceOf = async (hodlerAddress) => {
    this.check();
    const balHex = await this.contract.balanceOf(hodlerAddress).call();
    const bal = this.web3.utils.fromWei(String(balHex), "ether");

    return bal;
  };

  getNameSymbol = async () => {
    this.check();
    const name = await this.contract.name().call();
    const symbol = await this.contract.symbol().call();

    return { name, symbol };
  };
  // GET end
}

export default MarketContract;
