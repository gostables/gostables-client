// import { useEffect, useState } from "react";
// import { getCurrency } from "../utils/currencies";

// const DistributeRewards = (props) => {
//   const { currencyKey } = props;
//   const [gStableSymbol, set_gStableSymbol] = useState("");
//   const [gStableBalance, set_gStableBalance] = useState(0);
//   const [allocatedRewards, setAllocatedRewards] = useState(0);
//   const [amount, setAmount] = useState("");

//   useEffect(() => {
//     read();

//     return () => {
//       console.log("unmounting DistributeRewards");
//     };
//   }, []);

//   const read = async () => {
//     let currency = getCurrency(currencyKey);

//     let vaultContract = await currency.vaultContract();

//     let allocatedRewards = await vaultContract.getAllocatedRewards();

//     //gStable Data
//     let gStableContract = await currency.gStableContract();
//     let { name: gStableCoinName, symbol: gStableCoinSymbol } =
//       await gStableContract.getNameSymbol();

//     let gStableBalance = await gStableContract.balanceOf(vaultContract.address);

//     set_gStableSymbol(gStableCoinSymbol);
//     set_gStableBalance(gStableBalance);
//     setAllocatedRewards(allocatedRewards);
//   };

//   const distribute = async () => {
//     try {
//       let currency = getCurrency(props.currencyKey);
//       let vaultContract = await currency.vaultContract();
//       await vaultContract.setRewards(amount);
//       setAmount(0);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const updateAmount = (e) => {
//     if (e.target.value) {
//       setAmount(e.target.value);
//     }
//   };

//   return (
//     <>
//       <p>
//         {gStableSymbol} : {gStableBalance}
//       </p>
//       <p>Allocated Rewards : {allocatedRewards}</p>

//       <p className="small muted">
//         You should not allocate more than {gStableBalance - allocatedRewards}{" "}
//         {gStableSymbol}
//       </p>
//       <form className="row g-3 d-flex justify-content-between">
//         <div className="col-sm-7">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="gStable Amount"
//             value={amount}
//             onChange={updateAmount}
//           />
//         </div>
//         <div className="col">
//           <div className="d-grid gap-2">
//             <button
//               type="button"
//               className="btn btn-primary"
//               onClick={() => distribute()}
//             >
//               Allocate Rewards
//             </button>
//           </div>
//         </div>
//       </form>
//     </>
//   );
// };

// export default DistributeRewards;
