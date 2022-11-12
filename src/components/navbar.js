import { NavLink } from "react-router-dom";
import SelectCurrency from "../components/selectCurrency";
import currencyPublisher from "../publishers/currency";
import DappLogo from "../svg/logolite";
import DollarIcon from "../svg/dollar";
import SwapIcon from "../svg/swap";
import VaultIcon from "../svg/vault";
import WalletIcon from "../svg/wallet";
import { getCurrencies } from "../utils/currencies";
import USDDIcon from "./iconUSDD";
import WalletConnect from "./walletConnect";

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
    <div className="container justify-content-center">
      <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">
            <DappLogo></DappLogo>
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <div class="currency-select w-25">
              <SelectCurrency
                setSelectedCoin={(val) =>
                  currencyPublisher.setCurrency(val.value)
                }
                options={getCurrenciesForDropDown()}
                defaultValue={getCurrenciesForDropDown()[0]}
              ></SelectCurrency>
            </div>
            <ul class="navbar-nav me-auto mb-lg-0">
              <li class="nav-item">
                <NavLink to="/faucets" className="nav-link">
                  <DollarIcon></DollarIcon> Faucet
                </NavLink>
              </li>
              <li class="nav-item">
                <NavLink to="/swap" className="nav-link">
                  <span className="px-2">
                    <SwapIcon></SwapIcon>
                  </span>
                  Swap
                </NavLink>
              </li>
              <li class="nav-item">
                <NavLink to="/vault" className="nav-link">
                  <span className="px-2">
                    <VaultIcon></VaultIcon>
                  </span>
                  Vaults
                </NavLink>
              </li>
            </ul>
            <div class="btn btn-outline-primary wallet-btn">
              <NavLink to="/wallet" className="nav-link">
                <span className="px-2">
                  <WalletIcon></WalletIcon>
                </span>{" "}
                Wallet
              </NavLink>
            </div>
            <div class="">
              <WalletConnect></WalletConnect>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
