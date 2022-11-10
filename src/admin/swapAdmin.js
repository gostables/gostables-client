import { useEffect, useState } from "react";
import currencyPublisher from "../publishers/currency";
import { getCurrency } from "../utils/currencies";
import Balances from "./balances";
import ClearAccumulatedSwapFees from "./clearAccumulatedSwapFees";
import ContractClientManager from "./contractClientManager";
import GoStableBaseManager from "./goStableBaseManager";
import SetConversionRatio from "./setConversionRatio";
import SetRewardsPercent from "./setRewardsPercent";
import SetSwapFeesFactor from "./setSwapFeesFactor";
import TreasuryManager from "./treasuryManager";

const SwapAdmin = (props) => {
  const [swapContract, setSwapContract] = useState(null);
  const [currencyKey, setCurrencyKey] = useState(props.currencyKey);
  useEffect(() => {
    currencyPublisher.attach(updateCurrency);
    return () => {
      currencyPublisher.detach(updateCurrency);
    };
  }, []);
  const updateCurrency = (currKey) => {
    console.log("updating currency swap admin : ", currKey);
    setCurrencyKey(currKey);
    initSwapContract();
  };

  const initSwapContract = async () => {
    try {
      let currency = getCurrency(currencyKey);
      if (!swapContract) {
        let swapContract = await currency.swapContract();
        setSwapContract(swapContract);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title text-center">Swap Admin</h5>
        <p>{getCurrency(currencyKey).swapAddress} </p>
        <hr />
        <ContractClientManager
          address={getCurrency(currencyKey).swapAddress}
          key={getCurrency(currencyKey).swapAddress}
        ></ContractClientManager>
        <hr />
        <Balances
          address={getCurrency(currencyKey).swapAddress}
          currencyKey={currencyKey}
          key={getCurrency(currencyKey).swapAddress + "Balances"}
        ></Balances>
        <hr />
        <TreasuryManager
          address={getCurrency(currencyKey).swapAddress}
          key={getCurrency(currencyKey).swapAddress + "SwapTreasuryManager"}
        ></TreasuryManager>
        <hr />
        <GoStableBaseManager
          address={getCurrency(currencyKey).swapAddress}
          key={getCurrency(currencyKey).swapAddress + "GoStableBaseManager"}
        ></GoStableBaseManager>
        <hr />

        <SetConversionRatio
          currencyKey={currencyKey}
          key={getCurrency(currencyKey).swapAddress + "SetConversionRatio"}
        ></SetConversionRatio>
        <hr />

        <SetSwapFeesFactor
          currencyKey={currencyKey}
          key={getCurrency(currencyKey).swapAddress + "SetSwapFeesFactor"}
        ></SetSwapFeesFactor>
        <hr />
        <SetRewardsPercent
          currencyKey={currencyKey}
          key={getCurrency(currencyKey).swapAddress + "SetRewardsPercent"}
        ></SetRewardsPercent>
        <hr />
        <ClearAccumulatedSwapFees
          currencyKey={currencyKey}
          key={
            getCurrency(currencyKey).swapAddress + "ClearAccumulatedSwapFees"
          }
        ></ClearAccumulatedSwapFees>
      </div>
    </div>
  );
};

export default SwapAdmin;
