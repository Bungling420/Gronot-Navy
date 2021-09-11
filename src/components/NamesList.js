import React from "react";
import Button from "./Button";
import { GiRollingDices } from "react-icons/gi";

const NamesList = ({ names, onRemove, onRemoveAll, onRandomize }) => {
  return (
    <div className="gronot_list">
      <div className="actions_btn">
        <Button type="button" onClick={onRemoveAll}>
          Delete all
        </Button>
        <Button type="button" onClick={onRandomize}>
          <GiRollingDices className="random_dice" />
        </Button>
      </div>
      {names.map((name, index) => {
        return (
          <div
            key={index}
            onClick={() => onRemove(index)}
            className="garon_item"
          >
            <p>{index + 1}</p>
            <div className="garon_name">{name}</div>
          </div>
        );
      })}
    </div>
  );
};

export default NamesList;
