import { useState } from "react";
import usddImg from "../usdd.png";
import { getCurrency, getCurrencyValues } from "../utils/currencies";
import moment from "moment";

const CurrencyVault = () => {
  const [percentAsCurrency, setPercentAsCurrency] = useState(0);

  let currency = getCurrency("TTDD");
  let calculatedCurrencyVal = 100;
  let balanceOfCurrency = 3000;
  let balanceOfStable = 2000;

  let previousDeposits = [
    {
      value: 1000,
      date: new Date("2021-12-17T03:24:00"),
    },
    {
      value: 3045,
      date: new Date("2021-10-17T03:24:00"),
    },
    {
      value: 4572,
      date: new Date(),
    },
  ];
  previousDeposits = previousDeposits.map((dep) => {
    let start = moment(dep.date);
    let end = moment(new Date());
    let diff = end.diff(start, "days");
    let allowWithdrawal = false;
    if (diff > 90 && dep.value < balanceOfCurrency) allowWithdrawal = true;
    return { ...dep, diff: end.diff(start, "days"), allowWithdrawal };
  });

  const previousDepositsJSX = (showAction) => {
    return (
      <>
        <p className="h5 my-3">Previous Deposits</p>
        <div className="row">
          <div className="col h6">Value (USDD)</div>
          <div className="col h6">Date</div>
          <div className="col h6"></div>
          <div className="col h6"></div>
        </div>
        {previousDeposits.map((d) => {
          return (
            <div class="row my-3">
              <div className="col">{d.value}</div>
              <div className="col">{d.date.toDateString()}</div>
              <div className="col">{d.diff} days ago</div>
              {showAction ? (
                <div className="col">
                  {d.allowWithdrawal ? (
                    <button
                      className="btn btn-primary btn-sm"
                      type="button"
                      onClick={console.log}
                    >
                      Withdraw
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
              ) : (
                <></>
              )}
            </div>
          );
        })}
      </>
    );
  };

  const depositJSX = () => {
    return (
      <div class="card mt-2">
        <div class="card-body">
          <h5 class="card-title mb-3">Deposit</h5>

          <div class="input-group mb-3">
            <div class="form-floating">
              <input
                type="text"
                class="form-control"
                id="floatingInputGroup1"
                placeholder="Deposit Value in USDD"
              />
              <label for="floatingInputGroup1">Deposit Value in USDD</label>
            </div>
            <span class="input-group-text">
              <img
                src={usddImg}
                alt="USDD"
                width="32"
                height="32"
                class="rounded-circle flex-shrink-0"
              />
            </span>
          </div>
          <h6 class="card-subtitle my-2 text-muted">
            You will recieve {percentAsCurrency} % as {currency.label} -{" "}
            {calculatedCurrencyVal}{" "}
            <img
              src={require("../" + currency.icon)}
              alt="USDD"
              width="32"
              height="32"
              class="rounded-circle flex-shrink-0"
            />
          </h6>
          <div className="d-grid gap-2 mt-5">
            <button
              className="btn btn-primary"
              type="button"
              onClick={console.log}
            >
              Deposit
            </button>
          </div>
        </div>
      </div>
    );
  };
  const withdrawJSX = () => {
    return (
      <div class="card mt-2">
        <div class="card-body">
          <h5 class="card-title">Withdraw</h5>
          <h6 class="card-subtitle my-2 text-muted">
            Balance {balanceOfCurrency}{" "}
            <img
              src={require("../" + currency.icon)}
              alt="USDD"
              width="24"
              height="24"
              class="rounded-circle flex-shrink-0"
            />
          </h6>
          {previousDepositsJSX(true)}
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col"></div>
        <div className="col-7">
          <div class="list-group w-auto">
            {getCurrencyValues().map((curr) => {
              return (
                <a
                  href="#"
                  class="list-group-item list-group-item-action d-flex gap-3 py-3"
                  aria-current="true"
                >
                  <img
                    src={require("../" + curr.icon)}
                    alt={curr.label}
                    width="32"
                    height="32"
                    class="rounded-circle flex-shrink-0"
                  />
                  <div class="d-flex gap-2 w-100 justify-content-between">
                    <div>
                      <h6 class="mb-0">{curr.label}</h6>
                    </div>
                    <div>$5000000.79</div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
        <div className="col"></div>
      </div>
      <div className="row mt-5">
        <div className="col-sm-6">{depositJSX()}</div>
        <div className="col-sm-6">{withdrawJSX()}</div>
      </div>
    </div>
  );
};

export default CurrencyVault;
