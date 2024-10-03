const ParseDateToIndonesianFormat = (date) => {
  return date.toLocaleString("id-ID", {
    weekday: "long", // nama hari penuh (Senin, Selasa, dll.)
    day: "numeric", // hari
    month: "long", // bulan
    year: "numeric", // tahun
  });
  // return date
};

export default ParseDateToIndonesianFormat;
