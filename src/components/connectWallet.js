import { useEffect, useState } from "react";
import { getNetworkName } from "../utils/network";
import { getMaskedAddress } from "../utils/shorten";

const ConnectWallet = () => {
  const [address, setAddress] = useState(null);
  const [network, setNetwork] = useState(null);
  const [loginToTronlinkRequired, setLoginToTronlinkRequired] = useState(false);
  const [connectRequired, setConnectRequired] = useState(false);
  useEffect(() => {
    connect();
    window.addEventListener("message", (e) => {
      //docs.tronlink.org/tronlink-wallet-extension/receive-messages-from-tronlink/account-change-message
      if (e.data.message && e.data.message.action === "accountsChanged") {
        console.log("got accountsChanged event", e.data);
        connect();
      }
      //docs.tronlink.org/tronlink-wallet-extension/receive-messages-from-tronlink/network-change-message
      if (e.data.message && e.data.message.action == "setNode") {
        console.log("got setNode event", e.data);
        connect();
      }
      //docs.tronlink.org/tronlink-wallet-extension/receive-messages-from-tronlink/disconnect-website-message
      if (e.data.message && e.data.message.action == "disconnect") {
        console.log("got connect event", e.data);
        setAddress(null);
        setNetwork(null);
        setConnectRequired(true);
      }
    });
    return () => {
      console.log("unmounting Connect Wallet");
    };
  }, [address, network]);

  const connect = async () => {
    try {
      console.log("connecting");
      const res = await window.tronWeb.request({
        method: "tron_requestAccounts",
      });
      if (!res) {
        setLoginToTronlinkRequired(true);
      } else {
        setLoginToTronlinkRequired(false);
      }
      console.log(window.tronWeb);
      if (res.code == 200) {
        setAddress(window.tronWeb.defaultAddress.base58);
        setNetwork(window.tronWeb.solidityNode.host);
      }
      if (res.code == 4001) {
        setAddress(null);
        setNetwork(null);
        setConnectRequired(true);
      }
    } catch (e) {
      console.error(e);
      setTimeout(() => connect(), 3 * 1000);
    }
  };

  if (loginToTronlinkRequired) {
    return (
        <button class="btn btn-primary web3-connect web3-dark content d-flex text-center" onClick={connect}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-power" viewBox="0 0 16 16">
          <path d="M7.5 1v7h1V1h-1z"/>
          <path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z"/>
        </svg>
          <div className="px-3 text-warning">Please login to Tronlink</div>
        </button>
    );
  }

  if (address) {
    return (
        <button class="btn btn-primary web3-connect d-flex text-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-power" viewBox="0 0 16 16">
          <path d="M7.5 1v7h1V1h-1z"/>
          <path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z"/>
        </svg>
          <div class="text-warning px-3">
            <div className="small my-0">{getMaskedAddress(address)} | &nbsp;
            <span className="small" style={{ fontSize: ".6rem" }}>
              {getNetworkName(network)}
            </span>
            </div>
          </div>
        </button>

    );
  }

  if (connectRequired) {
    return (
        <button class="btn btn-primary web3-connect web3-dark content d-flex text-center" onClick={connect}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-power" viewBox="0 0 16 16">
          <path d="M7.5 1v7h1V1h-1z"/>
          <path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z"/>
        </svg>
          <div className="px-3 text-warning">Connect Walllet</div>
        </button>
    );
  }
};

export default ConnectWallet;
