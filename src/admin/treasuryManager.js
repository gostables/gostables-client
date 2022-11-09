import { useEffect, useState } from "react";
import GoStableBaseContract from "../contracts/goStableBaseContract";
import { usddContract } from "../contracts/usdContract";
import InvestAvailable from "./investAvailable";
import WithdrawFromTreasury from "./withdrawFromTreasury";

const TreasuryManager = (props) => {
  const { address } = props;
  const [totalInvested, setTotalInvested] = useState(0);
  const [usddBalance, setUSDDBalance] = useState(0);

  useEffect(() => {
    read();

    return () => {
      console.log("unmounting TreasuryManager");
    };
  }, []);

  const read = async () => {
    let contract_ = new GoStableBaseContract(address);
    let contract = await contract_.init();
    let totalInvested = await contract.getTreasuryStableCoinValue();
    // usdd data
    let usdd = await usddContract();
    let usddBalance = await usdd.balanceOf(address);

    setTotalInvested(totalInvested);
    setUSDDBalance(usddBalance);
  };

  return (
    <>
      <h6 className="card-title">Treasury</h6>
      <p className="small muted">
        Total Invested USDD is the USDD that is already invested in JLM
      </p>
      <p className="fw-bold">Total Invested USDD : {totalInvested}</p>
      <p className="small muted">
        Available USDD is the USDD that is NOT yet invested in JLM
      </p>
      <p className="fw-bold">Available USDD : {usddBalance}</p>
      <button className="btn btn-secondary btn-sm" onClick={read}>
        Refresh
      </button>
      <p className="small muted pt-3">Invest from Available</p>
      <InvestAvailable {...props}></InvestAvailable>
      <p className="small muted pt-3">Withdraw from Invested</p>
      <WithdrawFromTreasury {...props}></WithdrawFromTreasury>
    </>
  );
};

export default TreasuryManager;
