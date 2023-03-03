import "./App.css";
import { Route, Routes } from "react-router";
import Navbar from "./components/navbar";
import AdminFaucets from "./components/faucets";
import SwapPage from "./components/swapPage";
import CurrencyVaultPage from "./components/currencyVaultPage";
import currencyPublisher from "./publishers/currency";
import { useEffect, useState } from "react";
import { getCurrencies } from "./utils/currencies";
import WalletDashboard from "./components/wallet/wdb";
const App = () => {
  const [selectedCurrency, setSelectedCurrency] = useState(
    getCurrencies()[0].key
  );
  useEffect(() => {
    currencyPublisher.attach(setSelectedCurrency);

    return () => {
      currencyPublisher.detach(setSelectedCurrency);
    };
  }, [selectedCurrency]);

  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route
          path="/wallet"
          // @ts-ignore
          exact
          element={<WalletDashboard currencyKey={selectedCurrency} />}
        />
        <Route
          path="/vault"
          // @ts-ignore
          exact
          element={<CurrencyVaultPage currencyKey={selectedCurrency} />}
        />
        <Route
          path="/faucets"
          // @ts-ignore
          exact
          element={<AdminFaucets />}
        />

        <Route
          path="*"
          // @ts-ignore
          element={
            <SwapPage currencyKey={selectedCurrency} key={selectedCurrency} />
          }
        />
      </Routes>
    </>
  );
};

export default App;
