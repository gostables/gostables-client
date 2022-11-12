import "./App.css";
import { Route, Routes } from "react-router";
import Navbar from "./components/navbar";
import AdminFaucets from "./admin/faucets";
import SwapPage from "./components/swapPage";
import WalletPage from "./components/walletPage";
import AdminPage from "./admin/adminPage";
import CurrencyVaultPage from "./components/currencyVaultPage";
import currencyPublisher from "./publishers/currency";
import { useEffect, useState } from "react";
import { getCurrencies } from "./utils/currencies";
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
          element={<WalletPage currencyKey={selectedCurrency} />}
        />

        <Route
          path="/admin"
          // @ts-ignore
          exact
          element={<AdminPage currencyKey={selectedCurrency} />}
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
