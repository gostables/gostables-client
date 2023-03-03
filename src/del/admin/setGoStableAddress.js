// import { useState } from "react";
// import GoStableBaseContract from "../contracts/goStableBaseContract";

// export const MARKET = 1;
// export const G_STABLE = 2;
// export const STABLE = 3;

// const SetGoStableAddress = (props) => {
//   const [address, setAddress] = useState("");

//   const set = async () => {
//     let contract_ = new GoStableBaseContract(props.address);
//     let contract = await contract_.init();

//     setAddress("");
//     try {
//       console.log(`setAddress : ${props.type} ${address}`);
//       if (address) {
//         switch (props.type) {
//           case MARKET:
//             await contract.setMarket(address);
//             break;
//           case G_STABLE:
//             await contract.setgStable(address);
//             break;
//           case STABLE:
//             await contract.setStableCoin(address);
//             break;

//           default:
//             break;
//         }
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   const updateAddress = (e) => {
//     if (e.target.value) {
//       setAddress(e.target.value);
//     }
//   };

//   return (
//     <>
//       <div className="row  py-2 my-2">
//         <div className="col">Set New Address </div>
//       </div>
//       <form className="row g-3 d-flex justify-content-between">
//         <div className="col-sm-7">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Smart Contract Address"
//             value={address}
//             onChange={updateAddress}
//           />
//         </div>

//         <div className="col">
//           <div className="d-grid gap-2">
//             <button
//               type="button"
//               className="btn btn-primary"
//               onClick={() => set()}
//             >
//               Set
//             </button>
//           </div>
//         </div>
//       </form>
//     </>
//   );
// };

// export default SetGoStableAddress;
