import { useEffect, useState } from "react";
import usddImg from "../usdd.png";
import gttdImg from "../ttdd.png";
import { ttddVault } from "../contracts/vaultContract";
import walletPublisher from "../publishers/wallet";
import { usddContract } from "../contracts/usdContract";
import { ThreeDots } from "react-loader-spinner";

const CurrencyVault = () => {
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
    ttddBalance: "",
    vaultBalance: { balance: "", lock: new Date() },
  });

  useEffect(() => {
    walletPublisher.attach(setWalletDetails);
    return () => {
      walletPublisher.detach(setWalletDetails);
    };
  }, []);

  const setWalletDetails = (walletDetails) => {
    setWalletData({
      status: walletDetails.status,
      isSupportedNetwork: walletDetails.isSupportedNetwork,
      usddBalance: walletDetails.usddBalance,
      ttddBalance: walletDetails.ttddBalance,
      vaultBalance: walletDetails.vaultBalance,
    });
  };

  const initVaultContract = async () => {
    try {
      let vaultContract = await ttddVault();

      let vaultDetails = await vaultContract.getDetails();

      console.log(vaultDetails);
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
        await usd.approve(vaultContract.address, usddValue);
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
            <div className="alert alert-success">
              <strong>Current Deposit :</strong>{" "}
              <div className="my-2">
                {walletData.vaultBalance.balance}{" "}
                <span className="mx-2">USDD</span>
                <span className="px-2">
                  <img
                    src={usddImg}
                    alt="USDD"
                    width="16"
                    height="16"
                    className="rounded-circle flex-shrink-0"
                  />
                </span>
                till {walletData.vaultBalance.lock.toLocaleString()}
              </div>
            </div>
          </>
        ) : (
          <></>
        )}

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
            <img
              src={usddImg}
              alt="USDD"
              width="32"
              height="32"
              className="rounded-circle flex-shrink-0"
            />
          </span>
          <button
            className="btn btn-outline-primary"
            type="button"
            id="button-deposit"
            onClick={callVault}
          >
            {display ? "Deposit" : "Redeem"}
          </button>
        </div>
        {/* <a className="p-1 rounded small" href="#simple-list-item-1">
          Set Max
        </a> */}

        {display && vaultDetails.interval ? (
          <div className="text-xs mt-3">
            Your deposit will be locked for the next {vaultDetails.interval}{" "}
            hrs.
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  };

  const active = "active";

  return (
    <div class="card z-index-0 fadeIn3 fadeInBottom">
      <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
        <div class="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
          <h4 class="text-white font-weight-bolder text-center mt-2 mb-0">
            Vaults
          </h4>
        </div>
      </div>
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
                Redeem
              </a>
            </li>
          </ul>
          {displayJSX()}
        </div>
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
  );
};
export default CurrencyVault;
