/* File System Node*/

// const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const fileOPs = async () => {
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, "files", "starter.txt"),
      "utf-8"
    );
    await fsPromises.unlink(path.join(__dirname, "files", "starter.txt"));
    console.log(data);
    await fsPromises.writeFile(
      path.join(__dirname, "files", "reply.txt"),
      data
    );
    await fsPromises.appendFile(
      path.join(__dirname, "files", "reply.txt"),
      "\n\nSherri Pappini Harry Houdini"
    );
    await fsPromises.rename(
      path.join(__dirname, "files", "reply.txt"),
      path.join(__dirname, "files", "newReply.txt")
    );

    const newData = await fsPromises.readFile(
      path.join(__dirname, "files", "newReply.txt"),
      "utf-8"
    );
    console.log(newData);
  } catch (error) {
    console.error(error);
  }
};

fileOPs();

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
