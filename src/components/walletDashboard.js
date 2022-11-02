import { useEffect, useState } from "react";
import walletPublisher from "../publishers/wallet";
import usddImg from "../usdd.png";
import { ThreeDots } from "react-loader-spinner";
import { getCurrencies } from "../utils/currencies";

const WalletDashboard = () => {
  const [walletDashboard, setWalletDashboard] = useState({
    status: 1,
    isSupportedNetwork: false,
    address: "",
    network: "",
    usddBalance: "",
    vaultBalances: [],
  });

  const [gStableCoins, setgStableCoins] = useState([]);

  useEffect(() => {
    walletPublisher.attach(setWalletDashboard);
    return () => {
      walletPublisher.detach(setWalletDashboard);
    };
  }, []);

  useEffect(() => {
   
    return () => {
      console.log("unmounting WalletDashboard");
    };
  }, []);


  const depositsJSX = () => {
    if (!walletDashboard || !walletDashboard.isSupportedNetwork) {
      return <></>;
    }
    return (
      <>
        <p className="h6 card-title my-3">Vault Deposits</p>
        {walletDashboard.vaultBalances.map((vb) => (
          <>
            <div className="text-sm-start fw-bold">
              {vb.balanceData.balance} <span className="mx-2">USDD</span>
              <span className="px-2">
                <img
                  src={usddImg}
                  alt="USDD"
                  width="16"
                  height="16"
                  className="rounded-circle flex-shrink-0"
                />
              </span>
              till {vb.balanceData.lock.toLocaleString()}
            </div>
          </>
        ))}
      </>
    );
  };

  return (
    <div className="card dash-content z-index-0 fadeIn3 fadeInBottom">
      <div className="card-header dashboard p-0 position-relative mt-n4 mx-3 z-index-2">
        <div className="bg-gradient-info shadow-info border-radius-lg py-3 pe-1">
            <div className="text-center dash-stats">
              <div className="row mt-1">
                <div className="col-sm-5">
                  <p className="small">Total Volume (USDD)</p>
                  <h5 className="fw-bold">$55,504,933.29</h5>
                </div>
                <div className="col-sm-4">
                  <p className="small">Total Value Locked (USDD)</p>
                  <h5 className="fw-bold">$504,933.29</h5>
                </div>
                <div className="col-sm-3">
                  <p className="small">Collateral Ratio</p>
                  <h4 className="fw-bold">103%</h4>
                </div>
              </div>
            </div>
        </div>
      </div>
      <div className="card-body">
        {walletDashboard.isSupportedNetwork ? (
          <>



            <div>
                {depositsJSX()}            
            </div>
          </>
        ) : (
          <>
            <div className="mt-2 w-100 d-flex justify-content-center">
              <ThreeDots
                height="32"
                width="32"
                radius="9"
                color="#4fa94d"
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
  );
};

export default WalletDashboard;
