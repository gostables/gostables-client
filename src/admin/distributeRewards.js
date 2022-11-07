import { useState } from "react";
import { getCurrency } from "../utils/currencies";

const DistributeRewards = (props) => {
  const [amount, setAmount] = useState("");
  const distribute = async () => {
    try {
      let currency = getCurrency(props.currencyKey);
      let vaultContract = await currency.vaultContract();
      await vaultContract.setRewards(amount);
      setAmount(0);
    } catch (error) {
      console.error(error);
    }
  };

  const updateAmount = (e) => {
    if (e.target.value) {
      setAmount(e.target.value);
    }
  };

  return (
    <>
      <form className="row g-3 d-flex justify-content-between">
        <div className="col-sm-7">
          <input
            type="text"
            className="form-control"
            placeholder="gStable Amount"
            value={amount}
            onChange={updateAmount}
          />
        </div>
        <div className="col">
          <div className="d-grid gap-2">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => distribute()}
            >
              Allocate Rewards
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default DistributeRewards;
