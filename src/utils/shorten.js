const getMaskedAddress = (accountNumber, start = 2, end = 32) => {
  if (accountNumber) {
    return accountNumber.replace(accountNumber.substring(start, end), "****");
  }
  return "";
};

const getEthValue = (weiStr) => {
  let flVal = parseFloat(weiStr);
  return flVal.toFixed(5) + "";
};

export { getMaskedAddress, getEthValue };
