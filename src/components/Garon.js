import React from "react";

const Garon = ({ name, number, onRemove, selected, onSwap }) => {
  return (
    <div className={`garon_item ${selected ? "garon_item_selected" : ""}`}>
      <p className="garon_num">{number}</p>
      <div className="garon_name" onClick={onSwap}>
        {name}
      </div>
      <p className="garon_del" onClick={onRemove}>
        X
      </p>
    </div>
  );
};

export default Garon;
