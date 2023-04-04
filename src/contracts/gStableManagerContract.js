import { gStableManagerContractAddress } from "../utils/contractAddress";
import SmartContractBase from "./smartContractBase";

class GStableManagerContract extends SmartContractBase {
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

  getConversion = async (currencyId) => {
    this.check();
    try {
      let cr = await this.contract.gStableConversionRatioMap(currencyId).call();
      return String(cr) ;      
    } catch (error) {
      console.error(error);
    }
  };

}

export default GStableManagerContract;

const gStableManagerContract_ = new GStableManagerContract(gStableManagerContractAddress);

let gStableManagerContractInitialized = null;

export const gStableManagerContract = async () => {
    console.log("initializing gStableManagerContract");
    gStableManagerContractInitialized = await gStableManagerContract_.init();
  return gStableManagerContractInitialized;
};
