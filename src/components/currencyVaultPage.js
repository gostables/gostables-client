import CurrencyVaultList from "./currencyVaultList";

const CurrencyVaultPage = (props) => {
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col"></div>
        <div className="col-sm-8">
          <CurrencyVaultList {...props}></CurrencyVaultList>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
};

export default CurrencyVaultPage;
