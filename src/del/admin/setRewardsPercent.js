// import { useEffect, useState } from "react";
// import { getCurrency } from "../utils/currencies";

// const SetRewardsPercent = (props) => {
//   const { currencyKey } = props;
//   const [rp, setRP] = useState("");
//   const [rewardsPercent, setRewardsPercent] = useState(0);

//   useEffect(() => {
//     read();

//     return () => {
//       console.log("unmounting SetRewardsPercent");
//     };
//   }, []);

//   const read = async () => {
//     let currency = getCurrency(currencyKey);

//     let swapContract = await currency.swapContract();
//     let rewardsPercent = await swapContract.getRewardsPercent();

//     setRewardsPercent(rewardsPercent);
//   };

//   const set = async () => {
//     setRP("");
//     try {
//       console.log(`SetRewardsPercent : ${rp}`);
//       if (rp) {
//         let currency = getCurrency(currencyKey);

//         let swapContract = await currency.swapContract();
//         await swapContract.setRewardsPercent(rp);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const updateRP = (e) => {
//     if (e.target.value) {
//       setRP(e.target.value);
//     }
//   };

//   return (
//     <>
//       <p>Rewards Percent : {rewardsPercent}</p>
//       <form className="row g-3 d-flex justify-content-between">
//         <div className="col-sm-5">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Reward Percent"
//             value={rp}
//             onChange={updateRP}
//           />
//         </div>

//         <div className="col-sm-5">
//           <div className="d-grid gap-2">
//             <button
//               type="button"
//               className="btn btn-primary"
//               onClick={() => set()}
//             >
//               Set Reward Percent
//             </button>
//           </div>
//         </div>
//       </form>
//     </>
//   );
// };

// export default SetRewardsPercent;
