import { useEffect, useState } from "react";
import walletPublisher from "../publishers/wallet";

import { ThreeDots } from "react-loader-spinner";
import { getCurrencies, getCurrency } from "../utils/currencies";
import WalletRewards from "./walletRewards";
import WalletDetails from "./walletDetails";
import WalletVaultDeposits from "./walletVaultDeposits";

const WalletDashboard = (props) => {
  const { displayDetails, displayDeposits, displayRewards } = props;
  const [walletData, setWalletDetails] = useState({
    status: 1,
    isSupportedNetwork: false,
    address: "",
    network: "",
    usddBalance: "",
    vaultBalances: [],
  });

  const [stableCoins, setStableCoins] = useState([]);

  useEffect(() => {
    walletPublisher.attach(setWalletDetails);
    return () => {
      walletPublisher.detach(setWalletDetails);
    };
  }, []);

  useEffect(() => {
    init();

    return () => {
      console.log("unmounting WalletDashboard");
    };
  }, []);
  const init = async () => {
    try {
      //gStable Data
      let stableCoins = [];
      getCurrencies().map(async (currency) => {
        let gStableContract = await currency.gStableContract();
        let { name: gStableCoinName, symbol: gStableCoinSymbol } =
          await gStableContract.getNameSymbol();
        let swapContract = await currency.swapContract();
        let conversionRatio = await swapContract.getConversion();
        stableCoins.push({
          name: gStableCoinName,
          symbol: gStableCoinSymbol,
          icon: currency.icon,
          currencyKey: currency.key,
          conversionRatio,
        });
      });
      setStableCoins(stableCoins);
    } catch (error) {
      console.error();
    }
  };

  const getStableCoinByCurrencyKey = (currencyKey) => {
    let scArray = stableCoins.filter((sc) => {
      return sc.currencyKey.localeCompare(currencyKey) == 0;
    });
    if (!scArray.length) throw new Error(`uh oh ${currencyKey}`);
    return scArray[0];
  };

  let countColumns = [displayDetails, displayDeposits, displayRewards].reduce(
    function (count, currentValue) {
      return (
        count[currentValue] ? ++count[currentValue] : (count[currentValue] = 1),
        count
      );
    },
    {}
  );

  let colWidth = 12 / countColumns.true;

  return (
    <>
      <div className={`col-sm-${colWidth}`}>
        {displayDetails ? (
          <WalletDetails
            walletData={walletData}
            stableCoins={stableCoins}
            getStableCoinByCurrencyKey={getStableCoinByCurrencyKey}
          ></WalletDetails>
        ) : (
          <></>
        )}
      </div>
      <div className={`col-sm-${colWidth}`}>
        {displayRewards ? (
          <WalletRewards
            walletData={walletData}
            stableCoins={stableCoins}
            getStableCoinByCurrencyKey={getStableCoinByCurrencyKey}
          ></WalletRewards>
        ) : (
          <></>
        )}
      </div>
      <div className={`col-sm-${colWidth}`}>
        {displayDeposits ? (
          <WalletVaultDeposits walletData={walletData}></WalletVaultDeposits>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default WalletDashboard;
