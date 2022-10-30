const VaultAdmin = () => {
  // const [ttddContract, setTTDDContract] = useState();
  // const [stableCoinList, setStableCoinList] = useState([]);
  // const [conversionRatio, setConversionRatio] = useState();
  // const [swapFeesFactor, setSwapFeesFactor] = useState();

  // useEffect(() => {
  //   setTTDDVaultContract();
  //   return () => {
  //     console.log("unmounting VaultAdmin");
  //   };
  // }, []);

  // const setTTDDVaultContract = async () => {
  //   let ttddVault = await ttddVault_();
  //   let stableCoinList = await ttddVault.stableCoinsSupported();
  //   let conversionRatio_ = await ttddVault.getConversion();
  //   setTTDDContract(ttddVault);
  //   setStableCoinList(stableCoinList);
  //   setConversionRatio(conversionRatio_);
  // };

  // useEffect(() => {
  //   vaultPublisher.attach(setVaultDetails);
  //   return () => {
  //     vaultPublisher.detach(setVaultDetails);
  //   };
  // }, []);

  // const setVaultDetails = async (vaultDetails) => {
  //   // console.log("updating vault data ...", vaultDetails);
  //   setStableCoinList(vaultDetails.stableCoinsSupported);
  //   setConversionRatio(vaultDetails.conversionRatio);
  // };

  return (
    <div className="container my-3">
      <div className="row mt-5">
        <div className="col"></div>
        <div className="col-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">goStable Admin</h5>
              <hr />
              <h6 className="card-title text-center">Stable Coins</h6>
              <ul className="list-group list-group-flush">
                <li className="list-group-item  d-flex justify-content-between">
                  <div className="small">Id</div>
                  <div className="small">Address</div>
                </li>
                {/* {stableCoinList.map((sc) => (
                  <li
                    className="list-group-item  d-flex justify-content-between"
                    key={sc.id}
                  >
                    <div className="small">{sc.id}</div>
                    <div className="small">
                      {window.tronWeb.address.fromHex(sc.address)}
                    </div>
                  </li>
                ))} */}
              </ul>
              <hr />
              <h6 className="card-title text-center">Conversion Ratio</h6>
              {/* <p>1 USD ≈ {conversionRatio} TTDD</p>
              <SetConversionRatio
                ttddContract={ttddContract}
              ></SetConversionRatio> */}
              <hr />
              <h6 className="card-title text-center">Protocol Fees</h6>
              {/* <p>Swap Fees Factor</p>
              <SetSwapFeesFactor
                ttddContract={ttddContract}
              ></SetSwapFeesFactor> */}
            </div>
          </div>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
};

export default VaultAdmin;
