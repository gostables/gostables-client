import CurrencyVault from "./currencyVault";
import WalletDetails from "./walletDetails";
import gttdImg from "../ttdd.png";

const CurrencyVaultPage = () => {
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col"></div>
        <div className="col-sm-6">


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
          <div class="col-sm-4">
            <b>gTTD</b>
            <p class="small">Trinidad & Tobago Dollar</p>
          </div>

          <div class="col-sm-4 text-center">
            <b>TVL</b>
            <p class="small">$50,000</p>
          </div>
          <div class="col-sm-3 text-center">
            <b>My Supply</b>
            <p class="small">$5000</p>
          </div>
        </div>
      </div>


    </div>

          <CurrencyVault></CurrencyVault>

        </div>
        <div className="col"></div>
      </div>
    </div>
  );
};

export default CurrencyVaultPage;
