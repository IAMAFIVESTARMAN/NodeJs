const fs = require("fs");
const path = require("path");

fs.readFile(
  path.join(__dirname, "files", "starter.txt"),
  "utf-8",
  (err, dat) => {
    if (err) throw Error;
    console.log("Read Complete");
  }
);

console.log("Hello");

fs.writeFile(
  path.join(__dirname, "files", "reply.txt"),
  "Nice to meet you",
  (err) => {
    if (err) throw Error;
    console.log("Write complete");
    fs.appendFile(
      path.join(__dirname, "files", "reply.txt"),
      "\n\nYes it is",
      (err) => {
        if (err) throw Error;
        console.log("Append complete");
        fs.rename(
          path.join(__dirname, "files", "reply.txt"),
          path.join(__dirname, "files", "newReply.txt"),
          (err) => {
            if (err) throw Error;
            console.log("Rename complete");
          }
        );
      }
    );
  }
);

process.on("uncaughtException", (err) => {
  console.log(`There was an error : ${err}`);
  process.exit(1);
});
