import usddImg from "../usdd.png";

const USDDIcon = ({ height = 16, noTitle = false }) => {
  return (
    <>
      <span className="px-2">
        <img
          src={usddImg}
          alt="USDD"
          width={height}
          height={height}
          className="rounded-circle flex-shrink-0"
        />
      </span>
      <span className="mx-2">{noTitle ? "" : "USDD"}</span>
    </>
  );
};

export default USDDIcon;
