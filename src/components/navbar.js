import { NavLink } from "react-router-dom";
import SelectCurrency from "../del/selectCurrency";
import currencyPublisher from "../publishers/currency";
import { getCurrencies } from "../utils/currencies";
import WalletConnect from "./walletConnect";

const Navbar = () => {
  return (
    <div className="container">
      <header className="d-flex flex-wrap justify-content-center py-x mb-4 border-bottom">
        <div
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
        >
          <NavLink to="/" className="nav-link">
            {
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width={150}
                height={41}
                viewBox="0 0 150 41"
              >
                <image
                  x={2}
                  y={4}
                  width={145}
                  height={36}
                  xlinkHref="data:img/png;base64,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"
                />
              </svg>
            }
          </NavLink>
        </div>
        <ul className="nav">
          <li className="nav-item">
            <SelectCurrency
              setSelectedCoin={(val) => currencyPublisher.setCurrency(val.key)}
              data={getCurrencies()}
            ></SelectCurrency>
          </li>
          <li className="nav-item">
            <NavLink to="/admin" className="nav-link">
              Admin
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/" className="nav-link">
              Swap
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/wallet" className="nav-link">
              Wallet
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/vault" className="nav-link">
              Vaults
            </NavLink>
          </li>
          <li className="nav-item web3-connect">
            <WalletConnect></WalletConnect>
          </li>
        </ul>
      </header>
    </div>
  );
};

export default Navbar;
