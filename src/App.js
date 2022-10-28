import "./App.css";
import { Route, Routes } from "react-router";
import Exchange from "./components/exchange";
import Landing from "./components/landing";
import Navbar from "./components/navbar";
import AdminFaucets from "./admin/faucets";
import VaultAdmin from "./admin/vaultAdmin";
import CurrencyVault from "./components/currencyVault";
const App = () => {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route
          path="/exchange"
          // @ts-ignore
          exact
          element={<Exchange />}
        />
        <Route
          path="/vault"
          // @ts-ignore
          exact
          element={<CurrencyVault />}
        />
        <Route
          path="/faucets"
          // @ts-ignore
          exact
          element={<AdminFaucets />}
        />

        <Route
          path="/vaultadmin"
          // @ts-ignore
          exact
          element={<VaultAdmin />}
        />

        <Route
          path="*"
          // @ts-ignore
          element={<Landing />}
        />
      </Routes>
    </>
  );
};

export default App;
