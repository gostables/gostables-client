//https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-strings
export const formatUSD = (number) => {
  let frmtr = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return frmtr.format(number);
};

export const formatM = (number) => {
  return formatUSD(number).replace("$", "");
};

// let val = 108689273.5677777;
// let formattedM = formatM(val);
// console.log(formattedM);
// let formattedD = formatUSD(val);
// console.log(formattedD);
