import WalletDashboard from "./walletDashboard";
import WalletDetails from "./walletDetails";
import WalletForCurrency from "./walletForCurrency";
import WalletVaultDeposits from "./walletVaultDeposits";

const WalletPage = (props) => {
  return (
    <div className="container">
      <div className="row mt-3">
        {/* <WalletDashboard
          displayDetails={true}
          displayDeposits={true}
          displayRewards={true}
        ></WalletDashboard> */}
        <div className="col-sm-4"></div>
        <div className="col-sm-4">
          <WalletForCurrency {...props}></WalletForCurrency>
        </div>
        <div className="col-sm-4"></div>
      </div>
    </div>
  );
};

export default WalletPage;
