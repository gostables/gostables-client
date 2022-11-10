import { getCurrencies } from "../utils/currencies";

class CurrencyPublisher {
  currencyKey = getCurrencies()[0].key;
  observers = [];
  setCurrency = (currencyKey_) => {
    console.log("updatedCurrency", currencyKey_);
    this.currencyKey = currencyKey_;
    this.notify();
  };
  attach = (observer) => {
    this.observers.push(observer);
  };

  detach = (observer) => {
    this.observers = this.observers.filter((observed) => observed !== observer);
  };

  notify = () => {
    this.observers.forEach((observer) => observer(this.currencyKey));
  };
}

const currencyPublisher = new CurrencyPublisher();

export default currencyPublisher;
