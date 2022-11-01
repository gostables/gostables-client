import { useEffect, useState } from "react";
import { getCurrency } from "../utils/currencies";
import AddClientAddressTogStable from "./addClientAddressTogStable";

const GStableAdmin = (props) => {
  const [details, setDetails] = useState({
    status: false,
    address: "",
    clients: [],
  });
  const [, setgStableContract] = useState({});
  useEffect(() => {
    let timer = setInterval(() => {
      initgStableContract();
    }, 5 * 1000);

    return () => {
      clearInterval(timer);
      console.log("unmounting gStableAdmin");
    };
  }, []);

  const initgStableContract = async () => {
    try {
      let currency = getCurrency(props.currencyKey);
      let gStableContract = await currency.gStableContract();

      let gStableDetails = await gStableContract.getDetails();
      setDetails(gStableDetails);

      setgStableContract(gStableContract);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title text-center">gStable Admin</h5>
          <p>{details.address}</p>
          <hr />
          <h6 className="card-title">Whitelisted Addresses</h6>
          <ul className="list-group list-group-flush">
            {details.clients.map((cl) => {
              return (
                <li className="list-group-item">
                  {window.tronWeb.address.fromHex(cl)}
                </li>
              );
            })}
          </ul>
          <AddClientAddressTogStable {...props}></AddClientAddressTogStable>
          <hr />
        </div>
      </div>
    </>
  );
};

export default GStableAdmin;
