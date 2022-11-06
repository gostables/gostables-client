import { useEffect, useState } from "react";
import { usddContract } from "../contracts/usdContract";
import walletPublisher from "../publishers/wallet";
import USDDIcon from "./iconUSDD";
import { ThreeDots } from "react-loader-spinner";
import { getCurrency } from "../utils/currencies";
import { getSwapPublisherByCurrencyKey } from "../publishers/publishers";
import StableIcon from "./icon_gStable";
import { formatM, formatUSD } from "../utils/currencyFormatter";

const SwapExchange = (props) => {
  const [direction, setDirection] = useState(true);
  const [walletDetails, setWalletDetails] = useState();

  const [stableCoinValue, setStableCoinValue] = useState(0);
  const [tokenValue, setTokenValue] = useState(0);

  const [conversionRatio, setConversionRatio] = useState();
  const [swapFeesFactor, setSwapFeesFactor] = useState();

  useEffect(() => {
    walletPublisher.attach(setWallet);
    return () => {
      walletPublisher.detach(setWallet);
    };
  }, []);

  const setWallet = (walletDetails) => {
    setWalletDetails(walletDetails);
  };

  useEffect(() => {
    getSwapPublisherByCurrencyKey(props.currencyKey).attach(setSwapDetails);
    return () => {
      getSwapPublisherByCurrencyKey(props.currencyKey).detach(setSwapDetails);
    };
  }, []);

  const setSwapDetails = async (swapDetails) => {
    setConversionRatio(swapDetails.conversionRatio);
    setSwapFeesFactor(swapDetails.swapFeesFactor);
  };

  const updateStableCoinValue = (e) => {
    console.log("StableCoinValue : ", e.target.value);
    setStableCoinValue(e.target.value);
  };

  const stableCoinJSX = () => {
    return (
      <>
        <div className="input-group mb-1" key={1}>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInputGroup1"
              placeholder="Value in USDD"
              onChange={updateStableCoinValue}
            />
            <label for="floatingInputGroup1">Value in USDD</label>
          </div>
          <span className="input-group-text">
            <USDDIcon height={32}></USDDIcon>
          </span>
        </div>
        {walletDetails ? (
          <p className="small pb-3">
            Balance: {formatUSD.format(walletDetails.usddBalance)}
          </p>
        ) : (
          <></>
        )}
      </>
    );
  };

  const updateTokenValue = (e) => {
    console.log("TokenValue : ", e.target.value);
    setTokenValue(e.target.value);
  };
  const tokenJSX = (title) => {
    let balJSX = <></>;
    if (walletDetails && walletDetails.gStableBalances) {
      let gsbList = walletDetails.gStableBalances.filter(
        (gsb) => gsb.currencyKey.localeCompare(props.currencyKey) == 0
      );
      if (gsbList) {
        balJSX = <>Balance: {formatM(gsbList[0].balance)}</>;
      }
    }
    return (
      <>
        <div className="input-group mb-1" key={2}>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInputGroup2"
              placeholder="Value in gStable"
              onChange={updateTokenValue}
            />
            <label for="floatingInputGroup2">Value in gStable</label>
          </div>
          <span className="input-group-text">
            <StableIcon
              height={32}
              currencyKey={props.currencyKey}
            ></StableIcon>
          </span>
        </div>
        <p className="small pb-3">{balJSX}</p>
      </>
    );
  };

  const swap = async () => {
    let currency = getCurrency(props.currencyKey);
    let swapContract = await currency.swapContract();
    let usd = await usddContract();

    if (direction) {
      //swap USD for currency
      await usd.approve(currency.swapAddress, stableCoinValue);
      console.log("approved");
      swapContract.deposit(stableCoinValue);
    } else {
      //swap currency for USD
      swapContract.withdraw(tokenValue);
    }
  };

  // console.log("gsb : ", walletDetails.gStableBalances);

  return (
    <div className="card swap-card z-index-0 fadeIn3 fadeInBottom">
      <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
        <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
          <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">
            Swap
          </h4>

          {walletDetails &&
          walletDetails.isSupportedNetwork &&
          conversionRatio ? (
            <div className="h6 text-white font-weight-bolder text-center mt-2 mb-0">
              Exchange Rate : 1 USDD ≈ {conversionRatio}{" "}
              {getCurrency(props.currencyKey).label}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      {walletDetails && walletDetails.isSupportedNetwork ? (
        <div className="card-body mt-20">
          <p className="text-left">You Swap</p>
          {direction ? stableCoinJSX("You Swap") : tokenJSX("You Swap")}
          <div className="d-flex justify-content-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-down-up"
              viewBox="0 0 16 16"
              onClick={() => setDirection(!direction)}
            >
              <path
                fillRule="evenodd"
                d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"
              />
            </svg>
          </div>
          <p className="text-left">For</p>

          {direction ? tokenJSX("For") : stableCoinJSX("For")}

          <div className="d-grid gap-2 mt-4">
            <button
              className="btn btn-primary swap-btn"
              type="button"
              onClick={swap}
            >
              Swap
            </button>
            {swapFeesFactor ? (
              <div className="text-xs mt-20">
                <span className="text-left">Fee:</span>
                <span className="text-right">
                  <b>{swapFeesFactor * 100}%</b>
                </span>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
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
  );
};
export default SwapExchange;
