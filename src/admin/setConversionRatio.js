import { useState } from "react";
import { getCurrency } from "../utils/currencies";

const SetConversionRatio = (props) => {
  const [cr, setCR] = useState("");

  const set = async () => {
    let currency = getCurrency(props.currencyKey);
    let swapContract = await currency.swapContract();

    setCR("");
    try {
      console.log(`SetConversionRatio : ${cr}`);
      if (cr) {
        await swapContract.setConversion(cr);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateCR = (e) => {
    if (e.target.value) {
      setCR(e.target.value);
    }
  };

  return (
    <>
      <form className="row g-3 d-flex justify-content-between">
        <div className="col-sm-5">
          <input
            type="text"
            className="form-control"
            placeholder="Conversion Ratio"
            value={cr}
            onChange={updateCR}
          />
        </div>

        <div className="col-sm-5">
          <div className="d-grid gap-2">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => set()}
            >
              Set Conversion Ratio
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default SetConversionRatio;
