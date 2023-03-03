import MarketContract from "../contracts/marketContract";
import { MarketContractAddress } from "./contractAddress";

let instance = null;

let init = async () =>  {
    console.log(`Creating the MarketContract...`);
  let marketContract  = new MarketContract(MarketContractAddress);
  return await marketContract.init();
};

export default {
  getMarket: async () => {
    if (!instance) {
      instance = await init();
    }
    return instance;
  }
};

  