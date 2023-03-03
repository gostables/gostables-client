import { NavLink } from "react-router-dom";
import SelectCurrency from "../components/selectCurrency";
import currencyPublisher from "../publishers/currency";
import DappLogo from "../svg/logolite";
import DollarIcon from "../svg/dollar";
import SwapIcon from "../svg/swap";
import VaultIcon from "../svg/vault";
import WalletIcon from "../svg/wallet";
import { getCurrencies } from "../utils/currencies";
import ConnectWallet from "./connectWallet";

const getCurrenciesForDropDown = () => {
  let currList = getCurrencies();
  return currList.map((curr) => ({
    value: curr.key,
    text: curr.text,
    icon: curr.icon,
  }));
};

const Navbar = () => {
  return (
    <div className="container justify-content-center py-3">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <DappLogo></DappLogo>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="currency-select">
              <SelectCurrency
                setSelectedCoin={(val) =>
                  currencyPublisher.setCurrency(val.value)
                }
                options={getCurrenciesForDropDown()}
                defaultValue={getCurrenciesForDropDown()[0]}
              ></SelectCurrency>
            </div>
            <ul className="navbar-nav me-auto mb-lg-0">
              <li className="nav-item">
                <NavLink to="/faucets" className="nav-link">
                  <DollarIcon></DollarIcon> Faucet
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/swap" className="nav-link">
                  <span className="px-2">
                    <SwapIcon></SwapIcon>
                  </span>
                  Swap
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/vault" className="nav-link">
                  <span className="px-2">
                    <VaultIcon></VaultIcon>
                  </span>
                  Vaults
                </NavLink>
              </li>
            </ul>
            <div className="btn btn-outline-primary wallet-btn">
              <NavLink to="/wallet" className="nav-link">
                <span className="px-2">
                  <WalletIcon></WalletIcon>
                </span>{" "}
                Wallet
              </NavLink>
            </div>
            <div className="">
              <ConnectWallet></ConnectWallet>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
