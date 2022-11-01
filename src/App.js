import "./App.css";
import { Route, Routes } from "react-router";
import Landing from "./components/landing";
import Navbar from "./components/navbar";
import AdminFaucets from "./admin/faucets";
import VaultAdmin from "./del/vaultAdmin";
import SwapPage from "./components/swapPage";
import WalletPage from "./components/walletPage";
import AdminPage from "./admin/adminPage";
import CurrencyVaultPage from "./components/currencyVaultPage";
const App = () => {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route
          path="/wallet"
          // @ts-ignore
          exact
          element={<WalletPage />}
        />

        <Route
          path="/admin"
          // @ts-ignore
          exact
          element={<AdminPage currencyKey={"TTDD"} />}
        />
        <Route
          path="/vault"
          // @ts-ignore
          exact
          element={<CurrencyVaultPage currencyKey={"TTDD"} />}
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
          element={<SwapPage currencyKey={"TTDD"} />}
        />
      </Routes>
    </>
  );
};

export default App;
