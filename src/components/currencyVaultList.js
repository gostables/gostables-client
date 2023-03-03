import { getCurrency } from "../utils/currencies";
import CurrencyVault from "./currencyVault";
import trxImg from "../trx.png";
import btcImg from "../btc.png";
import ethImg from "../eth.png";
import bchImg from "../bch.png";
import { useEffect, useState } from "react";
import USDDIcon from "./iconUSDD";
import { formatUSD } from "../utils/currencyFormatter";
import walletPublisher from "../publishers/wallet";
import currencyPublisher from "../publishers/currency";
import { isCurrentNetworkSupported } from "../utils/network";
import networkPublisher from "../publishers/network";
import NetworkNotSupported from "./networkNotSupported";

const CurrencyVaultList = (props) => {
  const [tvl, setTVL] = useState(0);
  const [walletDetails, setWalletDetails] = useState();
  const [mySupply, setMySupply] = useState(null);
  const [currencyKey, setCurrencyKey] = useState(props.currencyKey);

  useEffect(() => {
    init();
    let timer = setInterval(() => getData(currencyKey), 3 * 1000); 
    return () => {
      clearInterval(timer)
      console.log("Unmounting VaultList");
    };
  }, [currencyKey]);

  const init = async () => {
    await getData();
  };

  const getData = async () => {
    let currency = getCurrency(currencyKey);

    let vaultContract = await currency.vaultContract();

    if(vaultContract){
      let tvl = await vaultContract.getTVL(currency.id);
      let vaultBalData = await vaultContract.balanceOf(currency.id, walletPublisher.walletDetails.address);
      setTVL(tvl);
      setMySupply(vaultBalData.balance);
    }
  };


  useEffect(() => {
    walletPublisher.attach(setWallet);
    return () => {
      walletPublisher.detach(setWallet);
    };
  }, []);

  const setWallet = async (walletDetails) => {
    setWalletDetails(walletDetails);
  };

  useEffect(() => {
    currencyPublisher.attach(updateCurrency);
    return () => {
      currencyPublisher.detach(updateCurrency);
    };
  }, []);

  const updateCurrency = async (currKey) => {
    console.log("updating currency : ", currKey);
    setCurrencyKey(currKey);
    console.log(currencyKey);
    // init();
  };

  const getMySupply = () => {
    let mySupply_ = 0;
    if (walletDetails && walletDetails.vaultBalances) {
      let vaultBalances = walletDetails.vaultBalances.filter((vb) => {
        return vb.currencyKey.localeCompare(currencyKey) == 0;
      });
      if (vaultBalances.length) {
        mySupply_ = vaultBalances[0].balanceData.balance;
      }
    }
    return mySupply_;
  };

  // added to support network changes
  const [currentNetworkSupported, setIsCurrentNetworkSupported] =
    useState(false);

  useEffect(() => {
    setIsCurrentNetworkSupported(isCurrentNetworkSupported());
    networkPublisher.attach(setIsCurrentNetworkSupported);
    return () => {
      console.log("unmounting Swap Exchange");
    };
  }, []);
  // to support network changes related code ends

  if (!currentNetworkSupported) {
    return <NetworkNotSupported></NetworkNotSupported>;
  }

  return (
    <>
      <div className="card vault-card z-index-0 fadeIn3 fadeInBottom">
        <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
          <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
            <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">
              Vaults
            </h4>
          </div>
        </div>

        <div className="card-body vault-item">
          <div className="row mt-4">
            <div className="col-sm-12 col-md-4">
              <USDDIcon height={32} noTitle={true}></USDDIcon>
              <div className="currency-name">
                <b>USDD</b>
                <p className="small">Decentralized USD</p>
              </div>
            </div>

            <div className="col-sm-6 col-md-3 text-center">
              <b>TVL</b>
              <p className="small">{formatUSD(tvl)}</p>
            </div>
            <div className="col-sm-6 col-md-3 text-center">
              <b>My Supply</b>
              <p className="small">{formatUSD(getMySupply())}</p>
            </div>
            <div className="col-sm-12 col-md-2 text-center">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#v1modal"
              >
                Open
              </button>
            </div>
          </div>
        </div>

        <div className="card-body vault-item">
          <div className="row mt-4">
            <div className="col-sm-12 col-md-4">
              <img
                src={trxImg}
                alt="gStable"
                width="32"
                height="32"
                className="rounded-circle flex-shrink-0 vault-img"
              />
              <div className="currency-name">
                <b>TRX</b>
                <p className="small">Tron</p>
              </div>
            </div>

            <div className="col-sm-6 col-md-3 text-center">
              <b>TVL</b>
              <p className="small">--</p>
            </div>
            <div className="col-sm-6 col-md-3 text-center">
              <b>My Supply</b>
              <p className="small">--</p>
            </div>
            <div className="col-sm-12 col-md-2 text-center">
              <button
                type="button"
                className="btn btn-secondary disabled"
                data-bs-toggle="modal"
                data-bs-target="#"
              >
                Inactive
              </button>
            </div>
          </div>
        </div>


        <div className="card-body vault-item">
          <div className="row mt-4">
            <div className="col-sm-12 col-md-4">
              <img
                src={ethImg}
                alt="gStable"
                width="32"
                height="32"
                className="rounded-circle flex-shrink-0 vault-img"
              />
              <div className="currency-name">
                <b>ETH</b>
                <p className="small">Ethereum</p>
              </div>
            </div>

            <div className="col-sm-6 col-md-3 text-center">
              <b>TVL</b>
              <p className="small">--</p>
            </div>
            <div className="col-sm-6 col-md-3 text-center">
              <b>My Supply</b>
              <p className="small">--</p>
            </div>
            <div className="col-sm-12 col-md-2 text-center">
              <button
                type="button"
                className="btn btn-secondary disabled"
                data-bs-toggle="modal"
                data-bs-target="#"
              >
                Inactive
              </button>
            </div>
          </div>
        </div>


        <div className="card-body vault-item">
          <div className="row mt-4">
            <div className="col-sm-12 col-md-4">
              <img
                src={btcImg}
                alt="gStable"
                width="32"
                height="32"
                className="rounded-circle flex-shrink-0 vault-img"
              />
              <div className="currency-name">
                <b>BTC</b>
                <p className="small">Bitcoin</p>
              </div>
            </div>

            <div className="col-sm-6 col-md-3 text-center">
              <b>TVL</b>
              <p className="small">--</p>
            </div>
            <div className="col-sm-6 col-md-3 text-center">
              <b>My Supply</b>
              <p className="small">--</p>
            </div>
            <div className="col-sm-12 col-md-2 text-center">
              <button
                type="button"
                className="btn btn-secondary disabled"
                data-bs-toggle="modal"
                data-bs-target="#"
              >
                Inactive
              </button>
            </div>
          </div>
        </div>

        <div className="card-body vault-item">
          <div className="row mt-4">
            <div className="col-sm-12 col-md-4">
              <img
                src={bchImg}
                alt="gStable"
                width="32"
                height="32"
                className="rounded-circle flex-shrink-0 vault-img"
              />
              <div className="currency-name">
                <b>BCH</b>
                <p className="small">Bitcoin Cash</p>
              </div>
            </div>

            <div className="col-sm-6 col-md-3 text-center">
              <b>TVL</b>
              <p className="small">--</p>
            </div>
            <div className="col-sm-6 col-md-3 text-center">
              <b>My Supply</b>
              <p className="small">--</p>
            </div>
            <div className="col-sm-12 col-md-2 text-center">
              <button
                type="button"
                className="btn btn-secondary disabled"
                data-bs-toggle="modal"
                data-bs-target="#"
              >
                Inactive
              </button>
            </div>
          </div>
        </div>

        <div className="coming-soon text-white text-center">More Vaults coming soon...</div>
      </div>

      <div className="modal vault-modal fade" id="v1modal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header shadow-primary">
              <img
                src={getCurrency(currencyKey).icon}
                alt="BTC"
                width="32"
                height="32"
                className="rounded-circle flex-shrink-0 vault-img"
              />
              <div className="currency-name">
                <h1 className="modal-title fs-5 font-weight-bolder mt-2 mb-0">
                  {getCurrency(currencyKey).label} Vault
                </h1>
                <div>
                  <p className="small">{getCurrency(currencyKey).text}</p>
                </div>
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <CurrencyVault
                currencyKey={currencyKey}
                key={currencyKey}
              ></CurrencyVault>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CurrencyVaultList;
