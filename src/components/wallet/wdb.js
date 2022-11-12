import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import VaultList from "./vaultList";
import WalletBalances from "./walletBalances";

const WalletDashboard = (props) => {
  const [balancesCompleted, setBalancesCompleted] = useState(false);
  useEffect(() => {
    setTimeout(displayVaults, 20 * 1000);

    return () => {
      console.log("unmounting wdb");
    };
  }, []);

  const displayVaults = () => {
    setBalancesCompleted(true);
  };

  return (
    <div className="container">
      <div className="row mt-3"></div>
      <div className="row mt-3">
        <div className="col-sm-6">
          <WalletBalances {...props}></WalletBalances>
        </div>
        <div className="col-sm-6">
          {balancesCompleted ? (
            <VaultList {...props}></VaultList>
          ) : (
            <>
              <div className="mt-2 w-100 d-flex justify-content-center">
                <ThreeDots
                  height="64"
                  width="64"
                  radius="9"
                  color="#fff"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletDashboard;
