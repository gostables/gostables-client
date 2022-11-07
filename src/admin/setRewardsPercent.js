import { useState } from "react";

const SetRewardsPercent = (props) => {
  const [rp, setRP] = useState("");

  const { swapContract } = props;

  const set = async () => {
    setRP("");
    try {
      console.log(`SetRewardsPercent : ${rp}`);
      if (rp) {
        await swapContract.setRewardsPercent(rp);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateRP = (e) => {
    if (e.target.value) {
      setRP(e.target.value);
    }
  };

  return (
    <>
      <form className="row g-3 d-flex justify-content-between">
        <div className="col-sm-5">
          <input
            type="text"
            className="form-control"
            placeholder="Reward Percent"
            value={rp}
            onChange={updateRP}
          />
        </div>

        <div className="col-sm-5">
          <div className="d-grid gap-2">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => set()}
            >
              Set Reward Percent
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default SetRewardsPercent;
