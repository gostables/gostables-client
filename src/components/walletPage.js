import WalletDetails from "./walletDetails";
import WalletDashboard from "./walletDashboard";

const WalletPage = () => {
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-sm-4"><WalletDetails></WalletDetails></div>
        <div className="col-sm-8"><WalletDashboard></WalletDashboard></div>
      </div>
    </div>
  );
};

export default WalletPage;
