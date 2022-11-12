import { useEffect, useState } from "react";
import walletPublisher from "../../publishers/wallet";
import { formatM, formatUSD } from "../../utils/currencyFormatter";

const VaultData = (props) => {
  const { currency, updateTotal, walletAddress } = props;
  const [balance, setBalance] = useState("");
  const [rewards, setRewards] = useState("");

  useEffect(() => {
    read();

    return () => {
      console.log(`unmounting VaultData ${currency.key}`);
    };
  }, []);
  const read = async () => {
    let vaultContract = await currency.vaultContract();
    let vaultBalance = "";
    if (walletAddress) {
      vaultBalance = await vaultContract.balanceOf(walletAddress);
      let vaultRewards = await vaultContract.getPendingRewards(walletAddress);
      setBalance(vaultBalance);
      setRewards(vaultRewards);
    }
    updateTotal({
      balance: vaultBalance,
      currencyKey: currency.key,
    });
  };

  return (
    <li class="list-group-item">
      <div>
        <img src={currency.icon} height="24"></img>
        <span className="px-3">
          <span className="px-1">{currency.label}</span>
          {balance ? formatM(balance.balance) : "-"}
        </span>
      </div>
      <div className="d-flex justify-content-between small text-muted">
        {rewards ? <span>Rewards : {formatUSD(rewards)}</span> : ""}
      </div>
    </li>
  );
};

export default VaultData;
