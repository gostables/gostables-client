import CurrencyVault from "../components/currencyVault";
import SwapExchange from "../components/swapExchange";
import WalletDetails from "../components/walletDetails";
import GStableAdmin from "./gStableAdmin";
import SwapAdmin from "./swapAdmin";
import VaultAdmin from "./vaultAdmin";

const AdminPage = (props) => {
  return (
    <div className="container my-3">
      <div className="row mt-5">
        <div className="col-sm-6">
          <div className="row>">
            <div className="col pb-3">
              <SwapAdmin currencyKey={props.currencyKey}></SwapAdmin>
            </div>
            <div className="col">
              <GStableAdmin currencyKey={props.currencyKey}></GStableAdmin>
            </div>
            <div className="col">
              <VaultAdmin currencyKey={props.currencyKey}></VaultAdmin>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="row>">
            <div className="col pb-6">
              <SwapExchange currencyKey={props.currencyKey}></SwapExchange>
            </div>
            <div className="col pb-3">
              <div class="card">
                <div class="card-body">
                  <CurrencyVault
                    currencyKey={props.currencyKey}
                  ></CurrencyVault>
                </div>
              </div>
            </div>
            <div className="col pb-3">
              <WalletDetails></WalletDetails>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-sm-6"></div>
        <div className="col-sm-6"></div>
      </div>
    </div>
  );
};

export default AdminPage;
