import { useState } from "react";

const SetConversionRatio = (props) => {
  const [cr, setCR] = useState("");

  const { ttddContract } = props;

  const set = async () => {
    setCR("");
    try {
      console.log(`SetConversionRatio : ${cr}`);
      if (cr) {
        await ttddContract.setConversion(cr);
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
      <div className="row">
        <div className="col py-3">Set Conversion Ratio</div>
      </div>
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
