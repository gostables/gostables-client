import { getCurrencies } from "../utils/currencies";
import CurrencyVault from "./currencyVault";
import gttdImg from "../ttdd.png";
import { useEffect } from "react";

const CurrencyVaultList = (props) => {
  useEffect(() => {
    //   init()
    return () => {};
  }, []);

  //   const init = async () => {
  //     // getCurrencies().map((currency) => {
  //     //   currency;
  //     // });
  //   };

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
            <div class="col-sm-1">
              <img
                src={gttdImg}
                alt="gStable"
                width="32"
                height="32"
                class="rounded-circle flex-shrink-0 vault-img"
              />
            </div>
            <div class="col-sm-3">
              <b>gTTD</b>
              <p class="small">Trinidad & Tobago Dollar</p>
            </div>

            <div class="col-sm-3 text-center">
              <b>TVL</b>
              <p class="small">$50,000</p>
            </div>
            <div class="col-sm-3 text-center">
              <b>My Supply</b>
              <p class="small">$5000</p>
            </div>
            <div class="col-sm-2 text-center">
              <button
                type="button"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#modal"
              >
                Open
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade" id="modal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header shadow-primary">
              <h1 class="modal-title fs-5 font-weight-bolder text-center mt-2 mb-0">
                Vault
              </h1>
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
