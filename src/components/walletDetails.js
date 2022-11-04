import { useEffect, useState } from "react";
import walletPublisher from "../publishers/wallet";
import usddImg from "../usdd.png";
import { ThreeDots } from "react-loader-spinner";
import { getCurrencies, getCurrency } from "../utils/currencies";

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

  const get_gStableCoin = (currencyKey) => {
    let gscList = gStableCoins.filter(
      (gsc) => gsc.currencyKey.localeCompare(currencyKey) == 0
    );
    if (gscList.length) {
      return gscList[0];
    }
    return null;
  };

  const claim = async (currencyKey) => {
    let currency = getCurrency(currencyKey);
    let vaultContract = await currency.vaultContract();
    debugger;
    await vaultContract.claimPendingRewards(walletDetails.address);
  };

  const rewardsJSX = () => {
    if (!walletDetails || !walletDetails.isSupportedNetwork) {
      return <></>;
    }
    let rewards = walletDetails.vaultBalances.filter((vb) => vb.rewards > 0);
    if (!rewards.length) {
      return <></>;
    }
    return (
      <>
        <p className="h6 card-title my-3">Vault Rewards</p>
        <div className="list-group"></div>
        {walletDetails.vaultBalances.map((vb) => (
          <>
            <div className="d-flex justify-content-between w-100">
              <p>
                <span className="px-2">
                  <img
                    src={getCurrency(vb.currencyKey).icon}
                    alt="USDD"
                    width="32"
                    height="32"
                    className="rounded-circle flex-shrink-0"
                  />
                </span>
                {vb.rewards}{" "}
                {/* {get_gStableCoin(vb.currencyKey) != null
                  ? get_gStableCoin(vb.currencyKey).name
                  : ""}{" "} */}
                {getCurrencies(vb.currencyKey).length
                  ? getCurrencies(vb.currencyKey)[0].label
                  : ""}
              </p>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => claim(vb.currencyKey)}
              >
                Claim
              </button>
            </div>
          </>
        ))}
      </>
    );
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
            {rewardsJSX()}
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
