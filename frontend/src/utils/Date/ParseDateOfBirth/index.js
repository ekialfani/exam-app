const ParseDateOfBirth = (date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export default ParseDateOfBirth;
