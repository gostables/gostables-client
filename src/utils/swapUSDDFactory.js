import SwapContract from "../contracts/swapContract";
import { SwapUSDDContractAddress } from "./contractAddress";

let instance = null;

let init = async () =>  {
    console.log(`Creating the SwapUSDDContract...`);
  let swapUSDD  = new SwapContract(SwapUSDDContractAddress);
  return await swapUSDD.init();
};

export default {
  getSwapUSDD: async () => {
    if (!instance) {
      instance = await init();
    }
    return instance;
  }
};

  