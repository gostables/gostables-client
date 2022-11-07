import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { usddContract } from "../contracts/usdContract";

const MockUSDD = () => {
  const [usddMockC, setUsddMockC] = useState(null);
  const [num, setNum] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUSDDMockContract();
    return () => console.log("unmounting contract effect");
  }, []);

  const setUSDDMockContract = async () => {
    let usdd = await usddContract();
    console.log("MockUSDD : ", usdd.stableCoinType.label);
    setUsddMockC(usdd);
  };

  const mintUSDD = async () => {
    setLoading(true);
    (async () => {
      try {
        usddMockC.mint(num);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    })();
  };

  const updateNum = (e) => {
    if (Number.isInteger(+e.target.value)) {
      setNum(e.target.value);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">NILE USDD Faucet</h5>
        <div className="mt-5">
          <input
            type="text"
            className="form-control"
            placeholder="0"
            value={num}
            onChange={updateNum}
          ></input>
        </div>

        <div className="d-grid gap-2 mt-5">
          {loading ? (
            <div className="d-flex justify-content-center">
              <ThreeDots></ThreeDots>
            </div>
          ) : (
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => mintUSDD()}
            >
              Get NILE USDD
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MockUSDD;
