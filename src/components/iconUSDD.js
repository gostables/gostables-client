import usddImg from "../img/usdd.png";

const USDDIcon = ({ height = 16, noTitle = false }) => {
  return (
    <>
      <img
        src={usddImg}
        alt="USDD"
        width={height}
        height={height}
        className="rounded-circle flex-shrink-0"
      />
      {noTitle ? <></> : <span className="mx-1">USDD</span>}
    </>
  );
};

export default USDDIcon;
