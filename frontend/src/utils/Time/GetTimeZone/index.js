const GetTimeZone = (time) => {
  return time
    .toLocaleString("id-ID", {
      timeZoneName: "short",
    })
    .split(" ")
    .pop();
};

export default GetTimeZone;
