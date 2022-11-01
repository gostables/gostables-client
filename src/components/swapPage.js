import SwapExchange from "./swapExchange";

const SwapPage = (props) => {
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-sm-4"></div>
        <div className="col-sm-4">
          <SwapExchange {...props}></SwapExchange>
        </div>
        <div className="col-sm-4"></div>
      </div>
    </div>
  );
};
export default SwapPage;
