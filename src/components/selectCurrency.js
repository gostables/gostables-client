import Select, { components } from "react-select";
// https://react-select.com/home

const styles = {
   fontSize: '14px',
   display: 'inline',
}

const { Option, SingleValue } = components;
const IconOption = (props) => {
  return (
    <Option {...props}>
      <img src={props.data.icon} style={{ width: 30, paddingRight: 4 }} />
       <div style={styles}>{props.data.text}</div>
    </Option>
  );
};
const IconDisplayOption = (props) => {
  return (
    <SingleValue {...props}>
      <img src={props.data.icon} style={{ width: 30, paddingRight: 4 }} />
       <div style={styles}>{props.data.text}</div>
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
    <div className="currency-selector">
      <Select
        className="basic-single"
        classNamePrefix="select"
        defaultValue={options[0]}
        name="currencies"
        options={options}
        components={{ Option: IconOption, SingleValue: IconDisplayOption }}
        onChange={setCurrencySelected}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: '#01948d',
          },
        })}
      />
    </div>
  );
};

export default SelectCurrency;
