const http = require("http");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = require("./logEvents");

const EventEmitter = require("events");

class Emmiter extends EventEmitter {}

//intialize object
const myEmmiter = new Emmiter();

//Add listener
myEmmiter.on("log", (msg, fileName) => logEvents(msg, fileName));

const PORT = process.env.PORT || 3500;

const serveFile = async (filePath, contentType, response) => {
  try {
    const rawData = await fsPromises.readFile(
      filePath,
      !contentType.includes("image") ? "utf-8" : ""
    );
    const data =
      contentType === "application/json" ? JSON.parse(rawData) : rawData;
    response.writeHead(filePath.includes("404.html") ? 404 : 200, {
      "Content-Type": contentType,
    });
    response.end(
      contentType === "application/json" ? JSON.stringify(data) : data
    );
  } catch (error) {
    console.log(error);
    response.statusCode = 500;
    myEmmiter.emit("log", `${error.name}\t${error.message}`, "errorLog.txt");
    response.end();
  }
};

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  //emit the event
  myEmmiter.emit("log", `${req.url}\t${req.method}`, "reqLog.txt");

  const extension = path.extname(req.url);
  let contentType;

  // console.log(extension);

  switch (extension) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".jpg":
      contentType = "image/jpeg";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".txt":
      contentType = "text/plain";
      break;
    default:
      contentType = "text/html";
  }
  let filePath =
    contentType === "text/html" && req.url === "/"
      ? path.join(__dirname, "views", "index.html")
      : contentType === "text/html" && req.url.slice(-1) === "/"
      ? path.join(__dirname, "views", req.url, "index.html")
      : contentType === "text/html"
      ? path.join(__dirname, "views", req.url)
      : path.join(__dirname, req.url);

  //makes.html not required
  if (!extension && req.url.slice(-1) !== "/") {
    filePath += ".html";
  }

  const fileExists = fs.existsSync(filePath);

  if (fileExists) {
    //serve the file
    serveFile(filePath, contentType, res);
  } else {
    switch (path.parse(filePath).base) {
      case "old-page.html":
        res.writeHead(301, { Location: "/new-Page.html" });
        res.end();
        break;
      case "www-page.html":
        res.writeHead(301, { Location: "/" });
        res.end();
        break;
      default:
        //server a 404 response
        serveFile(path.join(__dirname, "views", "404.html"), "text/html", res);
    }
    //404 or 301
    // console.log(path.parse(filePath));
  }
});

server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
