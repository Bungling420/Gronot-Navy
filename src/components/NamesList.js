import React, { useState } from "react";
import Button from "./Button";
import { GiRollingDices } from "react-icons/gi";
import Garon from "./Garon";

const NamesList = ({ names, onRemove, onRemoveAll, onRandomize, onSwap }) => {
  const [selectedIndex, setSelectedIndex] = useState(undefined);

  const swapHandler = (index) => {
    if (selectedIndex === undefined) {
      return setSelectedIndex(index);
    }
    onSwap(selectedIndex, index);
    setSelectedIndex(undefined);
  };

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
      {names.map((name, index) => (
        <Garon
          key={index}
          number={index + 1}
          name={name}
          onSwap={() => swapHandler(index)}
          onRemove={() => onRemove(index)}
          selected={selectedIndex === index}
        />
      ))}
    </div>
  );
};

export default NamesList;
