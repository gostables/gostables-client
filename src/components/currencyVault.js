import { useState } from "react";

const CurrencyVault = () => {
  const [display, setDisplay] = useState(true);
  const depositJSX = () => {
    return <div class="card-body">Deposit</div>;
  };
  const redeemJSX = () => {
    return <div class="card-body">Redeem</div>;
  };

  const active = "active";

  return (
    <div class="card">
      <div class="card-body">
        <ul class="nav justify-content-center">
          <li class="nav-item">
            <a
              class={`nav-link ${display ? active : ""}`}
              href="#"
              onClick={() => setDisplay(true)}
            >
              Deposit
            </a>
          </li>
          <li class="nav-item">
            <a
              class={`nav-link ${display ? "" : active}`}
              href="#"
              onClick={() => setDisplay(false)}
            >
              Redeem
            </a>
          </li>
        </ul>
      </div>
      {display ? depositJSX() : redeemJSX()}
    </div>
  );
};
export default CurrencyVault;
