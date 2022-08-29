// Import express
const express = require('express');
const path = require('path');
// Import mongoose
const mongoose = require('mongoose');
// Import book routes
var book_routes = require('./routes/books');

// Connect to database
mongoose.connect("mongodb://localhost/bookstore");
let db = mongoose.connection;

// Check connection
db.once("open", function(){
    console.log("Connected to MongoDB")
})

// Check for DB errors
db.on("error", function(err){
    console.log("DB Error")
})

// Initialize express app
const app = express();

// Initialize built-in middleware for urlencoding and json
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'))

// Import Book Mongoose schemas
let Book = require("./models/book");

// Load view engine
app.set('/', path.join(__dirname, 'views'));
app.set('view engine', 'pug')

app.use("/book", book_routes)

app.use('/', function(req, res){
    // Query MongoDB for books
    Book.find({}, function(err, books){
        // Catch error
        if (err) {
            console.log("error")
        } else {
            // Pass books to index
            res.render("index", {
                books: books
            });
        }
    });
});

// Set constant for port
const PORT = process.env.PORT || 8000

// Listen on a port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));