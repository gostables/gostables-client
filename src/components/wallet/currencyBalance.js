import { useEffect, useState } from "react";
import walletPublisher from "../../publishers/wallet";
import { formatM, formatUSD } from "../../utils/currencyFormatter";

const CurrencyBalance = (props) => {
  const { currency, updateTotal, index } = props;
  const [balance, setBalance] = useState("");
  const [conversionRatio, setConversionRatio] = useState("");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      read();
    }, index * 1000);
    return () => {
      console.log(`unmounting CurrencyBalance ${currency.key}`);
    };
  }, []);
  const read = async () => {
    try {
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
    } catch (error) {
      console.error(error);
      if (attempt < 10) {
        setTimeout(() => {
          read();
        }, index * 1000);
        console.log(`${currency.key} Balance Attempt : ${attempt + 1}`);
        setAttempt(attempt + 1);
      }
    }
  };

  return (
    <li class="list-group-item">
      <div className="d-flex justify-content-between">
        <span>
          <img src={currency.icon} height="24"></img>
          <span className="px-1">{currency.text}</span>
        </span>
        <span className="font-monospace">
          {formatM(balance)}
          <span className="px-1">{currency.label}</span>
        </span>
      </div>
      <div className="d-flex justify-content-between small text-muted">
        {/* {conversionRatio ? ( */}
        <span>
          Exchange Rate : 1$ ≈ {conversionRatio}
          <span className="px-1">{currency.label}</span>
        </span>
        {/* ) : (
          ""
        )} */}
        {conversionRatio ? formatUSD(balance / conversionRatio) : ""}
      </div>
    </li>
  );
};

export default CurrencyBalance;
