import React from "react";
import { ThreeDots } from "react-loader-spinner";
import { getNetworkName } from "../utils/const";
import { getMaskedAddress } from "../utils/shorten";
import getWalletDetails from "../utils/tronWeb";
class TronlinkConnect extends React.Component {
  state = {
    address: null,
    walletConnectStatus: 0,
    network: null,
  };
  interval;
  componentDidMount() {
    this.interval = setInterval(async () => {
      //wallet checking interval 2sec
      await this.connectToTronLink();
    }, 2000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  connectToTronLink = async () => {
    let resp = await getWalletDetails();
    this.setState({
      walletConnectStatus: resp.status,
      address: resp.address,
      network: getNetworkName(resp.network),
    });
    // console.log(resp);
  };
  render() {
    let className = "px-3 small";

    switch (this.state.walletConnectStatus) {
      case -1:
        return (
          <div className={`${className} text-warning ml-3`}>
            Please connect to TronLink.
          </div>
          //   <button
          //     className="btn btn-outline-danger mx-3"
          //     onClick={() => this.connectToTronLink()}
          //   >
          //     Connect
          //   </button>
        );
      case 1:
        return (
          <div>
            <div className={`${className} text-success`}>
              {getMaskedAddress(this.state.address)}
            </div>
            <div className={`${className} text-dark small fw-light`}>
              {this.state.network}
            </div>
          </div>
        );
      case -2:
        return (
          <div className={`${className} text-danger`}>
            Please install TronLink
          </div>
        );
      default:
        return (
          <div className="mt-2 mx-3">
            <ThreeDots
              height="26"
              width="26"
              radius="9"
              color="#4fa94d"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          </div>
        );
    }
  }
}

export default TronlinkConnect;
