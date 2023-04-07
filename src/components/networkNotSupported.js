const NetworkNotSupported = () => {
  return (
    <div className="alert alert-primary mt-5 text-center text-black" role="alert">
      <h4 className="alert-heading">Network not yet supported...</h4>
      <p>
        goStables Protocol is currently deployed on the <strong>Tron Mainnet</strong> network.<br/>
        Please switch your TronLink to the Mainnet network to continue.
      </p>
    </div>
  );
};

export default NetworkNotSupported;
