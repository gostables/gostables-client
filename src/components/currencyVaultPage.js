import CurrencyVault from "./currencyVault";
import WalletDetails from "./walletDetails";

const CurrencyVaultPage = () => {
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col"></div>
        <div className="col-7">
          <CurrencyVault></CurrencyVault>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
};

export default CurrencyVaultPage;
