import { useEffect, useState } from "react";
import ttddSwapPublisher from "../publishers/swap";
import { usddContract } from "../contracts/usdContract";
import walletPublisher from "../publishers/wallet";
import usddImg from "../usdd.png";
import ttddImg from "../ttdd.png";
import { ttddSwap as ttddSwap_ } from "../contracts/swapContract";
import { ThreeDots } from "react-loader-spinner";


const SwapExchange = () => {
  const [direction, setDirection] = useState(true);
  const [address, setAddress] = useState();

  const [stableCoinValue, setStableCoinValue] = useState(0);
  const [tokenValue, setTokenValue] = useState(0);

  const [conversionRatio, setConversionRatio] = useState();
  const [swapFeesFactor, setSwapFeesFactor] = useState();

  useEffect(() => {
    walletPublisher.attach(setWalletDetails);
    return () => {
      walletPublisher.detach(setWalletDetails);
    };
  }, []);


  const setWalletDetails = (walletDetails) => {
    setAddress(walletDetails.address);
  };


  useEffect(() => {
    ttddSwapPublisher.attach(setSwapDetails);
    return () => {
      ttddSwapPublisher.detach(setSwapDetails);
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
      <div class="input-group mb-3" key={1}>
        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            id="floatingInputGroup1"
            placeholder="Value in USDD"
            onChange={updateStableCoinValue}
          />
          <label for="floatingInputGroup1">Value in USDD</label>
        </div>
        <span class="input-group-text">
          <img
            src={usddImg}
            alt="USDD"
            width="32"
            height="32"
            class="rounded-circle flex-shrink-0"
          />
        </span>
      </div>
    );
  };

  const updateTokenValue = (e) => {
    console.log("TokenValue : ", e.target.value);
    setTokenValue(e.target.value);
  };
  const tokenJSX = (title) => {
    return (
      <div class="input-group mb-3" key={2}>
        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            id="floatingInputGroup2"
            placeholder="Value in gStable"
            onChange={updateTokenValue}
          />
          <label for="floatingInputGroup2">Value in gStable</label>
        </div>
        <span class="input-group-text">
          <img
            src={ttddImg}
            alt="gStable"
            width="32"
            height="32"
            class="rounded-circle flex-shrink-0"
          />
        </span>
      </div>
    );
  };

  const swap = async () => {
    let ttddSwap = await ttddSwap_();
    let usd = await usddContract();

    if (direction) {
      //swap USD for TTD
      await usd.approve(ttddSwap.address, stableCoinValue);
      console.log("approved");
      ttddSwap.deposit(stableCoinValue);
    } else {
      //swap TTD for USD
      ttddSwap.withdraw(tokenValue);
    }
  };

  return (
    <div class="card z-index-0 fadeIn3 fadeInBottom">
      <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
        <div class="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
          <h4 class="text-white font-weight-bolder text-center mt-2 mb-0">
            Swap
          </h4>
          {conversionRatio ? (
            <div className="h6 text-white font-weight-bolder text-center mt-2 mb-0">
              Exchange Rate : 1 USD ≈ {conversionRatio} gTTD
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      {address ? (
        <div className="card-body mt-20">
          <p className="text-left">You Swap</p>
          <p className="text-right">Balance: XXX</p>
          {direction ? stableCoinJSX("You Swap") : tokenJSX("You Swap")}
          <div className="d-flex justify-content-center pt-x">
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
          <p className="text-right">Balance: YYY</p>
          {direction ? tokenJSX("For") : stableCoinJSX("For")}

          <div className="d-grid gap-2 mt-4">
            <button className="btn btn-primary" type="button" onClick={swap}>
              Swap
            </button>
            {swapFeesFactor ? (
              <div class="text-xs text-center mt-20">
                Protocol Fee: {swapFeesFactor * 100}%{" "}
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
