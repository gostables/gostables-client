import SmartContractBase from "./smartContractBase";

class ClientsContract extends SmartContractBase {
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
      clients: await this.getClients(),
    };
    return details;
  };
  // GET

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
}

export default ClientsContract;
