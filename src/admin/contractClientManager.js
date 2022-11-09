import { useEffect, useState } from "react";
import ClientsContract from "../contracts/clientsContract";
import AddClientAddress from "./addClientAddress";

const ContractClientManager = (props) => {
  const [details, setDetails] = useState({
    status: false,
    address: "",
    clients: [],
  });
  const [, setContract] = useState({});
  useEffect(() => {
    getData();

    return () => {
      console.log("unmounting ContractClientManager");
    };
  }, []);

  const getData = async () => {
    try {
      let contract_ = new ClientsContract(props.address);

      let contract = await contract_.init();

      let details = await contract.getDetails();
      setDetails(details);

      setContract(contract);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
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
      <button className="btn btn-secondary btn-sm" onClick={getData}>
        Refresh
      </button>
      <AddClientAddress address={details.address}></AddClientAddress>
    </>
  );
};

export default ContractClientManager;
