const getMaskedAddress = (accountNumber, start = 3, end = 30) => {
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
