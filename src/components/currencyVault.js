import { useEffect, useState } from "react";
import usddImg from "../usdd.png";
import ttddImg from "../ttdd.png";
import { ttddVault } from "../contracts/vaultContract";
import walletPublisher from "../publishers/wallet";
import { usddContract } from "../contracts/usdContract";

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
      usddBalance: walletDetails.usddBalance,
      ttddBalance: walletDetails.ttddBalance,
      vaultBalance: walletDetails.vaultBalance,
    });
  };

  const initVaultContract = async () => {
    let vaultContract = await ttddVault();

    let vaultDetails = await vaultContract.getDetails();

    console.log(vaultDetails);
    setVaultDetails(vaultDetails);
    setVaultContract(vaultContract);
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
      <div class="card-body">
        {walletData.vaultBalance.balance > 0 ? (
          <>
            <div class="alert alert-success">
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

        <div class="input-group mb-2" key={1}>
          <div class="form-floating">
            <input
              type="text"
              class="form-control"
              id="floatingInputGroup1"
              placeholder="Value in USDD"
              onChange={updateUSDDValue}
              value={usddValue}
            />
            <label for="floatingInputGroup1">Value in USDD</label>
          </div>
          <span class="input-group-text">
            <img
              src={usddImg}
              alt="USDD"
              width="32"
              height="32"
              class="rounded-circle flex-shrink-0"
            />
          </span>
          <button
            class="btn btn-outline-primary"
            type="button"
            id="button-deposit"
            onClick={callVault}
          >
            {display ? "Deposit" : "Redeem"}
          </button>
        </div>
        {/* <a class="p-1 rounded small" href="#simple-list-item-1">
          Set Max
        </a> */}

        {display && vaultDetails.interval ? (
          <div class="text-xs mt-3">
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
            Vault
          </h4>
        </div>
      </div>
      <div class="card-body">
        <ul class="nav justify-content-center">
          <li class="nav-item">
            <a
              class={`nav-link ${display ? active : ""}`}
              href="#"
              onClick={() => setDisplay(true)}
            >
              Deposit
            </a>
          </li>
          <li class="nav-item">
            <a
              class={`nav-link ${display ? "" : active}`}
              href="#"
              onClick={() => setDisplay(false)}
            >
              Redeem
            </a>
          </li>
        </ul>
      </div>
      {displayJSX()}
    </div>
  );
};
export default CurrencyVault;
