export const isNumber = (value) => {
  const parsed = parseInt(value);
  return !isNaN(parsed);
};

export const isString = (value) => {
  return (
    typeof value === "string" && isNaN(parseInt(value)) && value.trim() !== ""
  );
};

export const isDate = (value) => {
  const dateRegex =
    /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;

  const dateRegexTwo = /^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/;

  return (
    dateRegex.test(value.toString()) || dateRegexTwo.test(value.toString())
  );
};

export const isTime = (value) => {
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(value.toString());
};
