import { useState } from "react";
import { getCurrency } from "../utils/currencies";

const SetLockInterval = (props) => {
  const [interval, setInterval] = useState("");

  const set = async () => {
    let currency = getCurrency(props.currencyKey);
    let vaultContract = await currency.vaultContract();

    setInterval("");
    try {
      console.log(`SetLockInterval : ${interval}`);
      if (interval) {
        await vaultContract.setInterval(interval);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateInterval = (e) => {
    if (e.target.value) {
      setInterval(e.target.value);
    }
  };

  return (
    <>
      <form className="row g-3 d-flex justify-content-between">
        <div className="col-sm-5">
          <input
            type="text"
            className="form-control"
            placeholder="Lock Interval"
            value={interval}
            onChange={updateInterval}
          />
        </div>

        <div className="col-sm-5">
          <div className="d-grid gap-2">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => set()}
            >
              Set Lock Interval
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default SetLockInterval;
