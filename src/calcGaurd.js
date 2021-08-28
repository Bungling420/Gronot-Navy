const calcGaurd = (startDateAndTimeString, endDateAndTimeString, gronotNum) => {
  const startDateAndTime = new Date(startDateAndTimeString);
  const endDateAndTime = new Date(endDateAndTimeString);
  const timeInMilliSecond =
    endDateAndTime.getTime() - startDateAndTime.getTime();

  const totalHours = Math.floor(timeInMilliSecond / 1000 / 60 / 60);
  const totalMin = Math.floor(timeInMilliSecond / 1000 / 60);
  const totalSeconds = timeInMilliSecond / 1000;

  const totalTimeString = `${totalHours}:${totalMin - totalHours * 60}:${
    totalSeconds - totalMin * 60
  }`;

  const hoursForEach = Math.floor(totalHours / gronotNum);
  const minForEach = Math.floor(totalMin / gronotNum);
  const secondsForEach = totalSeconds / gronotNum;

  const timeForEachString = `${hoursForEach}:${
    minForEach - hoursForEach * 60
  }:${secondsForEach - minForEach * 60}`;

  return {
    totalTimeString,
    timeForEachString,
  };
};

export default calcGaurd;
