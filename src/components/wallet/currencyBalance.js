import { useEffect, useState } from "react";
import walletPublisher from "../../publishers/wallet";
import { formatM, formatUSD } from "../../utils/currencyFormatter";

const CurrencyBalance = (props) => {
  const { currency, updateTotal } = props;
  const [balance, setBalance] = useState("");
  const [conversionRatio, setConversionRatio] = useState("");

  useEffect(() => {
    read();

    return () => {
      console.log(`unmounting CurrencyBalance ${currency.key}`);
    };
  }, []);
  const read = async () => {
    let gStableContract = await currency.gStableContract();
    let gStableBal = "";
    if (walletPublisher.walletDetails) {
      gStableBal = await gStableContract.balanceOf(
        walletPublisher.walletDetails.address
      );
      setBalance(gStableBal);
    }

    let swapContract = await currency.swapContract();
    let conversionRatio = await swapContract.getConversion();
    setConversionRatio(conversionRatio);
    if (gStableBal && conversionRatio) {
      updateTotal({
        balance: gStableBal / conversionRatio,
        currencyKey: currency.key,
      });
    }
  };

  return (
    <li class="list-group-item">
      <div>
        <img src={currency.icon} height="24"></img>
        <span className="px-3">
          <span className="px-1">{currency.label}</span>
          {formatM(balance)}
        </span>
      </div>
      <div className="d-flex justify-content-between small text-muted">
        {conversionRatio ? (
          <span>
            Exchange Rate : 1$ ≈ {conversionRatio}
            <span className="px-1">{currency.label}</span>
          </span>
        ) : (
          ""
        )}
        {conversionRatio ? formatUSD(balance / conversionRatio) : ""}
      </div>
    </li>
  );
};

export default CurrencyBalance;
