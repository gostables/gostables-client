import { useEffect, useState } from "react";
import GoStableBaseContract from "../contracts/goStableBaseContract";
import SetGoStableAddress, {
  G_STABLE,
  MARKET,
  STABLE,
} from "./setGoStableAddress";

const GoStableBaseManager = (props) => {
  const { address } = props;
  const [stableCoinAddress, setStableCoinAddress] = useState("");
  const [marketAddress, setMarketAddress] = useState("");
  const [gStableCoinAddress, setgStableCoinAddress] = useState("");

  useEffect(() => {
    let timer = setInterval(() => {
      read();
    }, 5 * 1000);

    return () => {
      clearInterval(timer);
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
      {/* <SetGoStableAddress
        type={STABLE}
        address={address}
        key={"G_STABLE"}
      ></SetGoStableAddress> */}
      <hr />
      <p className="fw-bold">
        Market : {window.tronWeb.address.fromHex(marketAddress)}{" "}
      </p>
      {/* <SetGoStableAddress
        type={MARKET}
        address={address}
        key={"MARKET"}
      ></SetGoStableAddress> */}
      <hr />
      <p className="fw-bold">
        gStable : {window.tronWeb.address.fromHex(gStableCoinAddress)}{" "}
      </p>
      {/* <SetGoStableAddress
        type={G_STABLE}
        address={address}
        key={"STABLE"}
      ></SetGoStableAddress> */}
    </>
  );
};

export default GoStableBaseManager;
