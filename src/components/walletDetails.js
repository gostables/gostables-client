import { useEffect, useState } from "react";
import walletPublisher from "../publishers/wallet";
import usddImg from "../usdd.png";
import { ThreeDots } from "react-loader-spinner";
import { getCurrencies } from "../utils/currencies";

const WalletDetails = () => {
  const [walletDetails, setWalletDetails] = useState({
    status: 1,
    isSupportedNetwork: false,
    address: "",
    network: "",
    usddBalance: "",
    vaultBalances: [],
  });

  const [gStableCoins, setgStableCoins] = useState([]);

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
    try {
      //gStable Data
      let gStableCoins = [];
      getCurrencies().map(async (currency) => {
        let gStableContract = await currency.gStableContract();
        let { name: gStableCoinName, symbol: gStableCoinSymbol } =
          await gStableContract.getNameSymbol();
        gStableCoins.push({
          name: gStableCoinName,
          symbol: gStableCoinSymbol,
          icon: currency.icon,
          currencyKey: currency.key,
        });
      });
      setgStableCoins(gStableCoins);
    } catch (error) {
      console.error();
    }
  };

  const portfolioJSX = () => {
    if (!walletDetails || !walletDetails.isSupportedNetwork) {
      return <></>;
    }
    return (
      <>
        <div className="text-center">
          <p className="small">My Net Worth (gTTD)</p>
          <h5 className="fw-bold">$704,933.29</h5>
          
        </div>
      </>
    );
  };

  return (
    <div className="card z-index-0 fadeIn3 fadeInBottom">
      <div className="card-header portfolio-bal p-0 position-relative mt-n4 mx-3 z-index-2">
        <div className="bg-gradient-info shadow-info border-radius-lg py-3 pe-1">
            {portfolioJSX()}
        </div>
      </div>
      <div className="card-body">
        {walletDetails.isSupportedNetwork ? (
          <>
            
            <p className="h6 card-title my-3">Balances</p>
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between">
                <div>
                  <span className="px-2">
                    <img
                      src={usddImg}
                      alt="USDD"
                      width="32"
                      height="32"
                      className="rounded-circle flex-shrink-0"
                    />
                  </span>
                  <span>USDD </span>
                </div>
                <div>{walletDetails.usddBalance}</div>
              </li>
              {gStableCoins.map((gStableCoin) => {
                let balances = walletDetails.gStableBalances.filter((gsb) => {
                  return (
                    gsb.currencyKey.localeCompare(gStableCoin.currencyKey) == 0
                  );
                });

                let balance = "";
                if (balances.length > 0) {
                  balance = balances[0].balance;
                }
                return (
                  <li className="list-group-item d-flex justify-content-between">
                    <div>
                      <span className="px-2">
                        <img
                          src={gStableCoin.icon}
                          alt="USDD"
                          width="32"
                          height="32"
                          className="rounded-circle flex-shrink-0"
                        />
                      <span>{gStableCoin.name}</span>
                      </span>
                    </div>
                    <div>{balance}</div>
                  </li>
                );
              })}
            </ul>
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
