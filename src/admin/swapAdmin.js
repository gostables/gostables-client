import { useEffect, useState } from "react";
import { ttdd } from "../contracts/gStableContract ";
import { ttddMarket } from "../contracts/marketContract";
import { ttddSwap } from "../contracts/swapContract";
import { usddContract } from "../contracts/usdContract";
import { getCurrency } from "../utils/currencies";
import SetConversionRatio from "./setConversionRatio";
import SetSwapFeesFactor from "./setSwapFeesFactor";

const SwapAdmin = () => {
  const [details, setDetails] = useState({
    status: false,
    address: "",
    conversion: "",
    stableCoinAddress: "",
    accumulatedSwapFees: 0,
    swapFeesFactor: 0,
    marketAddress: "",
    marketCoinBalance: 0,
  });
  const [swapContract, setSwapContract] = useState({});
  useEffect(() => {
    let timer = setInterval(() => {
      initSwapContract();
    }, 5 * 1000);

    return () => {
      clearInterval(timer);
      console.log("unmounting swapAdmin");
    };
  }, []);

  const initSwapContract = async () => {
    try {
      let swapContract = await ttddSwap();

      let swapDetails = await swapContract.getDetails();
      //Market coin data
      let marketContract = await ttddMarket();
      let marketCoinBalance = await marketContract.balanceOf(
        swapContract.address
      );
      let { name: marketCoinName, symbol: marketCoinSymbol } =
        await marketContract.getNameSymbol();
      //gStable Data
      let gStableContract = await ttdd();
      let { name: gStableCoinName, symbol: gStableCoinSymbol } =
        await gStableContract.getNameSymbol();

      // usdd data
      let usdd = await usddContract();
      let ttddCurr = getCurrency("TTDD");
      let usddBalance = await usdd.balanceOf(ttddCurr.swapAddress);

      swapDetails = {
        ...swapDetails,
        marketCoinBalance,
        marketCoinName,
        marketCoinSymbol,
        gStableCoinName,
        gStableCoinSymbol,
        usddBalance,
      };
      setDetails(swapDetails);

      setSwapContract(swapContract);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title text-center">Swap Admin</h5>
        <p>{window.tronWeb.address.fromHex(details.address)} </p>
        <hr />
        <h6 className="card-title">Balances</h6>
        <p>
          {details.marketCoinName} : {details.marketCoinBalance}
        </p>
        <p>USDD : {details.usddBalance}</p>
        <hr />
        <h6 className="card-title">Addresses</h6>
        <p>
          Stable Coin :{" "}
          {window.tronWeb.address.fromHex(details.stableCoinAddress)}{" "}
        </p>
        <p>Market : {window.tronWeb.address.fromHex(details.marketAddress)} </p>
        <hr />
        <h6 className="card-title">Conversion Ratio</h6>
        <p>
          1 USD ≈ {details.conversion} {details.gStableCoinName}
        </p>
        <SetConversionRatio swapContract={swapContract}></SetConversionRatio>
        <hr />
        <h6 className="card-title">Protocol Fees</h6>
        <p>Swap Fees Factor : {details.swapFeesFactor}</p>
        <p>Accumulated Swap Fees : {details.accumulatedSwapFees}</p>
        <SetSwapFeesFactor swapContract={swapContract}></SetSwapFeesFactor>
      </div>
    </div>
  );
};

export default SwapAdmin;
