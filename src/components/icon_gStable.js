import { getCurrency } from "../utils/currencies";

const StableIcon = (props) => {
  const { height = 16, noTitle = false, currencyKey } = props;
  let curr = getCurrency(currencyKey);
  return (
    <>
      <span className="px-2">
        <img
          src={curr.icon}
          alt={curr.label}
          width={height}
          height={height}
          className="rounded-circle flex-shrink-0"
        />
      </span>
      <span className="mx-2">{noTitle ? "" : curr.label}</span>
    </>
  );
};

export default StableIcon;
