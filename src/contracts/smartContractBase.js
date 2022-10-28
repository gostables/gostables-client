import Web3 from "web3";

class SmartContractBase {
  address;
  contract = null;
  web3 = null;
  constructor(_address) {
    this.address = _address;
    this.web3 = new Web3();
  }

  check = () => {
    if (!this.contract)
      throw new Error(`contract at ${this.address} not initialized`);
  };
}

export default SmartContractBase;
