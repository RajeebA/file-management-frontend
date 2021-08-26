const dateFormat = (date) => {
  const dateObj = new Date(date);
  const month = dateObj.getMonth();
  const day = String(dateObj.getDate()).padStart(2, "0");
  const year = dateObj.getFullYear();

  return (
    (day > 9 ? day : "0" + day) +
    "-" +
    (month > 9 ? month : "0" + month) +
    "-" +
    year
  );
};
export default dateFormat;
