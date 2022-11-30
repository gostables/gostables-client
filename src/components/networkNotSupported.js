const NetworkNotSupported = () => {
  return (
    <div class="alert alert-info mt-5" role="alert">
      <h4 class="alert-heading">Network not yet supported...</h4>
      <p>
        goStables are currently deployed on the <strong>NILE</strong> network.
        Please switch to the NILE network to continue.
      </p>
      <p class="mb-0">
        We are coming to Main net soon! Thank you for your patience.
      </p>
    </div>
  );
};

export default NetworkNotSupported;
