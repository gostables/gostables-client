import { useEffect, useState } from "react";
import walletPublisher from "../publishers/wallet";
import usddImg from "../usdd.png";
import { ThreeDots } from "react-loader-spinner";
import { getCurrencies, getCurrency } from "../utils/currencies";
import StableIcon from "./icon_gStable";
import { formatM, formatUSD } from "../utils/currencyFormatter";

const WalletRewards = (props) => {
  const { walletData, stableCoins, getStableCoinByCurrencyKey } = props;

  const claim = async (currencyKey) => {
    let currency = getCurrency(currencyKey);
    let vaultContract = await currency.vaultContract();
    debugger;
    await vaultContract.claimPendingRewards(walletData.address);
  };

  const rewardsJSX = () => {
    if (!walletData || !walletData.isSupportedNetwork) {
      return <></>;
    }
    let rewards = walletData.vaultBalances.filter((vb) => vb.rewards > 0);
    if (!rewards.length) {
      return <></>;
    }
    return (
      <>
        <div className="list-group"></div>
        {walletData.vaultBalances.map((vb) => (
          <>
            <div className="d-flex justify-content-between w-100">
              <p>
                <StableIcon
                  currencyKey={vb.currencyKey}
                  height="32"
                ></StableIcon>
                {formatM(vb.rewards)}
              </p>
              <button
                type="button"
                className="btn btn-primary px-3 "
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
    if (!walletData || !walletData.isSupportedNetwork) {
      return <></>;
    }
    let total = 0;
    for (let index = 0; index < walletData.vaultBalances.length; index++) {
      let cr = getStableCoinByCurrencyKey(
        walletData.gStableBalances[index].currencyKey
      ).conversionRatio;
      let bal = parseFloat(walletData.vaultBalances[index].rewards);
      total += bal / cr;
    }
    return (
      <>
        <div className="text-center">
          <p className="small">Total Pending Rewards (USDD)</p>
          <h5 className="fw-bold">{formatUSD.format(total)}</h5>
        </div>
      </>
    );
  };

  return (
    <div className="card dash-card z-index-0 fadeIn3 fadeInBottom">
      <div className="card-header dashboard p-0 position-relative mt-n4 mx-3 z-index-2">
        <div className="bg-gradient-info shadow-info border-radius-lg py-3 pe-1">
          <div className="text-center dash-stats">
            <div className="row mt-1">
              <div className="col-sm-12">{portfolioJSX()}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="card-body">
        {walletData.isSupportedNetwork ? (
          <>
            <div>{rewardsJSX()}</div>
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

export default WalletRewards;
