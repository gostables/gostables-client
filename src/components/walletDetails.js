import { useEffect, useState } from "react";
import { ttdd } from "../contracts/gStableContract ";
import walletPublisher from "../publishers/wallet";
import usddImg from "../usdd.png";
import ttddImg from "../ttdd.png";
import { ThreeDots } from "react-loader-spinner";

const WalletDetails = () => {
  const [walletDetails, setWalletDetails] = useState({
    address: "",
    network: "",
    usddBalance: "",
    ttddBalance: "",
    vaultBalance: "",
  });

  const [gStableCoinName, setgStableCoinName] = useState("");
  const [, setgStableCoinSymbol] = useState("");

  useEffect(() => {
    walletPublisher.attach(setWalletDetails);
    return () => {
      walletPublisher.detach(setWalletDetails);
    };
  }, []);

  useEffect(() => {
    init();

    return () => {
      console.log("unmounting WalletDetails");
    };
  }, []);
  const init = async () => {
    //gStable Data
    let gStableContract = await ttdd();
    let { name: gStableCoinName, symbol: gStableCoinSymbol } =
      await gStableContract.getNameSymbol();
    setgStableCoinName(gStableCoinName);
    setgStableCoinSymbol(gStableCoinSymbol);
  };

  const depositsJSX = () => {
    return walletDetails.vaultBalance.balance > 0 ? (
      <>
        <p className="h6 card-title my-3">Vault Deposits</p>

        <div className="text-sm-start fw-bold">
          {walletDetails.vaultBalance.balance}{" "}
          <span className="mx-2">USDD</span>
          <span className="px-2">
            <img
              src={usddImg}
              alt="USDD"
              width="16"
              height="16"
              className="rounded-circle flex-shrink-0"
            />
          </span>
          till {walletDetails.vaultBalance.lock.toLocaleString()}
        </div>
      </>
    ) : (
      <></>
    );
  };

  return (
    <div class="card z-index-0 fadeIn3 fadeInBottom">
      <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
        <div class="bg-gradient-info shadow-info border-radius-lg py-3 pe-1">
          <h4 class="text-white font-weight-bolder text-center mt-2 mb-0">
            Wallet
          </h4>
        </div>
      </div>
      <div className="card-body">
        {walletDetails.address ? (
          <>
            <p className="h6 card-title my-3">Balances</p>
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between">
                <div>
                  <span>USDD </span>
                  <span className="px-2">
                    <img
                      src={usddImg}
                      alt="USDD"
                      width="16"
                      height="16"
                      className="rounded-circle flex-shrink-0"
                    />
                  </span>
                </div>
                <div>{walletDetails.usddBalance}</div>
              </li>

              <li className="list-group-item d-flex justify-content-between">
                <div>
                  <span>{gStableCoinName}</span>
                  <span className="px-2">
                    <img
                      src={ttddImg}
                      alt="USDD"
                      width="16"
                      height="16"
                      className="rounded-circle flex-shrink-0"
                    />
                  </span>
                </div>
                <div>{walletDetails.ttddBalance}</div>
              </li>
            </ul>
            {depositsJSX()}
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

export default WalletDetails;
