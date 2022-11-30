import SwapExchange from "./swapExchange";

const SwapPage = (props) => {
  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col"></div>
        <div className="col-md-8">
          <SwapExchange {...props}></SwapExchange>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
};
export default SwapPage;
