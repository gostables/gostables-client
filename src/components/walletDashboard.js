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
    walletPublisher.getUSDDBalance();
    walletPublisher.attach(setWalletDetails);
    return () => {
      walletPublisher.detach(setWalletDetails);
    };
  }, []);

  useEffect(() => {
    getBalances();
    return () => {
      console.log("unmounting WalletDashboard balances");
    };
  }, []);

  const getBalances = async () => {
    let usddBalance = await walletPublisher.getUSDDBalance();
    let vaultBalances = await walletPublisher.getVaultBalances();
    setWalletDetails({ ...walletData, usddBalance, vaultBalances });
  };

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

  const detailsJSX = () => {
    return (
      <>
        {displayDetails ? (
          <WalletDetails
            walletData={walletData}
            stableCoins={stableCoins}
            getStableCoinByCurrencyKey={getStableCoinByCurrencyKey}
          ></WalletDetails>
        ) : (
          <></>
        )}
      </>
    );
  };

  const rewardsJSX = () => {
    return (
      <>
        {displayRewards ? (
          <WalletRewards
            walletData={walletData}
            stableCoins={stableCoins}
            getStableCoinByCurrencyKey={getStableCoinByCurrencyKey}
          ></WalletRewards>
        ) : (
          <></>
        )}
      </>
    );
  };

  const depositsJSX = () => {
    return (
      <>
        {displayDeposits ? (
          <WalletVaultDeposits walletData={walletData}></WalletVaultDeposits>
        ) : (
          <></>
        )}
      </>
    );
  };

  if (!stableCoins.length) {
    return (
      <>
        <div className="mt-5 w-100 d-flex justify-content-center">
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
    );
  }

  return (
    <>
      <div className={`col-sm-${colWidth}`}>{detailsJSX()}</div>
      <div className={`col-sm-${colWidth}`}>{rewardsJSX()}</div>
      <div className={`col-sm-${colWidth}`}>{depositsJSX()}</div>
    </>
  );
};

export default WalletDashboard;
