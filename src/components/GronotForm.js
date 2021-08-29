import React, { useRef, useState } from "react";
import Input from "./Input";
import Button from "./Button";
import NamesList from "./NamesList";
import calcGaurd from "../calcGaurd";

const GronotForm = ({ onFormSubmition }) => {
  const gronotNumberRef = useRef();
  const garonNameRef = useRef();
  const fromDateRef = useRef();
  const untilDateRef = useRef();
  const startHourRef = useRef();
  const endHourRef = useRef();

  const [gronotNames, setGronotNames] = useState([
    "שי",
    "אופק",
    "רייכמן",
    "סופר",
    "נוגט",
    "שפיגל",
  ]);
  const [namesDisable, setNamesDisable] = useState(false);

  const nameListIsEmpty = gronotNames.length === 0;

  const gronotNumberChangeHandler = () => {
    gronotNumberRef.current.value === ""
      ? setNamesDisable(false)
      : setNamesDisable(true);
  };

  const onAddGaronHandler = () => {
    setGronotNames((prev) => {
      const newArr = [...prev];
      newArr.push(garonNameRef.current.value);
      garonNameRef.current.value = "";
      return newArr;
    });
  };

  const removeHandler = (index) => {
    setGronotNames((prev) => {
      const newArr = [...prev];
      newArr.splice(index, 1);
      return newArr;
    });
  };

  const removeAllHandler = () => {
    setGronotNames([]);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const formDate = fromDateRef.current.value;
    const untilDate = untilDateRef.current.value;

    const startTime = startHourRef.current.value;
    const endTime = endHourRef.current.value;

    const gronotNum = nameListIsEmpty
      ? gronotNumberRef.current.value
      : gronotNames.length;

    const { totalTimeString, timeForEachString, copyText } = calcGaurd(
      `${formDate}T${startTime}`,
      `${untilDate}T${endTime}`,
      gronotNum,
      gronotNames
    );
    onFormSubmition(totalTimeString, timeForEachString, copyText);
  };

  return (
    <form className="gronot_form" onSubmit={formSubmitHandler}>
      <label htmlFor="number-of-gronot">Enter The Number Of Gronot:</label>
      <Input
        type="number"
        name="number-of-gronot"
        placeholder="e.g. '2'"
        step="1"
        ref={gronotNumberRef}
        disabled={!nameListIsEmpty}
        onChange={gronotNumberChangeHandler}
      />
      <label htmlFor="list-of-gronot">Or Their Names:</label>
      <div className="input_and_btn">
        <Input
          type="text"
          name="list-of-gronot"
          placeholder="e.g. 'Shay'"
          ref={garonNameRef}
          disabled={namesDisable}
        />
        <Button
          type="button"
          disabled={namesDisable}
          onClick={onAddGaronHandler}
        >
          Add Garon
        </Button>
      </div>
      {!nameListIsEmpty && (
        <NamesList
          onRemove={removeHandler}
          names={gronotNames}
          onRemoveAll={removeAllHandler}
        />
      )}
      <label>Enter Date:</label>
      <div className="title_and_input">
        <p>From:</p>
        <Input type="date" name="from-date" ref={fromDateRef} />
      </div>
      <div className="title_and_input">
        <p>Until:</p>
        <Input type="date" name="until-date" ref={untilDateRef} />
      </div>
      <label>Enter Time:</label>
      <div className="title_and_input">
        <p>Start:</p>
        <Input type="time" name="start-time" ref={startHourRef} />
      </div>
      <div className="title_and_input">
        <p>End:</p>
        <Input type="time" name="end-time" ref={endHourRef} />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default GronotForm;
