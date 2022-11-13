import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import VaultList from "./vaultList";
import WalletBalances from "./walletBalances";

const WalletDashboard = (props) => {
  const [key, setKey] = useState(0);
  useEffect(() => {
    let timer = setInterval(() => {
      setKey(key + 1);
    }, 60 * 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="container">
      <div className="row"></div>
      <div className="row mt-3">
        <div className="col-sm-6">
          <WalletBalances {...props} key={key + "wb"}></WalletBalances>
        </div>
        <div className="col-sm-6">
          <VaultList {...props} key={key + "vl"}></VaultList>
        </div>
      </div>
    </div>
  );
};

export default WalletDashboard;
