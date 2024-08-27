const ParseExamSchedule = (date, time) => {
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}T${time
    .getHours()
    .toString()
    .padStart(2, "0")}:${time
    .getMinutes()
    .toString()
    .padStart(2, "0")}:00+08:00`;
};

export default ParseExamSchedule;
