import { useEffect, useState } from "react";
import { ttdd } from "../contracts/gStableContract ";
import { ttddMarket } from "../contracts/marketContract";
import { ttddSwap } from "../contracts/swapContract";
import { usddContract } from "../contracts/usdContract";
import { getCurrency } from "../utils/currencies";
import ClearAccumulatedSwapFees from "./clearAccumulatedSwapFees";
import ContractClientManager from "./contractClientManager";
import GoStableBaseManager from "./goStableBaseManager";
import SetConversionRatio from "./setConversionRatio";
import SetRewardsPercent from "./setRewardsPercent";
import SetSwapFeesFactor from "./setSwapFeesFactor";
import TreasuryManager from "./treasuryManager";

const SwapAdmin = (props) => {
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
  const [swapContract, setSwapContract] = useState(null);
  useEffect(() => {
    initSwapContract();
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
      let swapContract_ = swapContract;
      let currency = getCurrency(props.currencyKey);
      if (!swapContract) {
        swapContract_ = await currency.swapContract();
        setSwapContract(swapContract_);
      }

      let swapDetails = await swapContract_.getDetails();

      //Market coin data
      let marketContract = await currency.marketContract();
      let marketCoinBalance = await marketContract.balanceOf(
        swapContract_.address
      );
      let { name: marketCoinName, symbol: marketCoinSymbol } =
        await marketContract.getNameSymbol();
      //gStable Data
      let gStableContract = await currency.gStableContract();
      let { name: gStableCoinName, symbol: gStableCoinSymbol } =
        await gStableContract.getNameSymbol();

      swapDetails = {
        ...swapDetails,
        marketCoinBalance,
        marketCoinName,
        marketCoinSymbol,
        gStableCoinName,
        gStableCoinSymbol,
      };
      setDetails(swapDetails);
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
        <ContractClientManager
          address={getCurrency(props.currencyKey).swapAddress}
          key={getCurrency(props.currencyKey).swapAddress}
        ></ContractClientManager>
        <hr />
        <h6 className="card-title">Balances</h6>
        <p>
          {details.marketCoinName} : {details.marketCoinBalance}
        </p>
        <hr />
        <TreasuryManager
          address={getCurrency(props.currencyKey).swapAddress}
          key={
            getCurrency(props.currencyKey).swapAddress + "SwapTreasuryManager"
          }
        ></TreasuryManager>
        <hr />
        <GoStableBaseManager
          address={getCurrency(props.currencyKey).swapAddress}
          key={
            getCurrency(props.currencyKey).swapAddress + "GoStableBaseManager"
          }
        ></GoStableBaseManager>
        <hr />
        <p>
          1 USD ≈ {details.conversion} {details.gStableCoinName}
        </p>
        <SetConversionRatio
          swapContract={swapContract}
          {...props}
        ></SetConversionRatio>
        <hr />
        <p>Swap Fees Factor : {details.swapFeesFactor}</p>
        <p>Accumulated Swap Fees : {details.accumulatedSwapFees}</p>
        <SetSwapFeesFactor swapContract={swapContract}></SetSwapFeesFactor>
        <hr />
        <p>Rewards Percent : {details.rewardsPC}</p>
        <SetRewardsPercent swapContract={swapContract}></SetRewardsPercent>
        <br />
        <ClearAccumulatedSwapFees {...props}></ClearAccumulatedSwapFees>
      </div>
    </div>
  );
};

export default SwapAdmin;
