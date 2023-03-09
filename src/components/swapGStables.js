import { useState } from "react";
import { usddContract } from "../contracts/usdContract";
import { SwapUSDDContractAddress } from "../utils/contractAddress";
import swapGStableFactory from "../utils/swapGStableFactory";

function SwapGStable() {
  const [formValues, setFormValues] = useState({
    fromId: "",
    fromTokens: "",
    toId: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    swap(formValues.fromId, formValues.fromTokens, formValues.toId);

    setFormValues({ fromId: "", fromTokens: "", toId: "" });
  };

  const handleChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const swap = async (fromId, fromTokens, toId) => {
    let usd = await usddContract();
    await usd.approve(SwapUSDDContractAddress, 1000);
    console.log("approved");
    let swapGStableContract  = await swapGStableFactory.getSwapGStable();
    let hash = await swapGStableContract.swap(fromId, fromTokens, toId);
    console.log(`swap gStables hash ${hash}`); 
  }

  return (
    <>
    <div className="col"></div>
    <div className="card swap-card z-index-0 fadeIn3 fadeInBottom col-md-6 offset-md-3">
      <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
        <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
          <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">
            Swap
          </h4>
        </div>
      </div>
      <div className="card-body mt-20">
          <p className="text-left">You Swap</p>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="fromId" className="form-label">
          From ID
        </label>
        <input
          type="number"
          className="form-control"
          id="fromId"
          name="fromId"
          value={formValues.fromId}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="fromTokens" className="form-label">
          From Tokens
        </label>
        <input
          type="number"
          className="form-control"
          id="fromTokens"
          name="fromTokens"
          value={formValues.fromTokens}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="toId" className="form-label">
          To ID
        </label>
        <input
          type="number"
          className="form-control"
          id="toId"
          name="toId"
          value={formValues.toId}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Swap
      </button>
    </form>
    </div>
    </div>
    </>
  );
}


export default SwapGStable;
