import { useEffect, useState } from "react";
import walletPublisher from "../../publishers/wallet";
import { formatM, formatUSD } from "../../utils/currencyFormatter";

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
  };

  return (
    <li class="list-group-item">
      <div className="d-flex justify-content-between">
        <span className="">
          <img src={currency.icon} height="24"></img>
          <span className="px-1">{currency.text}</span>
        </span>

        <span className="font-monospace">
          {balance ? formatUSD(balance.balance) : ""}
        </span>
      </div>

      {/* {rewards ? ( */}
      <div className="d-flex justify-content-end small text-muted">
        {rewards > 0 ? (
          <button
            className="btn btn-danger btn-sm mx-3"
            style={{ fontSize: "70%" }}
            onClick={() => claim(currency.key)}
          >
            Claim
          </button>
        ) : (
          <></>
        )}
        <span>Rewards : {formatUSD(rewards)}</span>
      </div>
      {/* ) : (
        ""
      )} */}
    </li>
  );
};

export default VaultData;
