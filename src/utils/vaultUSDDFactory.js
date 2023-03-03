import VaultContract from "../contracts/vaultContract";
import { VaultUSDDContractAddress } from "./contractAddress";

let instance = null;

let init = async () =>  {
    console.log(`Creating the VaultUSDDContract...`);
  let vaultUSDD  = new VaultContract(VaultUSDDContractAddress);
  return await vaultUSDD.init();
};

export default {
  getVaultUSDD: async () => {
    if (!instance) {
      instance = await init();
    }
    return instance;
  }
};

  