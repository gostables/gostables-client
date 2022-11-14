import { useEffect, useState } from "react";
import walletPublisher from "../../publishers/wallet";
import { formatM, formatUSD } from "../../utils/currencyFormatter";
import USDDIcon from "../iconUSDD";

const VaultData = (props) => {
  const { currency, updateTotal, walletAddress, index } = props;
  const [balance, setBalance] = useState("");
  const [rewards, setRewards] = useState("");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      read();
    }, index * 1000);

    return () => {
      console.log(`unmounting VaultData ${currency.key}`);
    };
  }, []);
  const read = async () => {
    try {
      let vaultContract = await currency.vaultContract();
      let vaultBalance = "";
      if (walletAddress) {
        vaultBalance = await vaultContract.balanceOf(walletAddress);
        let vaultRewards = await vaultContract.getPendingRewards(walletAddress);
        setBalance(vaultBalance);
        setRewards(vaultRewards);
      }
      // if (vaultBalance) {
      updateTotal({
        balance: vaultBalance,
        currencyKey: currency.key,
      });
      // }
    } catch (error) {
      console.error(error);
      if (attempt < 10) {
        setTimeout(() => {
          read();
        }, index * 1000);
        console.log(`${currency.key} Vault Attempt : ${attempt + 1}`);
        setAttempt(attempt + 1);
      }
    }
  };

  const claim = async (currencyKey) => {
    let vaultContract = await currency.vaultContract();
    await vaultContract.claimPendingRewards(walletAddress);
    setTimeout(() => {
      read();
    }, index * 1000);
  };

  return (
    <li class="list-group-item">
      <div className="d-flex justify-content-between">
        <span className="">
          <img src={currency.icon} height="24"></img>
          <span className="px-1">{currency.label} Vault</span>
        </span>

        <span className="font-monospace">
          {balance ? formatUSD(balance.balance) : ""}
          <USDDIcon noTitle={true}></USDDIcon>
        </span>

      </div>

      {/* {rewards ? ( */}
      <div className="d-flex justify-content-right small text-muted">
        {rewards > 0 ? (
        <>
         <span className="mx-2">Rewards : 
         <span className="mx-1"><img src={currency.icon} height="16"></img></span>
         {formatM(rewards)}</span>


         <button
            className="btn btn-danger btn-sm mx-2"
            style={{ fontSize: "70%" },{ marginTop: "-5px" }}
            onClick={() => claim(currency.key)}
          >
            Claim
          </button>
        </>
        ) : (
          <>
            <span classsName="mx-2">- No Rewards yet -</span>
          </>
        )}
        

      </div>
      {/* ) : (
        ""
      )} */}
    </li>
  );
};

export default VaultData;
