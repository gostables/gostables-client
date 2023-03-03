// import { useEffect, useState } from "react";
// import GoStableBaseContract from "../contracts/goStableBaseContract";
// import { usddContract } from "../contracts/usdContract";
// import { getCurrency } from "../utils/currencies";
// import InvestAvailable from "./investAvailable";
// import WithdrawFromTreasury from "./withdrawFromTreasury";

// const Balances = (props) => {
//   const { address, currencyKey } = props;
//   const [marketCoinBalance, setMarketCoinBalance] = useState(0);
//   const [marketCoinName, setMarketCoinName] = useState("");
//   const [marketCoinSymbol, setMarketCoinSymbol] = useState("");

//   useEffect(() => {
//     read();

//     return () => {
//       console.log("unmounting Balances");
//     };
//   }, []);

//   const read = async () => {
//     let currency = getCurrency(currencyKey);

//     //Market coin data
//     let marketContract = await currency.marketContract();
//     let marketCoinBalance = await marketContract.balanceOf(address);
//     let { name: marketCoinName, symbol: marketCoinSymbol } =
//       await marketContract.getNameSymbol();

//     setMarketCoinBalance(marketCoinBalance);
//     setMarketCoinName(marketCoinName);
//     setMarketCoinSymbol(marketCoinSymbol);
//   };

//   return (
//     <>
//       <h6 className="card-title">Balances</h6>
//       <p>
//         {marketCoinName} : {marketCoinBalance}
//       </p>
//     </>
//   );
// };

// export default Balances;
