const fs = require("fs");
const path = require("path");

// Create folder async with callback
// fs.mkdir(path.join(__dirname, "/test"), {}, function (err) {
//   if (err) throw err;
//   console.log("Async Folder created");
// });

// Create folder synchronously
// fs.mkdirSync(path.join(__dirname, "/test_sync"));
// console.log("Sync Folder created");

// Create and write file async with callback
fs.writeFile(
  path.join(__dirname, "/test", "hello.txt"),
  "Hello World!\n",
  function (err) {
    if (err) throw err;
    console.log("File written");
  }
);

// Append file async with callback
fs.appendFile(
    path.join(__dirname, "/test", "hello.txt"),
    "New content",
    function (err) {
      if (err) throw err;
      console.log("File appended");
    }
  );

// Read file async with callback
fs.readFile(
    path.join(__dirname, "/test", "hello.txt"),
    "utf8",
    (err, data) => {
      if (err) throw err;
      console.log(data);
    }
  );
