const NetworkNotSupported = () => {
  return (
    <div class="alert alert-primary mt-5 text-center text-black" role="alert">
      <h4 class="alert-heading">Network not yet supported...</h4>
      <p>
        goStables Protocol is currently deployed on the <strong>NILE</strong> network.<br/>
        Please switch your TronLink to the NILE network to continue.
      </p>
      <p class="mb-0">
        We are coming to Tron Mainnet soon!<br/>Thank you for your patience and stay tuned.
      </p>
    </div>
  );
};

export default NetworkNotSupported;
