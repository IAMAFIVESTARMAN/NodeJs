const fs = require("fs");
const fsPromises = require("fs").promises;

const createandRemoveDir = async () => {
  try {
    if (!fs.existsSync("./new")) {
      await fsPromises.mkdir("./new");
      console.log("Directory Created");
    }

    if (fs.existsSync("./new")) {
      await fsPromises.rmdir("./new");
      console.log("Directory Removed");
    }
  } catch (error) {
    console.error(error);
  }
};

createandRemoveDir();
