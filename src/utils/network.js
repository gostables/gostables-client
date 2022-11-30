export const getNetworkName = (nwUrl) => {
  if (!nwUrl) return "";
  if (nwUrl.includes("shasta")) return "SHASTA"; //https://api.shasta.trongrid.io"
  if (nwUrl.includes("nileex")) return "NILE"; //https://api.nileex.io/
  if (nwUrl.includes("tronstack")) return "TRONSTACK"; //https://api.tronstack.io/
  if (nwUrl.includes("trongrid")) return "TRONGRID"; //https://api.trongrid.io/
  if (!nwUrl) return "";
  return "UNKNOWN NETWORK";
};

export const isSupportedNetwork = (nw) => {
  for (let i = 0; i < supportedNetworks.length; i++) {
    if (
      supportedNetworks[i].toLocaleLowerCase().includes(nw.toLocaleLowerCase())
    ) {
      return true;
    }
  }
  return false;
};

export const supportedNetworks = ["https://api.nileex.io/"];

export const isCurrentNetworkSupported = () => {
  try {
    return isSupportedNetwork(window.tronWeb.solidityNode.host);
  } catch (e) {
    console.error(e);
  }
  return false;
};
