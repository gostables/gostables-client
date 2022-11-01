import { useEffect, useState } from "react";
import { ttddMarket } from "../contracts/marketContract";
import { usddContract } from "../contracts/usdContract";
import { getCurrency } from "../utils/currencies";
import SetLockInterval from "./setLockInterval";

const VaultAdmin = (props) => {
  const [details, setDetails] = useState({
    status: false,
    address: "",
    interval: "",
    stableCoinAddress: "",
    marketAddress: "",
    marketCoinBalance: 0,
  });
  const [vaultContract, setVaultContract] = useState({});
  useEffect(() => {
    let timer = setInterval(() => {
      initVaultContract();
    }, 5 * 1000);

    return () => {
      clearInterval(timer);
      console.log("unmounting VaultAdmin");
    };
  }, []);

  const initVaultContract = async () => {
    try {
      let currency = getCurrency(props.currencyKey);
      let vaultContract = await currency.vaultContract();

      let vaultDetails = await vaultContract.getDetails();
      //Market coin data
      let marketContract = await currency.marketContract();
      let marketCoinBalance = await marketContract.balanceOf(
        vaultContract.address
      );
      let { name: marketCoinName, symbol: marketCoinSymbol } =
        await marketContract.getNameSymbol();

      // usdd data
      let usdd = await usddContract();
      let usddBalance = await usdd.balanceOf(currency.vaultAddress);

      vaultDetails = {
        ...vaultDetails,
        marketCoinBalance,
        marketCoinName,
        marketCoinSymbol,
        usddBalance,
      };
      setDetails(vaultDetails);
      setVaultContract(vaultContract);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title text-center">Vault Admin</h5>
        <p>{window.tronWeb.address.fromHex(details.address)} </p>
        <hr />
        <h6 className="card-title">Balances</h6>
        <p>
          {details.marketCoinName} : {details.marketCoinBalance}
        </p>
        <p>USDD : {details.usddBalance}</p>
        <hr />
        <h6 className="card-title">Addresses</h6>
        <p>
          Stable Coin :{" "}
          {window.tronWeb.address.fromHex(details.stableCoinAddress)}{" "}
        </p>
        <p>Market : {window.tronWeb.address.fromHex(details.marketAddress)} </p>
        <hr />
        <h6 className="card-title">Lock Interval</h6>
        <p>Lock Interval : {details.interval}</p>
        <SetLockInterval
          vaultContract={vaultContract}
          {...props}
        ></SetLockInterval>
        <hr />
      </div>
    </div>
  );
};

export default VaultAdmin;
