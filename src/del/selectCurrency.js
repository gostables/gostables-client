import Select, { components } from "react-select";
// https://react-select.com/home

const { Option, SingleValue } = components;
const IconOption = (props) => {
  return (
    <Option {...props}>
      <img
        src={require("../" + props.data.icon)}
        style={{ width: 18, paddingRight: 4 }}
        alt={props.data.label}
      />
      {props.data.label}
    </Option>
  );
};
const IconDisplayOption = (props) => {
  return (
    <SingleValue {...props}>
      <img
        src={require("../" + props.data.icon)}
        style={{ width: 18, paddingRight: 4 }}
        alt={props.data.label}
      />
      {props.data.label}
    </SingleValue>
  );
};

const SelectCurrency = (props) => {
  const { title, options, defaultValue, setSelectedCoin, setValue } = props;
  const setCurrencyValue = (e) => {
    setValue(e.target.value);
  };
  const setCurrencySelected = (_val) => {
    setSelectedCoin(_val);
  };
  return (
    <div className="">
      <p className="card-text">{title}</p>
      <div className="row">
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="0"
            onChange={setCurrencyValue}
          ></input>
        </div>
        <div className="col">
          <Select
            className="basic-single"
            classNamePrefix="select"
            defaultValue={defaultValue}
            name="color"
            options={options}
            components={{ Option: IconOption, SingleValue: IconDisplayOption }}
            onChange={setCurrencySelected}
          />
        </div>
      </div>
    </div>
  );
};

// export default SelectCurrency;
