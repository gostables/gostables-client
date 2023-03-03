// import { useEffect, useState } from "react";
// import { getCurrency } from "../utils/currencies";

// const SetLockInterval = (props) => {
//   const { currencyKey } = props;
//   const [intrvl, setIntrvl] = useState("");
//   const [interval, setInterval] = useState(0);

//   useEffect(() => {
//     read();

//     return () => {
//       console.log("unmounting SetLockInterval");
//     };
//   }, []);

//   const read = async () => {
//     let currency = getCurrency(currencyKey);

//     let vaultContract = await currency.vaultContract();
//     let interval = await vaultContract.getInterval();

//     setInterval(interval);
//   };

//   const set = async () => {
//     setInterval("");
//     try {
//       console.log(`SetLockInterval : ${interval}`);
//       if (intrvl) {
//         let currency = getCurrency(currencyKey);
//         let vaultContract = await currency.vaultContract();
//         await vaultContract.setInterval(intrvl);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const updateInterval = (e) => {
//     if (e.target.value) {
//       setIntrvl(e.target.value);
//     }
//   };

//   return (
//     <>
//       <p>Lock Interval : {interval} Hour(s)</p>
//       <form className="row g-3 d-flex justify-content-between">
//         <div className="col-sm-5">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Lock Interval"
//             value={intrvl}
//             onChange={updateInterval}
//           />
//         </div>

//         <div className="col-sm-5">
//           <div className="d-grid gap-2">
//             <button
//               type="button"
//               className="btn btn-primary"
//               onClick={() => set()}
//             >
//               Set Lock Interval
//             </button>
//           </div>
//         </div>
//       </form>
//     </>
//   );
// };

// export default SetLockInterval;
