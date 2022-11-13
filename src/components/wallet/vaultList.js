import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
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
    // if (window.tronWeb && window.tronWeb.ready) {
    //   console.log(window.tronWeb.defaultAddress.base58);
    //   setWalletAddress(window.tronWeb.defaultAddress.base58);
    // }
    updateWalletAddress();
    return () => {
      console.log("unmounting VaultList");
    };
  }, [window.tronWeb.defaultAddress.base58]);

  const [attempt, setAttempt] = useState(0);
  const updateWalletAddress = () => {
    if (window.tronWeb && window.tronWeb.ready) {
      console.log(window.tronWeb.defaultAddress.base58);
      setWalletAddress(window.tronWeb.defaultAddress.base58);
    } else {
      if (attempt < 10) {
        setTimeout(() => updateWalletAddress, 3 * 1000);
        setAttempt(attempt + 1);
      }
    }
  };

  const updateTotal = (balanceData) => {
    // console.log(balanceData);
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
    if (isNaN(total)) {
      console.error("total", total);
      // return 0;
    }
    return total;
  };
  return (
    <div className="card wallet-card z-index-0 fadeIn3 fadeInBottom">
      <div className="card-header portfolio-bal p-0 position-relative mt-n4 mx-3 z-index-2">
        <div className="bg-gradient-info shadow-info border-radius-lg py-3 pe-1">
          <div className="text-center">
            <p className="small">Total Vault Deposits(USDD)</p>
            <h5 className="fw-bold">
              {isNaN(getTotal()) ? (
                <>
                  <div className="w-100 d-flex justify-content-center">
                    <ThreeDots
                      height="24"
                      width="32"
                      radius="9"
                      color="#fff"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      wrapperClassName=""
                      visible={true}
                    />
                  </div>
                </>
              ) : (
                formatUSD(getTotal())
              )}
            </h5>
            <div className="fst-italic" style={{ fontSize: "75%" }}>
              * This will automatically refresh every 60 seconds{" "}
            </div>
          </div>
        </div>
      </div>
      <ul class="list-group list-group-flush">
        {getCurrencies().map((curr, index) => (
          <VaultData
            currency={curr}
            updateTotal={updateTotal}
            walletAddress={walletAddress}
            key={curr.key + walletAddress}
            index={index}
          ></VaultData>
        ))}
      </ul>
    </div>
  );
};

export default VaultList;
