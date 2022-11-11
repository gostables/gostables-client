import { useEffect, useState } from "react";
import currencyPublisher from "../publishers/currency";
import { getCurrency } from "../utils/currencies";
import ContractClientManager from "./contractClientManager";

const GStableAdmin = (props) => {
  const [currencyKey, setCurrencyKey] = useState(props.currencyKey);
  useEffect(() => {
    currencyPublisher.attach(updateCurrency);
    return () => {
      currencyPublisher.detach(updateCurrency);
      console.log("unmounting gStableAdmin");
    };
  }, []);
  const updateCurrency = (currKey) => {
    console.log("updating currency gstable admin : ", currKey);
    setCurrencyKey(currKey);
  };

  return (
    <>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title text-center">gStable Admin</h5>
          <p>{getCurrency(currencyKey).gStableAddress}</p>
          <hr />
          <ContractClientManager
            address={getCurrency(currencyKey).gStableAddress}
            key={getCurrency(currencyKey).gStableAddress}
          ></ContractClientManager>
        </div>
      </div>
    </>
  );
};

export default GStableAdmin;
