import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { usddContract } from "../contracts/usdContract";
import currencyPublisher from "../publishers/currency";
import walletPublisher from "../publishers/wallet";
import { formatM, formatUSD } from "../utils/currencyFormatter";
import USDDIcon from "./iconUSDD";
import StableIcon from "./icon_gStable";
import emptyImg from "../empty.png";
import { getCurrency } from "../utils/currencies";

const WalletForCurrency = (props) => {
  const [walletDetails, setWalletDetails] = useState({
    status: 1,
    isSupportedNetwork: false,
    address: "",
    network: "",
    usddBalance: "",
    vaultBalances: [],
    gStableBalances: [],
  });
  const [currencyKey, setCurrencyKey] = useState(props.currencyKey);

  useEffect(() => {
    walletPublisher.attach(updateWalletDetails);
    return () => {
      walletPublisher.detach(updateWalletDetails);
    };
  }, []);

  const updateWalletDetails = async (walletDetails_) => {
    let walletDetailsNew = {
      status: walletDetails_.status,
      isSupportedNetwork: walletDetails_.isSupportedNetwork,
      address: walletDetails_.address,
      network: walletDetails_.network,
      usddBalance: walletDetails_.usddBalance,
      vaultBalances: walletDetails_.vaultBalances,
      gStableBalances: walletDetails_.gStableBalances,
    };
    console.log(walletDetailsNew);
    setWalletDetails(walletDetailsNew);
  };

  useEffect(() => {
    currencyPublisher.attach(updateCurrency);
    return () => {
      currencyPublisher.detach(updateCurrency);
    };
  }, []);

  const updateCurrency = (currKey) => {
    console.log("updating currency : ", currKey);
    setCurrencyKey(currKey);
  };

  const claim = async (currencyKey) => {
    let currency = getCurrency(currencyKey);
    let vaultContract = await currency.vaultContract();
    await vaultContract.claimPendingRewards(walletDetails.address);
  };

  const rewardsJSX = () => {
    let rewards = walletDetails.vaultBalances.filter((vb) => vb.rewards > 0);
    if (!rewards.length) {
      return emptyVaultJSX("No Pending Rewards yet", "Rewards", "d-none");
    }
    return (
      <>
        <h6 className="mt-3">Rewards</h6>
        <ul className="list-group list-group-flush">
          {walletDetails.vaultBalances.map((vb) =>
            vb.rewards > 0 ? (
              <>
                <li className="list-group-item">
                  <div className="row">
                    <div className="col-4">
                      <StableIcon
                        currencyKey={vb.currencyKey}
                        height="24"
                      ></StableIcon>
                    </div>
                    <div className="col">
                      <span className="small text-right">{formatM(vb.rewards)}</span>
                    </div>
                  </div>
                  <div className="text-center">
                  <button
                    type="button"
                    className="btn btn-danger btn-sm w-100"
                    onClick={() => claim(vb.currencyKey)}
                  >
                    Claim
                  </button>
                  </div>
                </li>
              </>
            ) : (
              <></>
            )
          )}
        </ul>
      </>
    );
  };

  const emptyVaultJSX = (title, type, hide) => {
    return (
      <>
        <h6 className="mt-3">{type}</h6>
        <ul className="list-group list-group-flush">
        <li className="list-group-item">
        <div className="justify-content-center text-center">
          <img
            src={emptyImg}
            alt="empty"
            style={{ height: "48px", opacity: "0.15" }}
          />
          <br />
          <p className="text-muted small">
            {title}<br/>
            <span className={hide}>
              <a href="/vault">                  
                <button
                    type="button"
                    className="btn btn-primary btn-sm mt-2"
                  >
                    gStable Vaults
                </button>
              </a>
            </span>
          </p>
        </div>
        </li>
        </ul>
      </>
    );
  };

  const depositsJSX = () => {
    let deposits = walletDetails.vaultBalances.filter((vb) => {
      return vb.balanceData.balance > 0;
    });
    if (!deposits.length) {
      return emptyVaultJSX("Start earning Rewards with", "Vault Deposits");
    }
    return (
      <>
        <h6 className="mt-3">Vault Deposits</h6>
        <ul class="list-group mb-3">
          {walletDetails.vaultBalances.map((vb) =>
            vb.balanceData.balance > 0 ? (
              <>
                <li class="list-group-item d-flex justify-content-between lh-sm border-0">
                  <div>
                    <div class="my-0">{formatUSD(vb.balanceData.balance)}</div>
                    <div class="small text-muted  py-2">
                      till {vb.balanceData.lock.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <span class="text-muted">
                      <USDDIcon height={24}></USDDIcon>
                    </span>
                  </div>
                </li>
              </>
            ) : (
              <></>
            )
          )}
        </ul>
      </>
    );
  };

  return (
    <div className="card dash-card z-index-0 fadeIn3 fadeInBottom">
      <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
        <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
          <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">
            Wallet
          </h4>
        </div>
      </div>
      <div className="card-body">
        {walletDetails.isSupportedNetwork ? (
          <>
            <h6>Balances</h6>
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between">
                <div>
                  <USDDIcon height={24}></USDDIcon>
                </div>
                <div className="small">
                  {formatM(walletDetails.usddBalance)}
                </div>
              </li>
              {walletDetails.gStableBalances.map((stableCoin) => {
                let balances = walletDetails.gStableBalances.filter((gsb) => {
                  return (
                    gsb.currencyKey.localeCompare(stableCoin.currencyKey) == 0
                  );
                });

                let balance = "";
                if (balances.length > 0) {
                  balance = balances[0].balance;
                }
                return (
                  <li className="list-group-item d-flex justify-content-between">
                    <div>
                      <StableIcon
                        currencyKey={stableCoin.currencyKey}
                        height="24"
                      ></StableIcon>
                    </div>
                    <div className="small">{formatM(balance)}</div>
                  </li>
                );
              })}
            </ul>
            {rewardsJSX()}

            {depositsJSX()}
          </>
        ) : (
          <>
            <div className="mt-2 w-100 d-flex justify-content-center">
              <ThreeDots
                height="64"
                width="64"
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
export default WalletForCurrency;
