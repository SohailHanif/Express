// Import express and multer
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Initialize express app
const app = express();

// Create file storage engine
const fileStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()} -- ${file.originalname}`);
  },
});

// Use static middleware to provide default routes for resources
app.use(express.static(__dirname + "/public"));

// Use multer to handle image upload
const upload = multer({ storage: fileStorage });

// Redirect to react app
app.get("/", function (req, res) {
  res.redirect("http://localhost:3000");
});

// Routes to upload images
app
  .post("/single", upload.single("image"), (req, res) => {
    console.log(req.file);
    res.send("Single image upload successful");
  })
  // Route to get random image from uploads
  .get("/single", (req, res) => {
    let upload_dir = path.join(__dirname, "uploads");
    let uploads = fs.readdirSync(upload_dir);
    // Add error handling
    if (uploads.length == 0) {
      return res.status(503).send({
        message: 'No images'
     });
    }
    let max = uploads.length - 1;
    let min = 0;

    let index = Math.round(Math.random() * (max - min) + min);
    let randomImage = uploads[index];

    res.sendFile(path.join(upload_dir, randomImage));
  });

app.post("/multiple", upload.array("images", 3), (req, res) => {
  console.log(req.files);
  res.send("Multiple image upload successful");
});

// Synchronous error
app.get("/error-test", (req, res) => {
  const error = new ReferenceError("Broken");
  error.code = 500;
  throw error;
});

// Asynchronous error
app.get("/error-async", (req, res, next) => {
  fs.readFile("/file-does-not-exist", (err, data) => {
    if (err) {
      next(err); // Pass errors to Express.
    } else {
      res.send(data);
    }
  });
});

// Route for exception handling using error handling middleware
app.use((error, req, res, next) => {
  console.log("Error Handling Middleware called");
  console.log("Path: ", req.path);
  console.error("Error: ", error);

  res.send(`Custom error page. Error: ${error.code}`);
});

// Set constant for port
const PORT = process.env.PORT || 8000;

// Listen on a port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
