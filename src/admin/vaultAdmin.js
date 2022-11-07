import { useEffect, useState } from "react";
import { usddContract } from "../contracts/usdContract";
import { getCurrency } from "../utils/currencies";
import ContractClientManager from "./contractClientManager";
import DistributeRewards from "./distributeRewards";
import GoStableBaseManager from "./goStableBaseManager";
import SetLockInterval from "./setLockInterval";
import TreasuryManager from "./treasuryManager";

const VaultAdmin = (props) => {
  const [details, setDetails] = useState({
    status: false,
    address: "",
    interval: "",
    allocatedRewards: "",
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

      //gStable Data
      let gStableContract = await currency.gStableContract();
      let { name: gStableCoinName, symbol: gStableCoinSymbol } =
        await gStableContract.getNameSymbol();

      let gStableBalance = await gStableContract.balanceOf(
        vaultContract.address
      );

      vaultDetails = {
        ...vaultDetails,
        marketCoinBalance,
        marketCoinName,
        marketCoinSymbol,
        gStableCoinName,
        gStableCoinSymbol,
        gStableBalance,
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
        <ContractClientManager
          address={getCurrency(props.currencyKey).vaultAddress}
          key={getCurrency(props.currencyKey).vaultAddress}
        ></ContractClientManager>
        <hr />
        <h6 className="card-title">Balances</h6>
        <p>
          {details.marketCoinName} : {details.marketCoinBalance}
        </p>
        <hr />
        <TreasuryManager
          address={getCurrency(props.currencyKey).vaultAddress}
          key={
            getCurrency(props.currencyKey).vaultAddress + "VaultTreasuryManager"
          }
        ></TreasuryManager>
        <hr />
        <GoStableBaseManager
          address={getCurrency(props.currencyKey).vaultAddress}
          key={
            getCurrency(props.currencyKey).vaultAddress + "GoStableBaseManager"
          }
        ></GoStableBaseManager>
        <hr />
        <p>Lock Interval : {details.interval} Hour(s)</p>
        <SetLockInterval
          vaultContract={vaultContract}
          {...props}
        ></SetLockInterval>
        <hr />
        <p>
          {details.gStableCoinName} : {details.gStableBalance}
        </p>
        <p>Allocated Rewards : {details.allocatedRewards}</p>
        <p className="small muted">
          You should not allocate more than{" "}
          {details.gStableBalance - details.allocatedRewards}{" "}
          {details.gStableCoinName}
        </p>
        <DistributeRewards {...props}></DistributeRewards>
      </div>
    </div>
  );
};

export default VaultAdmin;
