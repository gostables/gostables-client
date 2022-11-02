import Select, { components } from "react-select";
// https://react-select.com/home

const { Option, SingleValue } = components;
const IconOption = (props) => {
  return (
    <Option {...props}>
      <img src={props.data.icon} style={{ width: 18, paddingRight: 4 }} />
      {props.data.text}
    </Option>
  );
};
const IconDisplayOption = (props) => {
  return (
    <SingleValue {...props}>
      <img src={props.data.icon} style={{ width: 18, paddingRight: 4 }} />
      {props.data.text}
    </SingleValue>
  );
};

const SelectCurrency = (props) => {
  const { options, setSelectedCoin } = props;
  console.log("data", options[0]);
  const setCurrencySelected = (_val) => {
    console.log("selected", _val);
    setSelectedCoin(_val);
  };

  return (
    <div className="">
      <Select
        className="basic-single"
        classNamePrefix="select"
        defaultValue={options[0]}
        name="currencies"
        options={options}
        components={{ Option: IconOption, SingleValue: IconDisplayOption }}
        onChange={setCurrencySelected}
      />
    </div>
  );
};

export default SelectCurrency;
