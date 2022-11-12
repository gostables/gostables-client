import { useEffect, useState } from "react";
import { getCurrencies } from "../../utils/currencies";
import { formatUSD } from "../../utils/currencyFormatter";
import VaultData from "./vaultData";

const VaultList = (props) => {
  const [ttdd, setTtd] = useState(0);
  const [xcdd, setXcdd] = useState(0);
  const [bbdd, setBbdd] = useState(0);
  const [jmdd, setJmdd] = useState(0);
  const [awgd, setAwgd] = useState(0);
  const [dop, setDop] = useState(0);
  const [bsd, setBsd] = useState(0);
  const [kyd, setKyd] = useState(0);
  const [cup, setCup] = useState(0);
  const [htg, setHtg] = useState(0);
  const [eur, setEur] = useState(0);

  const [walletAddress, setWalletAddress] = useState("");
  useEffect(() => {
    if (window.tronWeb && window.tronWeb.ready) {
      console.log(window.tronWeb.defaultAddress.base58);
      setWalletAddress(window.tronWeb.defaultAddress.base58);
    }
    return () => {
      console.log("unmounting VaultList");
    };
  }, [window.tronWeb.defaultAddress.base58]);

  const updateTotal = (balanceData) => {
    console.log(parseFloat(balanceData.balance.balance));
    switch (balanceData.currencyKey) {
      case "TTDD":
        setTtd(parseFloat(balanceData.balance.balance));
        break;
      case "XCD":
        setXcdd(parseFloat(balanceData.balance.balance));
        break;
      case "BBD":
        setBbdd(parseFloat(balanceData.balance.balance));
        break;
      case "JMD":
        setJmdd(parseFloat(balanceData.balance.balance));
        break;
      case "AWG":
        setAwgd(parseFloat(balanceData.balance.balance));
        break;
      case "DOP":
        setDop(parseFloat(balanceData.balance.balance));
        break;
      case "BSD":
        setBsd(parseFloat(balanceData.balance.balance));
        break;
      case "KYD":
        setKyd(parseFloat(balanceData.balance.balance));
        break;
      case "CUP":
        setCup(parseFloat(balanceData.balance.balance));
        break;
      case "HTG":
        setHtg(parseFloat(balanceData.balance.balance));
        break;
      case "EUR":
        setEur(parseFloat(balanceData.balance.balance));
        break;

      default:
        console.error(`unknown currency ${balanceData.currencyKey}`);
        break;
    }
  };
  const getTotal = () => {
    let total =
      ttdd + xcdd + bbdd + jmdd + awgd + dop + bsd + kyd + cup + htg + eur;
    return total;
  };
  return (
    <div className="card wallet-card z-index-0 fadeIn3 fadeInBottom">
      <div className="card-header portfolio-bal p-0 position-relative mt-n4 mx-3 z-index-2">
        <div className="bg-gradient-info shadow-info border-radius-lg py-3 pe-1">
          <div className="text-center">
            <p className="small">Total Balance (USDD)</p>
            <h5 className="fw-bold">
              {!isNaN(getTotal()) ? formatUSD(getTotal()) : "-"}
            </h5>
          </div>
        </div>
      </div>
      <ul class="list-group list-group-flush">
        {getCurrencies().map((curr) => (
          <VaultData
            currency={curr}
            updateTotal={updateTotal}
            walletAddress={walletAddress}
            key={curr.key + walletAddress}
          ></VaultData>
        ))}
      </ul>
    </div>
  );
};

export default VaultList;
