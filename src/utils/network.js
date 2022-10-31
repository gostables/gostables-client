export const getNetworkName = (nwUrl) => {
  if (!nwUrl) return "";
  if (nwUrl.includes("shasta")) return "SHASTA"; //https://api.shasta.trongrid.io"
  if (nwUrl.includes("nileex")) return "NILE"; //https://api.nileex.io/
  if (nwUrl.includes("tronstack")) return "TRONSTACK"; //https://api.tronstack.io/
  if (nwUrl.includes("trongrid")) return "TRONGRID"; //https://api.trongrid.io/
  if (!nwUrl) return "";
  return "UNKNOWN NETWORK";
};

export const isSupportedNetwork = (nwUrl) => {
  if (nwUrl.includes("nileex")) return true; //https://api.nileex.io/
  return false;
};
