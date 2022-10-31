import { isSupportedNetwork } from "./network";

//https://github.com/ibnzUK/Tron-Wallet-React-Integration/blob/main/src/App.js
const getWalletDetails = async () => {
  if (window.tronWeb) {
    //checking if wallet injected
    if (window.tronWeb.ready) {
      //we have wallet and we are logged in
      return {
        status: 1,
        name: window.tronWeb.defaultAddress.name,
        address: window.tronWeb.defaultAddress.base58,
        network: window.tronWeb.fullNode.host,
        isSupportedNetwork: isSupportedNetwork(window.tronWeb.fullNode.host),
        link: "true",
      };
    } else {
      //we have wallet but not logged in
      return {
        status: -1,
        name: "none",
        address: "none",
        network: "none",
        link: "false",
        isSupportedNetwork: isSupportedNetwork(window.tronWeb.fullNode.host),
      };
    }
  } else {
    //wallet is not detected at all
    return {
      status: -2,
      name: null,
      address: null,
      network: null,
      link: null,
      isSupportedNetwork: isSupportedNetwork(window.tronWeb.fullNode.host),
    };
  }
};

export default getWalletDetails;
