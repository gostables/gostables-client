import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { usdjContract } from "../contracts/usdContract";
import walletPublisher from "../publishers/wallet";
import WalletDetails from "../components/walletDetails";

const MockUSDJ = () => {
  const [usdjMockC, setUsdjMockC] = useState(null);
  const [num, setNum] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUSDDMockContract();
    return () => console.log("unmounting contract effect");
  }, []);

  const setUSDDMockContract = async () => {
    let usdj = await usdjContract();
    console.log("MockUSDJ : ", usdj.stableCoinType.label);
    setUsdjMockC(usdj);
  };

  const mintUSDJ = async () => {
    setLoading(true);
    (async () => {
      try {
        usdjMockC.mint(num);
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
        <h5 className="card-title">NILE USDJ Faucet</h5>
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
              onClick={() => mintUSDJ()}
            >
              Get !
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MockUSDJ;
