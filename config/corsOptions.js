//CORS
const whitelist = [
  "https://www.google.com",
  "http://127.0.0.01:5500",
  "http://localhost:3500",
];

const corsOptions = {
  origin: (origin, callback) => {
    //remove !origin after devolopment
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionSuccessStatus: 200,
};

module.exports = corsOptions;
