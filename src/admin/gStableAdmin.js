import { useEffect, useState } from "react";
import { getCurrency } from "../utils/currencies";
import ContractClientManager from "./contractClientManager";

const GStableAdmin = (props) => {
  const [address, setAddress] = useState();

  useEffect(() => {
    let currency = getCurrency(props.currencyKey);
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
            address={address}
            key={address}
          ></ContractClientManager>
        </div>
      </div>
    </>
  );
};

export default GStableAdmin;
