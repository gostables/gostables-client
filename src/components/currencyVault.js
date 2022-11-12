import { useEffect, useState } from "react";
import walletPublisher from "../publishers/wallet";
import { usddContract } from "../contracts/usdContract";
import { ThreeDots } from "react-loader-spinner";
import { getCurrency } from "../utils/currencies";
import USDDIcon from "./iconUSDD";
import LockIcon from "../svg/vaultLock";
import UnlockIcon from "../svg/vaultUnlock";
import { formatUSD } from "../utils/currencyFormatter";

const CurrencyVault = (props) => {
  const [currencyKey, setCurrencyKey] = useState(props.currencyKey);
  const [display, setDisplay] = useState(true);
  const [usddValue, setUSDDValue] = useState();

  const [vaultDetails, setVaultDetails] = useState({
    status: false,
    address: "",
    interval: "",
  });
  const [vaultContract, setVaultContract] = useState({});
  useEffect(() => {
    initVaultContract();
    return () => {
      console.log("unmounting Vault");
    };
  }, []);

  const [walletData, setWalletData] = useState({
    status: 1,
    isSupportedNetwork: false,
    usddBalance: "",
    gStableBalance: "",
    vaultBalance: { balance: "", lock: new Date() },
  });

  useEffect(() => {
    walletPublisher.attach(setWalletDetails);
    return () => {
      walletPublisher.detach(setWalletDetails);
    };
  }, []);

  const setWalletDetails = (walletDetails) => {
    let vbList = walletDetails.vaultBalances.filter(
      (vb) => vb.currencyKey.localeCompare(currencyKey) == 0
    );

    let vb_ = vbList.length
      ? vbList[0].balanceData
      : { balance: "", lock: new Date() };

    setWalletData({
      status: walletDetails.status,
      isSupportedNetwork: walletDetails.isSupportedNetwork,
      usddBalance: walletDetails.usddBalance,
      gStableBalance: walletDetails.gStableBalance,
      vaultBalance: vb_,
    });
  };

  const initVaultContract = async () => {
    try {
      let currency = getCurrency(currencyKey);
      let vaultContract = await currency.vaultContract();

      let vaultDetails = await vaultContract.getDetails();

      setVaultDetails(vaultDetails);
      setVaultContract(vaultContract);
    } catch (error) {
      console.error(error);
    }
  };

  const updateUSDDValue = (e) => {
    console.log("DepositValue : ", e.target.value);
    setUSDDValue(e.target.value);
  };
  const deposit = async () => {
    let usd = await usddContract();
    if (vaultContract) {
      try {
        let currency = getCurrency(currencyKey);
        await usd.approve(currency.vaultAddress, usddValue);
        console.log("approved");
        vaultContract.deposit(usddValue);
      } catch (error) {
        console.error(error);
      }
    }
  };
  const withdraw = async () => {
    let usd = await usddContract();
    if (vaultContract) {
      try {
        vaultContract.withdraw(usddValue);
      } catch (error) {
        console.error(error);
      }
    }
  };
  const callVault = async () => {
    display ? await deposit() : await withdraw();
  };

  const displayJSX = () => {
    return (
      <div className="card-body">
        {walletData.vaultBalance && walletData.vaultBalance.balance > 0 ? (
          <>
            <div className="alert alert-success text-center">
              <strong>My Supply</strong>{" "}
              <div className="my-2">
                {formatUSD(walletData.vaultBalance.balance)}
              </div>
            </div>
          </>
        ) : (
          <></>
        )}

        {!display && new Date() < walletData.vaultBalance.lock ? (
          <></>
        ) : (
          <>
            <div className="input-group mb-2" key={1}>
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInputGroup1"
                  placeholder="Value in USDD"
                  onChange={updateUSDDValue}
                  value={usddValue}
                />
                <label for="floatingInputGroup1">Value in USDD</label>
              </div>
              <span className="input-group-text">
                <USDDIcon height={32}></USDDIcon>
              </span>
            </div>
            {walletData ? (
              <p className="small">
                Balance: {formatUSD(walletData.usddBalance)}
              </p>
            ) : (
              <></>
            )}
            <div class="d-grid gap-2">
              <button
                className="btn btn-primary"
                type="button"
                id="button-deposit"
                onClick={callVault}
              >
                {display ? "Deposit" : "Withdraw"}
              </button>
            </div>
          </>
        )}

        {/* <a className="p-1 rounded small" href="#simple-list-item-1">
          Set Max
        </a> */}

        {vaultDetails.interval ? (
          <div className="text-xs text-center mt-2 pt-3">
            {walletData.vaultBalance.lock > new Date() ? (
              <>
                <span className="lock-icon">
                  <LockIcon></LockIcon>
                </span>
                <br />
                <br />
                <span class="small">
                  Your deposit will be locked for the next{" "}
                  {vaultDetails.interval} hrs.
                </span>
                <br />
                <span class="text-danger">
                  Unlock Time: {walletData.vaultBalance.lock.toLocaleString()}
                </span>
              </>
            ) : (
              <>
                <span className="unlock-icon">
                  <UnlockIcon></UnlockIcon>
                </span>
                <br />
                <br />
                <span class="text-success">Unlocked</span>
              </>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  };

  const active = "active";

  return (
    <div class="">
      {walletData.isSupportedNetwork ? (
        <div className="card-body">
          <ul className="nav justify-content-center">
            <li className="nav-item">
              <a
                className={`nav-link ${display ? active : ""}`}
                href="#"
                onClick={() => setDisplay(true)}
              >
                Deposit
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${display ? "" : active}`}
                href="#"
                onClick={() => setDisplay(false)}
              >
                Withdraw
              </a>
            </li>
          </ul>
          {displayJSX()}
        </div>
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
  );
};
export default CurrencyVault;
