import { useEffect, useState } from "react";
import { TTDDVaultAddress } from "../contracts/address";
import { usddContract, usdjContract } from "../contracts/usdContract";
import { ttddVault } from "../contracts/vaultContract";
import walletPublisher from "../publishers/wallet";
import { getNetworkName } from "../utils/const";

const WalletDetails = () => {
  const [walletDetails, setWalletDetails] = useState({
    address: "",
    network: "",
    usddBalance: "",
    usdjBalance: "",
    ttddBalance: "",
  });
  useEffect(() => {
    walletPublisher.attach(setWalletDetails);
    return () => {
      walletPublisher.detach(setWalletDetails);
    };
  }, []);
  useEffect(() => {
    init();
    return () => {
      console.log("unmounting Wallet...");
    };
  }, []);

  const init = async () => {
    // let usdd = await usddContract();
    // let usdj = await usdjContract();
    // let ttdd = await ttddVault();
    // setWalletDetails({
    //   usddBalance: await usdd.balanceOf(TTDDVaultAddress),
    //   usdjBalance: await usdj.balanceOf(TTDDVaultAddress),
    //   ttddBalance: await ttdd.balanceOf(TTDDVaultAddress),
    // });
  };
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Wallet</h5>
        <ul className="list-group list-group-flush">
          <li className="list-group-item d-flex justify-content-start">
            {walletDetails.address}
          </li>
          <li className="list-group-item d-flex justify-content-start">
            {getNetworkName(walletDetails.network)}
          </li>
        </ul>
        <p className="list-group-item d-flex justify-content-center h5">
          Balances
        </p>
        <ul className="list-group list-group-flush">
          <li className="list-group-item d-flex justify-content-between">
            <div>USDD</div>
            <div>{walletDetails.usddBalance}</div>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <div>USDJ</div>
            <div>{walletDetails.usdjBalance}</div>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <div>TTDD</div>
            <div>{walletDetails.ttddBalance}</div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default WalletDetails;
