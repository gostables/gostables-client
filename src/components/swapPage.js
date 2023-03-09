import SwapExchange from "./swapExchange";
import SwapGStable from "./swapGStables";

const SwapPage = (props) => {
  let component  =  <SwapExchange {...props}></SwapExchange>;
  if(props.gStables){
    component = <SwapGStable {...props}></SwapGStable>;
  }
  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col"></div>
        <div className="col-md-8">
          {/* <SwapExchange {...props}></SwapExchange> */}
          {component}
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
};
export default SwapPage;
