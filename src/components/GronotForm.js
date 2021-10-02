import React, { useState, useEffect } from "react";
import Input from "./Input";
import Button from "./Button";
import NamesList from "./NamesList";
import calcGaurd from "../util/calcGaurd";
import useInput from "../hooks/useInput";
import {
  isNumber,
  isString,
  isDate,
  isTime,
} from "../util/validationFunctions";

const GronotForm = ({ onFormSubmition }) => {
  const {
    value: gronotNumber,
    showError: gronotNumberShowError,
    isValid: gronotNumberIsValid,
    onChange: gronotNumberOnChange,
    onBlur: gronotNumberOnBlur,
  } = useInput(isNumber);
  const {
    value: garonName,
    showError: garonNameShowError,
    isValid: garonNameIsValid,
    onChange: garonNameOnChange,
    onBlur: garonNameOnBlur,
    reset: garonNameReset,
  } = useInput(isString);
  const {
    value: fromDate,
    setValue: setFromDate,
    showError: fromDateShowError,
    isValid: fromDateIsValid,
    onChange: fromDateOnChange,
    onBlur: fromDateOnBlur,
  } = useInput(isDate);
  const {
    value: untilDate,
    setValue: setUntilDate,
    showError: untilDateShowError,
    isValid: untilDateIsValid,
    onChange: untilDateOnChange,
    onBlur: untilDateOnBlur,
  } = useInput(isDate);
  const {
    value: startTime,
    setValue: setStartTime,
    showError: startTimeShowError,
    isValid: startTimeIsValid,
    onChange: startTimeOnChange,
    onBlur: startTimeOnBlur,
  } = useInput(isTime);
  const {
    value: endTime,
    setValue: setEndTime,
    showError: endTimeShowError,
    isValid: endTimeIsValid,
    onChange: endTimeOnChange,
    onBlur: endTimeOnBlur,
  } = useInput(isTime);

  const [gronotNames, setGronotNames] = useState([]);
  const [namesDisable, setNamesDisable] = useState(false);

  const nameListIsEmpty = gronotNames.length === 0;

  useEffect(() => {
    if (gronotNumber) {
      return setNamesDisable(true);
    }
    if (gronotNumber === "") {
      return setNamesDisable(false);
    }
  }, [gronotNumber]);

  const onAddGaronHandler = () => {
    if (!garonNameIsValid || namesDisable) {
      return;
    }
    setGronotNames((prev) => {
      const newArr = [...prev];
      newArr.push(garonName);
      garonNameReset();
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

  let formIsValid;

  if (
    (gronotNumberIsValid || gronotNames.length > 0) &&
    fromDateIsValid &&
    untilDateIsValid &&
    startTimeIsValid &&
    endTimeIsValid
  ) {
    formIsValid = true;
  } else {
    formIsValid = false;
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    const gronotNum = nameListIsEmpty ? gronotNumber : gronotNames.length;

    const { totalTimeString, timeForEachString, copyText } = calcGaurd(
      `${fromDate}T${startTime}`,
      `${untilDate}T${endTime}`,
      gronotNum,
      gronotNames
    );
    onFormSubmition(totalTimeString, timeForEachString, copyText);
  };

  const randomizeHandler = () => {
    setGronotNames((prevNames) => {
      const newArr = [...prevNames];
      let currentIndex = newArr.length;
      let randomIndex;

      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [newArr[currentIndex], newArr[randomIndex]] = [
          newArr[randomIndex],
          newArr[currentIndex],
        ];
      }
      return newArr;
    });
  };

  const swapHandler = (selectedIndex, swapIndex) => {
    setGronotNames((prevNames) => {
      const newArr = [...prevNames];
      const temp = newArr[swapIndex];
      newArr[swapIndex] = newArr[selectedIndex];
      newArr[selectedIndex] = temp;
      return newArr;
    });
  };

  const tonightHandler = (bool) => {
    const multiplier = bool ? 12 : 60;
    const startTimeString = bool ? "20:00" : "09:00";
    const endTimeString = bool ? "08:00" : "20:00";
    const toFrom = new Date(Date.now());
    const toUntil = new Date(toFrom.getTime() + multiplier * 1000 * 60 * 60);

    const fromMonth = toFrom.getMonth() + 1;
    const fromDay = toFrom.getDate();

    const untilMonth = toUntil.getMonth() + 1;
    const untilDay = toUntil.getDate();
    setFromDate(
      `${toFrom.getFullYear()}-${
        fromMonth < 10 ? "0" + fromMonth : fromMonth
      }-${fromDay < 10 ? "0" + fromDay : fromDay}`
    );
    setUntilDate(
      `${toUntil.getFullYear()}-${
        untilMonth < 10 ? "0" + untilMonth : untilMonth
      }-${untilDay < 10 ? "0" + untilDay : untilDay}`
    );
    setStartTime(startTimeString);
    setEndTime(endTimeString);
  };

  return (
    <form className="gronot_form" onSubmit={formSubmitHandler}>
      <label htmlFor="number-of-gronot">Enter The Number Of Gronot:</label>
      <Input
        type="number"
        name="number-of-gronot"
        placeholder="e.g. '2'"
        disabled={!nameListIsEmpty}
        value={gronotNumber}
        onBlur={gronotNumberOnBlur}
        onChange={gronotNumberOnChange}
        className={gronotNumberShowError && nameListIsEmpty ? "invalid" : ""}
      />
      <label htmlFor="list-of-gronot">Or Their Names:</label>
      <div className="input_and_btn">
        <Input
          type="text"
          name="list-of-gronot"
          placeholder="e.g. 'Shay'"
          disabled={namesDisable}
          value={garonName}
          onBlur={garonNameOnBlur}
          onChange={garonNameOnChange}
          className={garonNameShowError && !nameListIsEmpty ? "invalid" : ""}
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
          onRandomize={randomizeHandler}
          onSwap={swapHandler}
        />
      )}
      <div className="quick-buttons">
        <Button type="button" onClick={() => tonightHandler(true)}>
          Tonight
        </Button>
        <Button type="button" onClick={() => tonightHandler(false)}>
          Weekend
        </Button>
      </div>
      <label>Enter Date:</label>
      <div className="title_and_input">
        <p>From:</p>
        <Input
          type="date"
          name="from-date"
          value={fromDate}
          onBlur={fromDateOnBlur}
          onChange={fromDateOnChange}
          className={fromDateShowError ? "invalid" : ""}
        />
      </div>
      <div className="title_and_input">
        <p>Until:</p>
        <Input
          type="date"
          name="until-date"
          value={untilDate}
          onBlur={untilDateOnBlur}
          onChange={untilDateOnChange}
          className={untilDateShowError ? "invalid" : ""}
        />
      </div>
      <label>Enter Time:</label>
      <div className="title_and_input">
        <p>Start:</p>
        <Input
          type="time"
          name="start-time"
          value={startTime}
          onBlur={startTimeOnBlur}
          onChange={startTimeOnChange}
          className={startTimeShowError ? "invalid" : ""}
        />
      </div>
      <div className="title_and_input">
        <p>End:</p>
        <Input
          type="time"
          name="end-time"
          value={endTime}
          onBlur={endTimeOnBlur}
          onChange={endTimeOnChange}
          className={endTimeShowError ? "invalid" : ""}
        />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default GronotForm;
