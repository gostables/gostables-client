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
    return <div>Please login to Tronlink</div>;
  }

  if (address) {
    return (
      <div className="text-center">
        <div className="small my-0">{getMaskedAddress(address)}</div>
        <div className="small text-muted" style={{ fontSize: ".6rem" }}>
          {getNetworkName(network)}
        </div>
      </div>
    );
  }

  if (connectRequired) {
    return (
      <button
        class="btn btn-outline-warning my-2 my-sm-0 btn-sm "
        type="button"
        onClick={connect}
      >
        Connect Wallet
      </button>
    );
  }
};

export default ConnectWallet;
