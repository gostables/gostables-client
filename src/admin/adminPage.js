import SwapExchange from "../components/swapExchange";
import WalletDetails from "../components/walletDetails";
import GStableAdmin from "./gStableAdmin";
import SwapAdmin from "./swapAdmin";

const AdminPage = () => {
  return (
    <div className="container my-3">
      <div className="row mt-5">
        <div className="col-sm-6">
          <div className="row>">
            <div className="col pb-3">
              <SwapAdmin></SwapAdmin>
            </div>
            <div className="col">
              <GStableAdmin></GStableAdmin>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="row>">
            <div className="col pb-6">
              <SwapExchange></SwapExchange>
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
