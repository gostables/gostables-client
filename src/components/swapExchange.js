import { useEffect, useState } from "react";
import { usddContract } from "../contracts/usdContract";
import walletPublisher from "../publishers/wallet";
import USDDIcon from "./iconUSDD";
import { ThreeDots } from "react-loader-spinner";
import { getCurrency } from "../utils/currencies";
import { getSwapPublisherByCurrencyKey } from "../publishers/publishers";
import StableIcon from "./icon_gStable";
import { formatM, formatUSD } from "../utils/currencyFormatter";
import currencyPublisher from "../publishers/currency";
import { isCurrentNetworkSupported } from "../utils/network";
import networkPublisher from "../publishers/network";
import NetworkNotSupported from "./networkNotSupported";

const SwapExchange = (props) => {
  const [direction, setDirection] = useState(true);
  const [walletDetails, setWalletDetails] = useState();

  const [stableCoinValue, setStableCoinValue] = useState(0);
  const [tokenValue, setTokenValue] = useState(0);

  const [conversionRatio, setConversionRatio] = useState();
  const [swapFeesFactor, setSwapFeesFactor] = useState(0);
  const [trxHash, setTRXHash] = useState(null);

  const [currencyKey, setCurrencyKey] = useState(props.currencyKey);

  useEffect(() => {
    walletPublisher.attach(setWallet);
    return () => {
      walletPublisher.detach(setWallet);
    };
  }, []);

  const setWallet = (walletDetails_) => {
    setWalletDetails(walletDetails_);
  };

  useEffect(() => {
    init();
    return () => {
      console.log("unmounting swapExchange init");
    };
  }, []);

  const init = async () => {
    console.log("initializing with currencyKey : ", currencyKey);
    let currency = getCurrency(currencyKey);
    let swapContract = await currency.swapContract();
    let conversionRatio = await swapContract.getConversion(currency.id);
    let swapFeesFactor = await swapContract.getSwapFeesFactor(currency.id);
    setSwapDetails({ conversionRatio, swapFeesFactor });
    getSwapPublisherByCurrencyKey(currencyKey).attach(setSwapDetails);
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
    getSwapPublisherByCurrencyKey(currKey).attach(setSwapDetails);
  };

  const setSwapDetails = async (swapDetails) => {
    setConversionRatio(swapDetails.conversionRatio);
    setSwapFeesFactor(swapDetails.swapFeesFactor);
  };

  const updateStableCoinValue = (e) => {
    console.log("StableCoinValue : ", e.target.value);
    setStableCoinValue(e.target.value);
    console.log("converted : ", e.target.value * conversionRatio);
    setTokenValue(
      (e.target.value - e.target.value * swapFeesFactor) * conversionRatio
    );
  };
  // added to support network changes
  const [currentNetworkSupported, setIsCurrentNetworkSupported] =
    useState(false);

  useEffect(() => {
    setIsCurrentNetworkSupported(isCurrentNetworkSupported());
    networkPublisher.attach(handleCurrentNetworkSupported);
    return () => {
      console.log("unmounting Swap Exchange");
    };
  }, []);
  let handleCurrentNetworkSupported = async(supported) => {
    setIsCurrentNetworkSupported(supported);
    if(supported){
      await init();
    }
  }
  // to support network changes related code ends

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
              value={stableCoinValue}
              onChange={updateStableCoinValue}
            />
            <label htmlFor="floatingInputGroup1">Value in USDD</label>
          </div>
          <span className="input-group-text">
            <USDDIcon height={32}></USDDIcon>
          </span>
        </div>
        {walletDetails ? (
          <p className="small pb-3">
            Balance: {formatUSD(walletDetails.usddBalance)}
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
    if (conversionRatio != 0) {
      console.log("converted : ", e.target.value / conversionRatio);
      setStableCoinValue(
        (e.target.value - e.target.value * swapFeesFactor) / conversionRatio
      );
    }
  };
  const tokenJSX = (title) => {
    let balJSX = <></>;
    if (walletDetails && walletDetails.gStableBalances) {
      let gsbList = walletDetails.gStableBalances.filter(
        (gsb) => gsb.currencyKey.localeCompare(currencyKey) == 0
      );
      if (gsbList) {
        balJSX = (
          <>Balance: {gsbList.length ? formatM(gsbList[0].balance) : ""}</>
        );
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
              value={tokenValue}
              onChange={updateTokenValue}
            />
            <label htmlFor="floatingInputGroup2">Value in gStable</label>
          </div>
          <span className="input-group-text">
            <StableIcon height={32} currencyKey={currencyKey}></StableIcon>
          </span>
        </div>
        <p className="small pb-3">{balJSX}</p>
      </>
    );
  };

  const swap = async () => {
    let currency = getCurrency(currencyKey);
    let swapContract = await currency.swapContract();
    let usd = await usddContract();

    let hash = null;
    if (direction) {
      //swap USD for currency
      await usd.approve(swapContract.address, stableCoinValue);
      console.log("approved");
      hash = await swapContract.deposit(currency.id, stableCoinValue);
    } else {
      //swap currency for USD
      hash = await swapContract.withdraw(currency.id, tokenValue);
    }
    if (hash) setTRXHash(hash);
  };

  const clearHash = () => {
    setTRXHash(null);
  };

  const trxHashAlertJSX = () => {
    if (trxHash) {
      return (
        <div
          className="alert alert-primary alert-dismissible fade show mt-3"
          role="alert"
        >
          <div className="strong" style={{ fontSize: "95%" }}>
            Your{" "}
            <a
              href={`https://tronscan.org/#/transaction/${trxHash}`}
              className="alert-link"
              target="_blank"
            >
              Transaction
            </a>{" "}
            is being processed!
          </div>

          <button
            type="button"
            className="btn-close btn-close-white btn-sm"
            aria-label="Close"
            onClick={clearHash}
          ></button>
        </div>
      );
    }
    return <></>;
  };

  ////  if (!currentNetworkSupported) {
  ////   return <NetworkNotSupported></NetworkNotSupported>;
  //// }
  return (
    <>
    <div className="col"></div>
    <div className="card swap-card z-index-0 fadeIn3 fadeInBottom col-md-6 offset-md-3">
      <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
        <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
          <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">
            Swap
          </h4>

          {walletDetails && walletDetails.isSupportedNetwork ? (
            <div className="h6 text-white font-weight-bolder text-center mt-2 mb-0">
              Exchange Rate : 1 USDD ≈ {conversionRatio}{" "}
              {getCurrency(currencyKey).label}
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
              width="18"
              height="18"
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
            <div className="text-xs mt-20 d-flex justify-content-center">
                  <b>Fee ({swapFeesFactor * 100}%)</b>: ≈{" "}
                  {formatUSD(stableCoinValue * swapFeesFactor)}
            </div>
            
          </div>
          {trxHashAlertJSX()}
        </div>

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

    </>
  );
};
export default SwapExchange;
