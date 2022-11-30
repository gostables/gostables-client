import {
  isCurrentNetworkSupported,
  isSupportedNetwork,
} from "../utils/network";

class NetworkPublisher {
  isCurrentNetworkSupported = false;
  constructor() {
    this.checkNetwork();
    window.addEventListener("message", (e) => {
      //docs.tronlink.org/tronlink-wallet-extension/receive-messages-from-tronlink/network-change-message
      if (e.data.message && e.data.message.action == "setNode") {
        console.log("got setNode event", e.data.message.data.node.solidityNode);
        debugger;
        this.isCurrentNetworkSupported = isSupportedNetwork(
          e.data.message.data.node.solidityNode
        );
        this.notify();
      }
    });
  }
  checkNetwork = async () => {
    try {
      console.log("connecting");
      const res = await window.tronWeb.request({
        method: "tron_requestAccounts",
      });
      if (res.code == 200) {
        this.isCurrentNetworkSupported = isSupportedNetwork(
          window.tronWeb.solidityNode.host
        );
      } else {
        setTimeout(() => this.checkNetwork(), 3 * 1000);
      }
    } catch (e) {
      console.error(e);
      setTimeout(() => this.checkNetwork(), 3 * 1000);
    }
    this.notify();
  };

  observers = [];
  attach = (observer) => {
    this.observers.push(observer);
  };

  detach = (observer) => {
    this.observers = this.observers.filter((observed) => observed !== observer);
  };
  notify = () => {
    console.log("notifying", this.isCurrentNetworkSupported);
    this.observers.forEach((observer) =>
      observer(this.isCurrentNetworkSupported)
    );
  };
}

let networkPublisher = new NetworkPublisher();

export default networkPublisher;
