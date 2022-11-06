import WalletDashboard from "./walletDashboard";
import WalletDetails from "./walletDetails";
import WalletVaultDeposits from "./walletVaultDeposits";

const WalletPage = () => {
  return (
    <div className="container">
      <div className="row mt-5">
        <WalletDashboard
          displayDetails={true}
          displayDeposits={true}
          displayRewards={true}
        ></WalletDashboard>
      </div>
    </div>
  );
};

export default WalletPage;
