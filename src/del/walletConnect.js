// import { useEffect, useState } from "react";
// import { ThreeDots } from "react-loader-spinner";
// import walletPublisher from "../publishers/wallet";
// import { getNetworkName } from "../utils/network";
// import { getMaskedAddress } from "../utils/shorten";

// const WalletConnect = () => {
//   const [walletDetails, setWalletDetails] = useState({
//     address: "",
//     network: "",
//     status: -1,
//   });
//   useEffect(() => {
//     walletPublisher.attach(setWalletDetails);
//     return () => walletPublisher.detach(setWalletDetails);
//   }, []);

//   let className = "px-3 small";

//   switch (walletDetails.status) {
//     case -1:
//       return (
//         <>
//         <button className="btn btn-primary web3-connect web3-dark content d-flex text-center">
//         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-power" viewBox="0 0 16 16">
//           <path d="M7.5 1v7h1V1h-1z"/>
//           <path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z"/>
//         </svg>
//           <div className={`${className} text-warning`}>Connecting Walllet...</div>
//         </button>
//         </>);
//     case 1:
//       return (
//         <>
//           <button className="btn btn-primary web3-connect">
//             <div className={`${className} text-success text-center text-xxs`}>
//               {getMaskedAddress(walletDetails.address)}
//               {" / "}
//               {getNetworkName(walletDetails.network)}
//             </div>
//           </button>
//         </>
//       );
//     case -2:
//       return (
//       <>
//       <button className="btn btn-primary web3-connect web3-dark">
//         <div className={`${className} text-danger`}>
//           Please install TronLink
//         </div>
//       </button>
//       </>
//       );
//     default:
//       return (
//         <div className="mt-2  mx-3">
//           <ThreeDots
//             height="26"
//             width="26"
//             radius="9"
//             color="#fff"
//             ariaLabel="three-dots-loading"
//             wrapperStyle={{}}
//             wrapperClassName=""
//             visible={true}
//           />
//         </div>
//       );
//   }
// };

// export default WalletConnect;
