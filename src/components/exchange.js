import WalletDetails from "./walletDetails";
import { getStableCoinValues, StableCoinType } from "../utils/stableCoins";
import SelectCurrency from "./selectCurrency";
import { useEffect, useState } from "react";
import { ttddVault as ttddVault_ } from "../contracts/vaultContract";
import vaultPublisher from "../publishers/vault";
import { usddContract, usdjContract } from "../contracts/usdContract";
import walletPublisher from "../publishers/wallet";
import { TTDDVaultAddress } from "../contracts/address";
import usddImg from "../usdd.png";
import usdjImg from "../usdj.png";
import { getCurrencyValues } from "../utils/currencies";

const Exchange = () => {
  const [direction, setDirection] = useState(true);
  const [address, setAddress] = useState();
  const [selectedStableCoin, setSelectedStableCoin] = useState(
    StableCoinType.USDD
  );
  const [stableCoinValue, setStableCoinValue] = useState(0);
  const [tokenValue, setTokenValue] = useState(0);

  const [conversionRatio, setConversionRatio] = useState();
  const [vaultUSDDBalance, setVaultUSDDBalance] = useState();
  const [vaultUSDJBalance, setVaultUSDJBalance] = useState();

  useEffect(() => {
    walletPublisher.attach(setWalletDetails);
    return () => {
      walletPublisher.detach(setWalletDetails);
    };
  }, []);

  const setWalletDetails = (walletDetails) => {
    setAddress(walletDetails.address);
  };

  useEffect(() => {
    vaultPublisher.attach(setVaultDetails);
    return () => {
      vaultPublisher.detach(setVaultDetails);
    };
  }, []);

  const setVaultDetails = async (vaultDetails) => {
    setConversionRatio(vaultDetails.conversionRatio);
    setVaultUSDDBalance(vaultDetails.usddBalance);
    setVaultUSDJBalance(vaultDetails.usdjBalance);
  };

  const vaultBalancesJSX = () => {
    return (
      <div className="my-2">
        <div>Available in goStable SC </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item d-flex justify-content-between">
            <div>
              USDD
              <img
                src={usddImg}
                alt="$"
                style={{ width: 18, paddingLeft: 4 }}
              ></img>
            </div>
            <div>{vaultUSDDBalance}</div>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <div>
              USDJ
              <img
                src={usdjImg}
                alt="$"
                style={{ width: 18, paddingLeft: 4 }}
              ></img>
            </div>
            <div>{vaultUSDJBalance}</div>
          </li>
        </ul>
      </div>
    );
  };

  const stableCoinJSX = (title) => {
    let options = getStableCoinValues();
    return (
      <SelectCurrency
        key={1}
        title={title}
        defaultValue={options[0]}
        options={options}
        setSelectedCoin={setSelectedStableCoin}
        setValue={setStableCoinValue}
      ></SelectCurrency>
    );
  };
  const tokenJSX = (title) => {
    let options = getCurrencyValues();
    return (
      <SelectCurrency
        key={2}
        title={title}
        defaultValue={options[0]}
        options={options}
        setValue={setTokenValue}
      ></SelectCurrency>
    );
  };

  const swap = async () => {
    let ttddVault = await ttddVault_();
    let usd;
    switch (selectedStableCoin.type) {
      case "USDD":
        usd = await usddContract();
        break;
      case "USDJ":
        usd = await usdjContract();
        break;
      default:
        throw new Error(
          `unrecognized StableCoin type ${selectedStableCoin.type}`
        );
        break;
    }

    if (direction) {
      //swap USD for TTD
      await usd.approve(TTDDVaultAddress, stableCoinValue);
      console.log("approved");
      ttddVault.deposit(stableCoinValue, selectedStableCoin);
    } else {
      //swap TTD for USD
      ttddVault.withdraw(tokenValue, selectedStableCoin);
    }
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-sm-4">
          <WalletDetails></WalletDetails>
        </div>
        <div className="col-sm-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Swap</h5>
              <p>Current Conversion Ratio : 1 USD ≈ {conversionRatio} TTDD</p>

              {direction ? stableCoinJSX("You Swap") : tokenJSX("You Swap")}

              <div className="d-flex justify-content-center pt-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-arrow-down-up"
                  viewBox="0 0 16 16"
                  onClick={() => setDirection(!direction)}
                >
                  <path
                    fillRule="evenodd"
                    d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"
                  />
                </svg>
              </div>
              {direction ? tokenJSX("For") : stableCoinJSX("For")}

              <div className="d-grid gap-2 mt-5">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={swap}
                >
                  Swap
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">goStable SC</h5>
              {vaultBalancesJSX()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Exchange;
