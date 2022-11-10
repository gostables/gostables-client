import { useEffect, useState } from "react";
import currencyPublisher from "../publishers/currency";
import { getCurrency } from "../utils/currencies";
import ContractClientManager from "./contractClientManager";

const GStableAdmin = (props) => {
  const [address, setAddress] = useState();

  const [currencyKey, setCurrencyKey] = useState(props.currencyKey);
  useEffect(() => {
    currencyPublisher.attach(updateCurrency);
    return () => {
      currencyPublisher.detach(updateCurrency);
    };
  }, []);
  const updateCurrency = (currKey) => {
    console.log("updating currency gstable admin : ", currKey);
    setCurrencyKey(currKey);
  };

  useEffect(() => {
    let currency = getCurrency(currencyKey);
    setAddress(currency.gStableAddress);
    console.log(address);

    return () => {
      console.log("unmounting gStableAdmin");
    };
  }, []);

  return (
    <>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title text-center">gStable Admin</h5>
          <p>{address}</p>
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
