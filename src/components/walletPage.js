import WalletDetails from "./walletDetails";

const WalletPage = () => {
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-sm-4"></div>
        <div className="col-sm-4">
          <WalletDetails></WalletDetails>
        </div>
        <div className="col-sm-4"></div>
      </div>
    </div>
  );
};

export default WalletPage;
