import { useEffect, useState } from "react";
import walletPublisher from "../publishers/wallet";

import { ThreeDots } from "react-loader-spinner";
import { getCurrencies, getCurrency } from "../utils/currencies";
import WalletRewards from "./walletRewards";
import WalletDetails from "./walletDetails";
import WalletVaultDeposits from "./walletVaultDeposits";
import IncorrectNetwork from "./incorrectNetwork";

const WalletDashboard = (props) => {
  const { displayDetails, displayDeposits, displayRewards } = props;
  const [walletDetails, setWalletDetails] = useState({
    status: 1,
    isSupportedNetwork: false,
    address: "",
    network: "",
    usddBalance: "",
    vaultBalances: [],
    gStableBalances: [],
  });

  // const [stableCoins, setStableCoins] = useState([]);

  useEffect(() => {
    walletPublisher.attach(updateWalletDetails);
    return () => {
      walletPublisher.detach(updateWalletDetails);
    };
  }, []);

  const updateWalletDetails = async (walletDetails_) => {
    // let balances = await getBalances(walletDetails_);
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

  const getVaultBalances = async (currencies, walletDetails_) => {
    let vaultBalances = [];
    try {
      if (walletDetails_.address) {
        for (let index = 0; index < currencies.length; index += 1) {
          const currency = currencies[index];
          let vaultContract = await currency.vaultContract();
          let vaultBalData = await vaultContract.balanceOf(
            walletDetails_.address
          );
          let vaultRewards = await vaultContract.getPendingRewards(
            walletDetails_.address
          );
          vaultBalances.push({
            currencyKey: currency.key,
            balanceData: vaultBalData,
            rewards: vaultRewards,
          });
        }
      }
    } catch (error) {
      console.error(error);
    }

    return vaultBalances;
  };

  const getStableBalances = async (currencies, walletDetails_) => {
    let stableCoins = [];
    try {
      //gStable Data
      for (let index = 0; index < currencies.length; index += 1) {
        const currency = currencies[index];
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
      }
    } catch (error) {
      console.error();
    }
    return stableCoins;
  };

  const getBalances = async (walletDetails_) => {
    let usddBalance = await walletPublisher.getUSDDBalance();
    let vaultBalances = await getVaultBalances(getCurrencies(), walletDetails_);
    let gStableBalances = await getStableBalances(
      getCurrencies(),
      walletDetails_
    );
    setWalletDetails({
      ...walletDetails,
      usddBalance,
      vaultBalances,
      gStableBalances,
    });
  };

  const getStableCoinByCurrencyKey = (currencyKey) => {
    let scArray = walletDetails.gStableBalances.filter((sc) => {
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
            walletData={walletDetails}
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
            walletData={walletDetails}
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
          <WalletVaultDeposits walletData={walletDetails}></WalletVaultDeposits>
        ) : (
          <></>
        )}
      </>
    );
  };
  // if (!walletDetails || !walletDetails.isSupportedNetwork) {
  //   return (
  //     <>
  //       <div className="col-sm-4"></div>
  //       <div className="col-sm-4">
  //         <IncorrectNetwork></IncorrectNetwork>
  //       </div>
  //       <div className="col-sm-4"></div>
  //     </>
  //   );
  // }
  if (!walletDetails.gStableBalances.length) {
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
