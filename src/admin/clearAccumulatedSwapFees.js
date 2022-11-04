import { getCurrency } from "../utils/currencies";

const ClearAccumulatedSwapFees = (props) => {
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
