import { NavLink } from "react-router-dom";
import { prodName } from "../utils/const";
import WalletConnect from "./walletConnect";

const Navbar = () => {
  return (
    <div className="container">
      <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
        <div
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
        >
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-down-up"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"
            />
          </svg> */}
          <NavLink to="/" className="nav-link">
            <span className="fs-4">{prodName}</span>
          </NavLink>
        </div>

        <ul className="nav nav-pills">
          <li className="nav-item">
            <NavLink to="/exchange" className="nav-link">
              Swap
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/vault" className="nav-link">
              Vault
            </NavLink>
          </li>

          <li className="nav-item">
            <WalletConnect></WalletConnect>
          </li>
        </ul>
      </header>
    </div>
  );
};

export default Navbar;
