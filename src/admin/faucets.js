import MockUSDD from "./mockUSDD";
import MockUSDJ from "./mockUSDJ";
import WalletDetails from "../components/walletDetails";

const AdminFaucets = () => {
  return (
    <div className="container">
      <div className="row mt-5 d-flex justify-content-center">
        <div className="col-sm-6">
          <MockUSDD></MockUSDD>
        </div>
      </div>
    </div>
  );
};

export default AdminFaucets;
