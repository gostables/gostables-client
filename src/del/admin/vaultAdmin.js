// import { useEffect, useState } from "react";
// import currencyPublisher from "../publishers/currency";
// import { getCurrency } from "../utils/currencies";
// import Balances from "./balances";
// import ContractClientManager from "./contractClientManager";
// import DistributeRewards from "./distributeRewards";
// import GoStableBaseManager from "./goStableBaseManager";
// import SetLockInterval from "./setLockInterval";
// import TreasuryManager from "./treasuryManager";

// const VaultAdmin = (props) => {
//   const [vaultContract, setVaultContract] = useState(null);
//   const [currencyKey, setCurrencyKey] = useState(props.currencyKey);
//   useEffect(() => {
//     currencyPublisher.attach(updateCurrency);
//     return () => {
//       currencyPublisher.detach(updateCurrency);
//     };
//   }, []);
//   const updateCurrency = (currKey) => {
//     console.log("updating currency vault admin : ", currKey);
//     setCurrencyKey(currKey);
//     initVaultContract();
//   };

//   const initVaultContract = async () => {
//     try {
//       let currency = getCurrency(props.currencyKey);
//       if (!vaultContract) {
//         let vaultContract = await currency.vaultContract();
//         setVaultContract(vaultContract);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="card">
//       <div className="card-body">
//         <h5 className="card-title text-center">Vault Admin</h5>
//         <p>{getCurrency(currencyKey).vaultAddress} </p>
//         <hr />
//         <ContractClientManager
//           address={getCurrency(props.currencyKey).vaultAddress}
//           key={getCurrency(props.currencyKey).vaultAddress}
//         ></ContractClientManager>
//         <hr />
//         <Balances
//           address={getCurrency(currencyKey).vaultAddress}
//           currencyKey={currencyKey}
//           key={getCurrency(currencyKey).vaultAddress + "Balances"}
//         ></Balances>
//         <hr />
//         <TreasuryManager
//           address={getCurrency(currencyKey).vaultAddress}
//           key={getCurrency(currencyKey).vaultAddress + "VaultTreasuryManager"}
//         ></TreasuryManager>
//         <hr />
//         <GoStableBaseManager
//           address={getCurrency(currencyKey).vaultAddress}
//           key={getCurrency(currencyKey).vaultAddress + "GoStableBaseManager"}
//         ></GoStableBaseManager>
//         <hr />
//         <SetLockInterval
//           currencyKey={currencyKey}
//           key={getCurrency(currencyKey).vaultAddress + "SetLockInterval"}
//         ></SetLockInterval>
//         <hr />

//         <DistributeRewards
//           currencyKey={currencyKey}
//           key={getCurrency(currencyKey).vaultAddress + "DistributeRewards"}
//         ></DistributeRewards>
//       </div>
//     </div>
//   );
// };

// export default VaultAdmin;
