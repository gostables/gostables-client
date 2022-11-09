import { useEffect, useState } from "react";
import GoStableBaseContract from "../contracts/goStableBaseContract";

const GoStableBaseManager = (props) => {
  const { address } = props;
  const [stableCoinAddress, setStableCoinAddress] = useState("");
  const [marketAddress, setMarketAddress] = useState("");
  const [gStableCoinAddress, setgStableCoinAddress] = useState("");

  useEffect(() => {
    read();

    return () => {
      console.log("unmounting GoStableBaseManager");
    };
  }, []);

  const read = async () => {
    let contract_ = new GoStableBaseContract(address);
    let contract = await contract_.init();
    let ma = await contract.getMarketAddress();
    let sca = await contract.getStableCoinAddress();
    let gsca = await contract.getgStableCoinAddress();
    setMarketAddress(ma);
    setStableCoinAddress(sca);
    setgStableCoinAddress(gsca);
  };

  return (
    <>
      <h6 className="card-title">Addresses</h6>
      <p className="fw-bold">
        StableCoin : {window.tronWeb.address.fromHex(stableCoinAddress)}{" "}
      </p>

      <hr />
      <p className="fw-bold">
        Market : {window.tronWeb.address.fromHex(marketAddress)}{" "}
      </p>

      <hr />
      <p className="fw-bold">
        gStable : {window.tronWeb.address.fromHex(gStableCoinAddress)}{" "}
      </p>
    </>
  );
};

export default GoStableBaseManager;
