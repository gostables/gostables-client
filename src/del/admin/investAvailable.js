// import { useState } from "react";
// import GoStableBaseContract from "../contracts/goStableBaseContract";

// const InvestAvailable = (props) => {
//   const { address } = props;
//   const [amount, setAmount] = useState("");

//   const set = async () => {
//     let contract_ = new GoStableBaseContract(address);
//     let contract = await contract_.init();

//     setAmount("");
//     try {
//       console.log(`InvestAvailable : ${amount}`);
//       if (amount) {
//         await contract.invest(amount);
//       }
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
//       <form className="row g-3 d-flex justify-content-between">
//         <div className="col-sm-5">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Amount"
//             value={amount}
//             onChange={updateAmount}
//           />
//         </div>

//         <div className="col-sm-5">
//           <div className="d-grid gap-2">
//             <button
//               type="button"
//               className="btn btn-primary"
//               onClick={() => set()}
//             >
//               Invest
//             </button>
//           </div>
//         </div>
//       </form>
//     </>
//   );
// };

// export default InvestAvailable;
