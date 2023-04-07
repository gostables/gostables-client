import SmartContractBase from "./smartContractBase";

class SwapGStableContract extends SmartContractBase {
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

  swap = async (fromId, _val , toId) => {
    this.check();
    if (!_val) throw new Error(`Number : ${_val}`);

    console.log("swap gStables", this.web3.utils.toWei(String(_val), "ether"));
    let result = null;
    try {
      result = await this.contract
        .swap(
          fromId,
          this.web3.utils.toWei(String(_val), "ether"),
          toId
        )
        .send({
          feeLimit: 200_000_000,
          callValue: 0,
          shouldPollResponse: false,
        });
    } catch (error) {
      console.error(error);
    }
    return result;
  };
}

export default SwapGStableContract;
