const GetCorrectAnswer = (option) => {
  for (let key in option) {
    if (
      option[key] &&
      typeof option[key] === "object" &&
      option[key].is_correct == true
    ) {
      return option[key].text;
    }
  }
};

export default GetCorrectAnswer;
