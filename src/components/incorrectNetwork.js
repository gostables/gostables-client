const IncorrectNetwork = () => {
  return (
    <div class="alert alert-info mt-5 py-3 text-center" role="alert">
      <p>goStables is currently deployed on the NILE testnet.</p>
      <p>
        Please switch to the NILE testnet in your wallet if you havent already.
      </p>
      {/* <p>Mainnet coming soon!.</p> */}
    </div>
  );
};

export default IncorrectNetwork;
