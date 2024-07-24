const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const errorHandler = require("./middleware/errorHandler");

const { logger } = require("./middleware/logEvents");

const PORT = process.env.PORT || 3500;

//custom middlware logger

app.use(logger);

app.use(cors(corsOptions));

//built in middleware to handle urlencoded data
// in other words, form data
// content-type: application/x-www-form-urlcoded

app.use(express.urlencoded({ extended: false }));

//built in middleware for json

app.use(express.json());

//serve static files
app.use(express.static(path.join(__dirname, "./public")));
// app.use("/subdir", express.static(path.join(__dirname, "./public")));

app.use("/", require("./routes/root"));
// app.use("/subdir", require("./routes/subdir"));
app.use("/employee", require("./routes/api/employee"));

//Route Handlers

// app.get(
//   "/hello(.html)?",
//   (req, res, next) => {
//     console.log("attempted to load hello");
//     next();
//   },
//   (req, res) => {
//     res.send("Hello World Kuch Bhi");
//   }
// );

// // chaining route handlers
// const one = (req, res, next) => {
//   console.log("one");
//   next();
// };

// const two = (req, res, next) => {
//   console.log("two");
//   next();
// };

// const three = (req, res) => {
//   console.log("three");
//   res.send("Finished!");
// };

// app.get("/chain(.html)?", [one, two, three]);

// app.get("/*", (req, res) => {
//   res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
// });

//app.all is used for routing and can use regex

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
