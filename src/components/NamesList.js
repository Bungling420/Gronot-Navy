import React from "react";
import Button from "./Button";

const NamesList = ({ names, onRemove, onRemoveAll }) => {
  return (
    <div className="gronot_list">
      <Button type="button" onClick={onRemoveAll}>
        Delete all
      </Button>
      {names.map((name, index) => {
        return (
          <div key={index} onClick={() => onRemove(index)} className="garon">
            {name}
          </div>
        );
      })}
    </div>
  );
};

export default NamesList;
