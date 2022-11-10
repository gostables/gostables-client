import { useEffect, useState } from "react";
import { getCurrency } from "../utils/currencies";

const SetConversionRatio = (props) => {
  const { currencyKey } = props;
  const [cr, setCR] = useState("");
  const [conversionRatio, setConversionRatio] = useState(0);
  const [gStableSymbol, set_gStableSymbol] = useState("");

  useEffect(() => {
    read();

    return () => {
      console.log("unmounting SetConversionRatio");
    };
  }, []);

  const read = async () => {
    let currency = getCurrency(currencyKey);

    let swapContract = await currency.swapContract();
    let conversionRatio = await swapContract.getConversion();

    //gStable Data
    let gStableContract = await currency.gStableContract();
    let { name: gStableCoinName, symbol: gStableCoinSymbol } =
      await gStableContract.getNameSymbol();
    console.log(gStableCoinSymbol);
    setConversionRatio(conversionRatio);
    set_gStableSymbol(gStableCoinSymbol);
  };

  const set = async () => {
    let currency = getCurrency(currencyKey);
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
      <p>
        1 USD ≈ {conversionRatio} {gStableSymbol}
      </p>
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
