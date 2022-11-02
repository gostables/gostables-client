import Select, { components } from "react-select";
// https://react-select.com/home

const { Option, SingleValue } = components;
const IconOption = (props) => {
  return (
    <Option {...props}>
      <img
        // src={require("../" + props.data.icon)}
        src={props.data.icon}
        style={{ width: 18, paddingRight: 4 }}
        alt={props.data.label}
      />
      {props.data.text}
    </Option>
  );
};
const IconDisplayOption = (props) => {
  return (
    <SingleValue {...props}>
      <img
        // src={require("../" + props.data.icon)}
        src={props.data.icon}
        style={{ width: 18, paddingRight: 4 }}
        alt={props.data.label}
      />
      {props.data.text}
    </SingleValue>
  );
};

const SelectCurrency = (props) => {
  const { data, setSelectedCoin } = props;
  console.log("data", data[0]);
  const setCurrencySelected = (_val) => {
    console.log("selected", _val);
    setSelectedCoin(_val);
  };

  return (
    <div className="">
      <Select
        className="basic-single"
        classNamePrefix="select"
        defaultValue={data[0]}
        name="currencies"
        options={data}
        components={{ Option: IconOption, SingleValue: IconDisplayOption }}
        onChange={setCurrencySelected}
      />
    </div>
  );
};

export default SelectCurrency;
