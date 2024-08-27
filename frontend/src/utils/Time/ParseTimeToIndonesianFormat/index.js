const ParseTimeToIndonesianFormat = (time) => {
  return time.toLocaleString("id-ID", {
    hour: "numeric", // jam
    minute: "numeric", // menit
    hour12: false, // 24-jam format
  });
  // return date
};

export default ParseTimeToIndonesianFormat;
