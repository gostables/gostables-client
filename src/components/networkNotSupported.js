import React from "react";

const NetworkNotSupported = () => {
  return (
    <div className="alert alert-primary mt-5 text-center text-black" role="alert">
      <h4 className="alert-heading">Network not supported...</h4>
      <p>
        This version of goStables Protocol is currently deployed on the <strong>Tron Mainnet</strong> network.<br/>
        Please switch your TronLink to Mainnet network to continue.<br/>
        If you want to use the Nile Testnet version please go to <a href="https://nile.gostables.org">https://nile.gostables.org</a>
      </p>
    </div>
  );
};

export default NetworkNotSupported;
