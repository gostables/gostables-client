import MockUSDD from "./mockUSDD";

const AdminFaucets = () => {
  return (
    <div className="container faucet">
      <div className="row mt-5 d-flex justify-content-center">
        <div className="col-sm-4">
          <MockUSDD></MockUSDD>
        </div>
      </div>
    </div>
  );
};

export default AdminFaucets;
