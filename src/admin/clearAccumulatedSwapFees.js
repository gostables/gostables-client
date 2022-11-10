import { useEffect, useState } from "react";
import { getCurrency } from "../utils/currencies";

const ClearAccumulatedSwapFees = (props) => {
  const { currencyKey } = props;
  const [accumulatedSwapFees, setAccumulatedSwapFees] = useState(0);
  useEffect(() => {
    read();

    return () => {
      console.log("unmounting ClearAccumulatedSwapFees");
    };
  }, []);

  const read = async () => {
    let currency = getCurrency(currencyKey);

    let swapContract = await currency.swapContract();
    let accumulatedSwapFees = await swapContract.getAccumulatedSwapFees();

    setAccumulatedSwapFees(accumulatedSwapFees);
  };
  const clear = async () => {
    try {
      let currency = getCurrency(props.currencyKey);
      let swapContract = await currency.swapContract();
      console.log(`ClearAccumulatedSwapFees : ${currency.vaultAddress}`);
      await swapContract.clearAccumulatedSwapFees(currency.vaultAddress);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <p>Accumulated Swap Fees : {accumulatedSwapFees}</p>
      <form className="row g-3 d-flex justify-content-between">
        <div className="col-sm-12">
          <div className="d-grid gap-2">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => clear()}
            >
              Clear Accumulated Swap Fees
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ClearAccumulatedSwapFees;
