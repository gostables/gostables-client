import usddImg from "../usdd.png";
import { ThreeDots } from "react-loader-spinner";
import { getCurrencies, getCurrency } from "../utils/currencies";
import USDDIcon from "./iconUSDD";
import { formatUSD } from "../utils/currencyFormatter";

const WalletVaultDeposits = (props) => {
  const { walletData } = props;

  const depositsJSX = () => {
    if (!walletData || !walletData.isSupportedNetwork) {
      return <></>;
    }
    return (
      <>
        <ul class="list-group mb-3">
          {walletData.vaultBalances.map((vb) => (
            <>
              <li class="list-group-item d-flex justify-content-between lh-sm border-0">
                <div>
                  <h6 class="my-0">
                    {formatUSD.format(vb.balanceData.balance)}
                  </h6>
                  <div class="small text-muted  py-2">
                    till {vb.balanceData.lock.toLocaleString()}
                  </div>
                </div>
                <span class="text-muted">
                  {getCurrency(vb.currencyKey).label}
                </span>
              </li>
            </>
          ))}
        </ul>
      </>
    );
  };
  const portfolioJSX = () => {
    if (!walletData || !walletData.isSupportedNetwork) {
      return <></>;
    }
    let total = 0;
    for (let index = 0; index < walletData.vaultBalances.length; index++) {
      let bal = parseFloat(walletData.vaultBalances[index].balanceData.balance);
      total += bal;
    }
    return (
      <>
        <div className="text-center">
          <p className="small">Total Value Locked (USDD)</p>
          <h5 className="fw-bold">{formatUSD.format(total)}</h5>
        </div>
      </>
    );
  };

  return (
    <div className="card dash-card z-index-0 fadeIn3 fadeInBottom">
      <div className="card-header dashboard p-0 position-relative mt-n4 mx-3 z-index-2">
        <div className="bg-gradient-info shadow-info border-radius-lg py-3 pe-1">
          <div className="text-center dash-stats">
            <div className="row mt-1">{portfolioJSX()}</div>
          </div>
        </div>
      </div>
      <div className="card-body">
        {walletData.isSupportedNetwork ? (
          <>
            <div>{depositsJSX()}</div>
          </>
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
    </div>
  );
};

export default WalletVaultDeposits;
