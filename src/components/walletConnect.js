import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import walletPublisher from "../publishers/wallet";
import { getNetworkName } from "../utils/network";
import { getMaskedAddress } from "../utils/shorten";

const WalletConnect = () => {
  const [walletDetails, setWalletDetails] = useState({
    address: "",
    network: "",
    status: -1,
  });
  useEffect(() => {
    walletPublisher.attach(setWalletDetails);
    return () => walletPublisher.detach(setWalletDetails);
  }, []);

  let className = "px-3 small";

  switch (walletDetails.status) {
    case -1:
      return <div className={`${className} text-warning`}>Connect Wallet</div>;
    case 1:
      return (
        <>
          <div className={`${className} text-success text-center text-xxs`}>
            {getMaskedAddress(walletDetails.address)}
            {" / "}
            {getNetworkName(walletDetails.network)}
          </div>
          {/* <div
            className={`${className} text-success small text-center text-xs`}
          >
            {getNetworkName(walletDetails.network)}
          </div> */}
        </>
      );
    case -2:
      return (
        <div className={`${className} text-danger`}>
          Please install TronLink
        </div>
      );
    default:
      return (
        <div className="mt-2  mx-3">
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
};

export default WalletConnect;
