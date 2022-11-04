import { useState } from "react";
import { ttdd } from "../contracts/gStableContract ";
import { getCurrency } from "../utils/currencies";

const AddClientAddressTogStable = (props) => {
  const [address, setAddress] = useState("");

  const add = async () => {
    let currency = getCurrency(props.currencyKey);
    let gStableContract = await currency.gStableContract();
    setAddress("");
    try {
      console.log(`setClient : ${address}`);
      if (address) {
        await gStableContract.setClient(address);
      }
    } catch (error) {
      console.error(error);
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
        <div className="col py-3">Whitelist New Address </div>
      </div>
      <form className="row g-3 d-flex justify-content-between">
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

export default AddClientAddressTogStable;
