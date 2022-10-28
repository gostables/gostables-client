import { useState } from "react";

const AddStableCoinToVault = (props) => {
  const [id, setId] = useState("");
  const [address, setAddress] = useState("");

  const { ttddContract } = props;

  const add = async () => {
    setId("");
    setAddress("");
    try {
      console.log(`addNewStableCoin : ${id} ${address}`);
      if (id && address) {
        await ttddContract.addNewStableCoin(id, address);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateId = (e) => {
    if (e.target.value) {
      setId(e.target.value);
    }
  };
  const updateAddress = (e) => {
    if (e.target.value) {
      setAddress(e.target.value);
    }
  };
  return (
    <>
      <div className="row">
        <div className="col py-3">Add StableCoin To Vault</div>
      </div>
      <form className="row g-3 d-flex justify-content-between">
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Unique Id"
            value={id}
            onChange={updateId}
          />
        </div>
        <div className="col-sm-7">
          <input
            type="text"
            className="form-control"
            placeholder="Smart Contract Address"
            value={address}
            onChange={updateAddress}
          />
        </div>

        <div className="col">
          <div className="d-grid gap-2">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => add()}
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddStableCoinToVault;
