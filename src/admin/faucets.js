import MockUSDD from "./mockUSDD";
import MockUSDJ from "./mockUSDJ";
import WalletDetails from "../components/walletDetails";

const AdminFaucets = () => {
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col">
          <WalletDetails></WalletDetails>
        </div>
        <div className="col">
          <MockUSDD></MockUSDD>
        </div>
        <div className="col">
          <MockUSDJ></MockUSDJ>
        </div>
      </div>
    </div>
  );
};

export default AdminFaucets;
