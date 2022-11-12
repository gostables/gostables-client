import { ThreeDots } from "react-loader-spinner";
import USDDIcon from "./iconUSDD";
import { formatM, formatUSD } from "../utils/currencyFormatter";
import StableIcon from "./icon_gStable";

const WalletDetails = (props) => {
  const { walletData, getStableCoinByCurrencyKey } = props;

  const portfolioJSX = () => {
    if (!walletData || !walletData.isSupportedNetwork) {
      return <></>;
    }
    let total = parseFloat(walletData.usddBalance);
    for (let index = 0; index < walletData.gStableBalances.length; index++) {
      let cr = getStableCoinByCurrencyKey(
        walletData.gStableBalances[index].currencyKey
      ).conversionRatio;
      let bal = parseFloat(walletData.gStableBalances[index].balance);
      if (cr != 0) {
        total += bal / cr;
      } else {
        total += bal;
      }
    }
    return (
      <>
        <div className="text-center">
          <p className="small">Total Balance (USDD)</p>
          <h5 className="fw-bold">{formatUSD(total)}</h5>
        </div>
      </>
    );
  };

  return (
    <div className="card wallet-card z-index-0 fadeIn3 fadeInBottom">
      <div className="card-header portfolio-bal p-0 position-relative mt-n4 mx-3 z-index-2">
        <div className="bg-gradient-info shadow-info border-radius-lg py-3 pe-1">
          {portfolioJSX()}
        </div>
      </div>
      <div className="card-body">
        {walletData.isSupportedNetwork ? (
          <>
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between">
                <div>
                  <USDDIcon height={24}></USDDIcon>
                </div>
                <div className="small">{formatM(walletData.usddBalance)}</div>
              </li>
              {walletData.gStableBalances.map((stableCoin) => {
                let balances = walletData.gStableBalances.filter((gsb) => {
                  return (
                    gsb.currencyKey.localeCompare(stableCoin.currencyKey) == 0
                  );
                });

                let balance = "";
                if (balances.length > 0) {
                  balance = balances[0].balance;
                }
                return (
                  <li className="list-group-item d-flex justify-content-between">
                    <div>
                      <StableIcon
                        currencyKey={stableCoin.currencyKey}
                        height="24"
                      ></StableIcon>
                    </div>
                    <div className="small">{formatM(balance)}</div>
                  </li>
                );
              })}
            </ul>
          </>
        ) : (
          <>
            <div className="mt-2 w-100 d-flex justify-content-center">
              <ThreeDots
                height="64"
                width="64"
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

export default WalletDetails;
