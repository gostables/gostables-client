import { useEffect, useState } from "react";
import { getCurrency } from "../utils/currencies";

const SetSwapFeesFactor = (props) => {
  const { currencyKey } = props;
  const [sff, setSFF] = useState("");
  const [swapFeesFactor, setSwapFeesFactor] = useState(0);

  useEffect(() => {
    read();

    return () => {
      console.log("unmounting SetSwapFeesFactor");
    };
  }, []);

  const read = async () => {
    let currency = getCurrency(currencyKey);

    let swapContract = await currency.swapContract();
    let swapFeesFactor = await swapContract.getSwapFeesFactor();

    setSwapFeesFactor(swapFeesFactor);
  };

  const set = async () => {
    setSFF("");
    try {
      console.log(`SetSwapFeesFactor : ${sff}`);
      if (sff) {
        let swapContract = await getCurrency(currencyKey).swapContract();
        await swapContract.setSwapFeesFactor(sff);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateSFF = (e) => {
    if (e.target.value) {
      setSFF(e.target.value);
    }
  };

  return (
    <>
      <p>Swap Fees Factor : {swapFeesFactor}</p>
      <form className="row g-3 d-flex justify-content-between">
        <div className="col-sm-5">
          <input
            type="text"
            className="form-control"
            placeholder="Swap Fees Factor"
            value={sff}
            onChange={updateSFF}
          />
        </div>

        <div className="col-sm-5">
          <div className="d-grid gap-2">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => set()}
            >
              Set Swap Fees Factor
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default SetSwapFeesFactor;
