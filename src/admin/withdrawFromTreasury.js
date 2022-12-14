import { useState } from "react";
import GoStableBaseContract from "../contracts/goStableBaseContract";

const WithdrawFromTreasury = (props) => {
  const { address } = props;
  const [amount, setAmount] = useState("");

  const set = async () => {
    let contract_ = new GoStableBaseContract(address);
    let contract = await contract_.init();

    setAmount("");
    try {
      console.log(`Withdraw From Treasury : ${amount}`);
      if (amount) {
        await contract.withdrawFromTreasury(amount);
      }
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
        <div className="col-sm-5">
          <input
            type="text"
            className="form-control"
            placeholder="Amount"
            value={amount}
            onChange={updateAmount}
          />
        </div>

        <div className="col-sm-5">
          <div className="d-grid gap-2">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => set()}
            >
              Withdraw
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default WithdrawFromTreasury;
