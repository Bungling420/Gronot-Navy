const getTimeString = (timeInMilliSecond, gronotNum) => {
  const totalHours = Math.floor(timeInMilliSecond / 1000 / 60 / 60);
  const totalMin = Math.floor(timeInMilliSecond / 1000 / 60);
  const totalSeconds = timeInMilliSecond / 1000;

  const tolMin = totalMin - totalHours * 60;
  const tolSec = Math.ceil(totalSeconds - totalMin * 60);
  const totalTimeString = `${totalHours < 10 ? "0" + totalHours : totalHours}:${
    tolMin < 10 ? "0" + tolMin : tolMin
  }:${tolSec < 10 ? "0" + tolSec : tolSec}`;

  const hoursForEach = Math.floor(totalHours / gronotNum);
  const minForEach = Math.floor(totalMin / gronotNum);
  const secondsForEach = totalSeconds / gronotNum;

  const min = minForEach - hoursForEach * 60;
  const seconds = Math.ceil(secondsForEach - minForEach * 60);
  const timeForEachString = `${
    hoursForEach < 10 ? "0" + hoursForEach : hoursForEach
  }:${min < 10 ? "0" + min : min}:${seconds < 10 ? "0" + seconds : seconds}`;

  return { totalTimeString, timeForEachString };
};
const textForTextarea = (guardArr) => {
  let str = "";
  guardArr.forEach((guard) => {
    str += `${guard.name}: ${guard.guardDateAndTimeString}
`;
  });
  return str;
};

const guardArr = (startDateAndTime, totalMilliSeconds, nameArr) => {
  let startMilliSeconds = startDateAndTime.getTime();
  let milliSecondsEach = totalMilliSeconds / nameArr.length;
  let count = 0;
  const arr = [];
  while (count < nameArr.length) {
    const guardStartDateAndTime = new Date(startMilliSeconds);
    startMilliSeconds += milliSecondsEach;
    const guardEndDateAndTime = new Date(startMilliSeconds);
    const startH = guardStartDateAndTime.getHours();
    const startM = guardStartDateAndTime.getMinutes();
    const endH = guardEndDateAndTime.getHours();
    const endM = guardEndDateAndTime.getMinutes();
    const guardDateAndTimeString = `${startH < 10 ? "0" + startH : startH}:${
      startM < 10 ? "0" + startM : startM
    } - ${endH < 10 ? "0" + endH : endH}:${endM < 10 ? "0" + endM : endM} ${
      guardEndDateAndTime.toDateString().split(" ")[0]
    }`;

    arr.push({
      name: nameArr[count],
      guardDateAndTimeString,
    });
    count++;
  }
  return arr;
};

const calcGaurd = (
  startDateAndTimeString,
  endDateAndTimeString,
  gronotNum,
  nameArr = []
) => {
  const startDateAndTime = new Date(startDateAndTimeString);
  const endDateAndTime = new Date(endDateAndTimeString);

  const timeInMilliSecond =
    endDateAndTime.getTime() - startDateAndTime.getTime();

  const { totalTimeString, timeForEachString } = getTimeString(
    timeInMilliSecond,
    gronotNum
  );
  const guardArray = guardArr(startDateAndTime, timeInMilliSecond, nameArr);
  const copyText = textForTextarea(guardArray);

  return {
    totalTimeString,
    timeForEachString,
    copyText,
  };
};

export default calcGaurd;
