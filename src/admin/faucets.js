import MockUSDD from "./mockUSDD";
import { useEffect, useState } from "react";
import walletPublisher from "../publishers/wallet";
import IncorrectNetwork from "../components/incorrectNetwork";

const AdminFaucets = () => {
  const [walletDetails, setWalletDetails] = useState({
    status: 1,
    isSupportedNetwork: false,
    address: "",
    network: "",
    usddBalance: "",
    vaultBalances: [],
  });
  useEffect(() => {
    walletPublisher.attach(setWalletDetails);
    return () => {
      walletPublisher.detach(setWalletDetails);
    };
  }, []);

  if (!walletDetails || !walletDetails.isSupportedNetwork) {
    return (
      <>
        <div className="container faucet">
          <div className="row mt-5 d-flex justify-content-center">
            <div className="col-sm-4"></div>
            <div className="col-sm-4">
              <IncorrectNetwork></IncorrectNetwork>
            </div>
            <div className="col-sm-4"></div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="container faucet">
      <div className="row mt-5 d-flex justify-content-center">
        <div className="col-sm-4">
          <MockUSDD></MockUSDD>
        </div>
      </div>
    </div>
  );
};

export default AdminFaucets;
