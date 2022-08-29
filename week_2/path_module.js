const path = require('path');

// File Name
console.log(path.basename(__filename))

// Directory Name
console.log(path.basename(__dirname))

// Get Path object
console.log(path.parse(__filename))

// Concatenate Path
console.log(path.join(__dirname, "test_folder", "hello.html"))