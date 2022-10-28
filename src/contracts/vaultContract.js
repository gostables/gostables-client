import { vaultDetails } from "../publishers/vault";
import {
  getStableCoin,
  getStableCoinValues,
  StableCoinType,
} from "../utils/stableCoins";
import { TTDDVaultAddress } from "./address";
import SmartContractBase from "./smartContractBase";

class Vault extends SmartContractBase {
  constructor(_address) {
    super(_address);
  }
  init = async () => {
    try {
      if (!this.contract) {
        this.contract = await window.tronWeb.contract().at(this.address);
      }
      return this;
    } catch (error) {
      console.error(error);
    }
    return null;
  };

  getDetails = async () => {
    let vaultDetails = {
      status: this.contract ? true : false,
      address: this.address,
      stableCoinSupported: await this.stableCoinsSupported(),
      conversion: await this.getConversion(),
    };
    return vaultDetails;
  };
  getConversion = async () => {
    this.check();
    let c = await this.contract.getConversion().call();
    return String(c);
  };
  setConversion = async (cr) => {
    this.check();
    if (!cr) throw new Error(`CR : ${cr}`);

    await this.contract.setConversion(cr).send({
      feeLimit: 100_000_000,
      callValue: 0,
      shouldPollResponse: false,
    });
  };
  isStableCoinSupported = async (stableCoinId) => {
    this.check();
    const resp = await this.contract
      .isStableCoinSupported(
        this.web3.utils.toWei(String(stableCoinId), "ether")
      )
      .call();
    console.log(resp);
    return resp;
  };
  stableCoinsSupported = async () => {
    this.check();
    const resp = await this.contract.getStableCoinsSupported().call();
    let stableCoinArray = [];
    if (Array.isArray(resp)) {
      if (resp.length > 1) {
        for (let x = 0; x < resp[0].length; x++) {
          let stableCoin = {
            id: String(resp[0][x]),
            address: resp[1][x],
          };
          stableCoinArray.push(stableCoin);
        }
      }
    }
    return stableCoinArray;
  };
  addNewStableCoin = async (id, address) => {
    this.check();
    if (!String(id)) throw new Error(`Id : ${id}`);
    if (!address) throw new Error(`Address : ${address}`);

    await this.contract.setStableCoin(address, String(id)).send({
      feeLimit: 100_000_000,
      callValue: 0,
      shouldPollResponse: false,
    });
  };
  deposit = async (_val, stableCoinType /*StableCoinType*/) => {
    this.check();
    if (!_val) throw new Error(`Number : ${_val}`);
    if (!getStableCoin(stableCoinType.type))
      throw new Error(`stableCoinType : ${stableCoinType}`);
    console.log(
      "deposit",
      this.web3.utils.toWei(String(_val), "ether"),
      stableCoinType.value
    );

    try {
      await this.contract
        .deposit(
          // _val,
          this.web3.utils.toWei(String(_val), "ether"),
          stableCoinType.value
        )
        .send({
          feeLimit: 100_000_000,
          callValue: 0,
          shouldPollResponse: false,
        });
    } catch (error) {
      console.error(error);
    }
  };
  withdraw = async (_val, stableCoinType /*StableCoinType*/) => {
    this.check();
    if (!_val) throw new Error(`Number : ${_val}`);
    if (!getStableCoin(stableCoinType.type))
      throw new Error(`stableCoinType : ${stableCoinType}`);
    console.log(
      "withdraw",
      this.web3.utils.toWei(String(_val), "ether"),
      stableCoinType.value
    );

    try {
      await this.contract
        .withdraw(
          this.web3.utils.toWei(String(_val), "ether"),
          stableCoinType.value
        )
        .send({
          feeLimit: 100_000_000,
          callValue: 0,
          shouldPollResponse: false,
        });
    } catch (error) {
      console.error(error);
    }
  };
  balanceOf = async (hodlerAddress) => {
    this.check();
    const balHex = await this.contract.balanceOf(hodlerAddress).call();
    const bal = this.web3.utils.fromWei(String(balHex), "ether");

    return bal;
  };
  getSwapFeesFactor = async () => {
    this.check();
    let c = await this.contract.getSwapFeesFactor().call();
    return String(c);
  };
  setSwapFeesFactor = async (sff) => {
    this.check();
    if (!sff) throw new Error(`SFF : ${sff}`);

    await this.contract.setSwapFeesFactor(sff).send({
      feeLimit: 100_000_000,
      callValue: 0,
      shouldPollResponse: false,
    });
  };
  getAccumulatedSwapFees = async () => {
    this.check();
    let c = await this.contract.getAccumulatedSwapFees().call();
    return String(c);
  };
}

const ttddVault_ = new Vault(TTDDVaultAddress);

export const ttddVault = async () => await ttddVault_.init();
