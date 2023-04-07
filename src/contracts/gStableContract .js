import SmartContractBase from "./smartContractBase";

class gStableContract extends SmartContractBase {
  currency = null;
  constructor(gStableAddress) {
    super(gStableAddress);
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
      clients: await this.getClients(),
    };
    return swapDetails;
  };
  // GET
  getNameSymbol = async () => {
    this.check();
    const name = await this.contract.name().call();
    const symbol = await this.contract.symbol().call();

    return { name, symbol };
  };
  getBalanceOf = async (address) => {
    this.check();
    let c = await this.contract.balanceOf(address).call();
    return String(c);
  };
  getClients = async () => {
    this.check();
    let c = await this.contract.getClients().call();
    return c;
  };
  // GET end
  // SET
  setClient = async (address) => {
    this.check();
    if (!address) throw new Error(`address : ${address}`);

    await this.contract.setClient(address).send({
      feeLimit: 200_000_000,
      callValue: 0,
      shouldPollResponse: false,
    });
  };
  removeClient = async (index) => {
    this.check();
    if (!index) throw new Error(`index : ${index}`);

    await this.contract.removeClient(index).send({
      feeLimit: 200_000_000,
      callValue: 0,
      shouldPollResponse: false,
    });
  };
  //SET end
  balanceOf = async (hodlerAddress) => {
    if (!hodlerAddress) {
      console.error(`hodlerAddress is ${hodlerAddress}`);
    }
    this.check();
    const balHex = await this.contract.balanceOf(hodlerAddress).call();
    const bal = this.web3.utils.fromWei(String(balHex), "ether");

    return bal;
  };
}

export default gStableContract;
