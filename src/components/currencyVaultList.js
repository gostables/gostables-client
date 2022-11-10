import { getCurrencies, getCurrency } from "../utils/currencies";
import CurrencyVault from "./currencyVault";
import usddImg from "../usdd.png";
import gttdImg from "../ttdd.png";
import trxImg from "../trx.png";
import btcImg from "../btc.png";
import ethImg from "../eth.png";
import { useEffect, useState } from "react";
import USDDIcon from "./iconUSDD";
import { formatUSD } from "../utils/currencyFormatter";
import walletPublisher from "../publishers/wallet";
import IncorrectNetwork from "./incorrectNetwork";

const CurrencyVaultList = (props) => {
  const [tvl, setTVL] = useState(0);
  const [walletDetails, setWalletDetails] = useState();
  useEffect(() => {
    init();
    return () => {
      console.log("Unmounting VaultList");
    };
  }, []);

  const init = async () => {
    let currency = getCurrency(props.currencyKey);

    let vaultContract = await currency.vaultContract();
    let tvl = await vaultContract.getTVL();
    setTVL(tvl);
  };

  useEffect(() => {
    walletPublisher.attach(setWallet);
    return () => {
      walletPublisher.detach(setWallet);
    };
  }, []);

  const setWallet = (walletDetails) => {
    setWalletDetails(walletDetails);
  };

  const getMySupply = () => {
    let mySupply = 0;
    if (walletDetails && walletDetails.vaultBalances) {
      let vaultBalances = walletDetails.vaultBalances.filter((vb) => {
        return vb.currencyKey.localeCompare(props.currencyKey) == 0;
      });
      if (vaultBalances.length) {
        mySupply = vaultBalances[0].balanceData.balance;
      }
    }
    return mySupply;
  };

  if (!walletDetails || !walletDetails.isSupportedNetwork) {
    return (
      <>
        <IncorrectNetwork></IncorrectNetwork>
      </>
    );
  }

  return (
    <>
      <div class="card vault-card z-index-0 fadeIn3 fadeInBottom">
        <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
          <div class="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
            <h4 class="text-white font-weight-bolder text-center mt-2 mb-0">
              Vaults
            </h4>
          </div>
        </div>

        <div class="card-body vault-item">
          <div class="row mt-4">
            <div class="col-sm-12 col-md-4">
              <USDDIcon height={32} noTitle={true}></USDDIcon>
              <div class="currency-name">
                <b>USDD</b>
                <p class="small">Decentralized USD</p>
              </div>
            </div>

            <div class="col-sm-6 col-md-3 text-center">
              <b>TVL</b>
              <p class="small">{formatUSD.format(tvl)}</p>
            </div>
            <div class="col-sm-6 col-md-3 text-center">
              <b>My Supply</b>
              <p class="small">{formatUSD.format(getMySupply())}</p>
            </div>
            <div class="col-sm-12 col-md-2 text-center">
              <button
                type="button"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#v1modal"
              >
                Open
              </button>
            </div>
          </div>
        </div>

        <div class="card-body vault-item">
          <div class="row mt-4">
            <div class="col-sm-12 col-md-4">
              <img
                src={trxImg}
                alt="gStable"
                width="32"
                height="32"
                class="rounded-circle flex-shrink-0 vault-img"
              />
              <div class="currency-name">
                <b>TRX</b>
                <p class="small">Tron</p>
              </div>
            </div>

            <div class="col-sm-6 col-md-3 text-center">
              <b>TVL</b>
              <p class="small">--</p>
            </div>
            <div class="col-sm-6 col-md-3 text-center">
              <b>My Supply</b>
              <p class="small">--</p>
            </div>
            <div class="col-sm-12 col-md-2 text-center">
              <button
                type="button"
                class="btn btn-secondary disabled"
                data-bs-toggle="modal"
                data-bs-target="#"
              >
                Inactive
              </button>
            </div>
          </div>
        </div>

        <div class="card-body vault-item">
          <div class="row mt-4">
            <div class="col-sm-12 col-md-4">
              <img
                src={btcImg}
                alt="gStable"
                width="32"
                height="32"
                class="rounded-circle flex-shrink-0 vault-img"
              />
              <div class="currency-name">
                <b>BTC</b>
                <p class="small">Bitcoin</p>
              </div>
            </div>

            <div class="col-sm-6 col-md-3 text-center">
              <b>TVL</b>
              <p class="small">--</p>
            </div>
            <div class="col-sm-6 col-md-3 text-center">
              <b>My Supply</b>
              <p class="small">--</p>
            </div>
            <div class="col-sm-12 col-md-2 text-center">
              <button
                type="button"
                class="btn btn-secondary disabled"
                data-bs-toggle="modal"
                data-bs-target="#"
              >
                Inactive
              </button>
            </div>
          </div>
        </div>

        <div class="card-body vault-item">
          <div class="row mt-4">
            <div class="col-sm-12 col-md-4">
              <img
                src={ethImg}
                alt="gStable"
                width="32"
                height="32"
                class="rounded-circle flex-shrink-0 vault-img"
              />
              <div class="currency-name">
                <b>ETH</b>
                <p class="small">Ethereum</p>
              </div>
            </div>

            <div class="col-sm-6 col-md-3 text-center">
              <b>TVL</b>
              <p class="small">--</p>
            </div>
            <div class="col-sm-6 col-md-3 text-center">
              <b>My Supply</b>
              <p class="small">--</p>
            </div>
            <div class="col-sm-12 col-md-2 text-center">
              <button
                type="button"
                class="btn btn-secondary disabled"
                data-bs-toggle="modal"
                data-bs-target="#"
              >
                Inactive
              </button>
            </div>
          </div>
        </div>

        <div class="coming-soon text-center">More Vaults coming soon...</div>
      </div>

      <div class="modal vault-modal fade" id="v1modal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header shadow-primary">
              <img
                src={gttdImg}
                alt="BTC"
                width="32"
                height="32"
                class="rounded-circle flex-shrink-0 vault-img"
              />
              <div class="currency-name">
                <h1 class="modal-title fs-5 font-weight-bolder mt-2 mb-0">
                  gTTD Vault
                </h1>
                <div>
                  <p class="small">{getCurrency(props.currencyKey).text}</p>
                </div>
              </div>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div class="modal-body">
              <CurrencyVault {...props}></CurrencyVault>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CurrencyVaultList;
