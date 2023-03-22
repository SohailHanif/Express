const express = require("express");
const router = express.Router();
// Import Express validatior
const { check, validationResult } = require("express-validator");
const book = require("../models/book");

// Import Book and User Mongoose schemas
let Book = require("../models/book");
let User = require("../models/user");

// Genres
let genres = [
  "adventure",
  "science fiction",
  "tragedy",
  "romance",
  "horror",
  "comedy",
];

// Attach routes to router
router
  .route("/add")
  // Get method renders the pug add_book page
  .get(ensureAuthenticated, (req, res) => {
    // Render page with list of genres
    res.render("add_book", {
      genres: genres,
    });
  })
  // Post method accepts form submission and saves book in MongoDB
  .post(ensureAuthenticated, async (req, res) => {
    // Async validation check of form elements
    await check("title", "Title is required").notEmpty().run(req);
    await check("author", "Author is required").notEmpty().run(req);
    await check("pages", "Pages is required").notEmpty().run(req);
    await check("rating", "Rating is required").notEmpty().run(req);
    await check("genres", "Genre is required").notEmpty().run(req);

    // Get validation errors
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      // Create new book from mongoose model
      let book = new Book();
      // Assign attributes based on form data
      book.title = req.body.title;
      book.author = req.body.author;
      book.pages = req.body.pages;
      book.genres = req.body.genres;
      book.rating = req.body.rating;
      book.posted_by = req.user.id;

      // Save book to MongoDB
      let result =  await book.save()
      if (!result) {
        // Log error if failed
        res.send("Could not save book")
      } else {
        // Route to home to view books if suceeeded
        res.redirect("/");
      }
    } else {
      res.render("add_book", {
        // Render form with errors
        errors: errors.array(),
        genres: genres,
      });
    }
  });

// Route that returns and deletes book based on id
router
  .route("/:id")
  .get(async (req, res) => {
    // Get book by id from MongoDB
    // Get user name by id from DB
    let book = await Book.findById(req.params.id)
    console.log(book)
    if(!book){
      res.send("Could not find book")
    }
    let user = User.findById(book.posted_by)
    if (!user) {
      res.send("Could not find user")
    } else {
        res.render("book", {
          book: book,
          posted_by: user.name,
        });
      };
    })
  .delete(async (req, res) => {
    // Restrict delete if user not logged in
    if (!req.user._id) {
      res.status(500).send();
    }

    // Create query dict
    let query = { _id: req.params.id };

    let book = await Book.findById(req.params.id)
    if(!book){
      res.send("Could not find book")
    }
    // Restrict delete if user did not post book
    if (book.posted_by != req.user._id) {
      res.status(500).send();
    } else {
      // MongoDB delete with Mongoose schema deleteOne
      let result = Book.deleteOne(query, function (err) {
      if (!result) {
        res.status(500).send();
      }
      res.send("Successfully Deleted");
      });
    }
    });

    // Route that return form to edit book
router
  .route("/edit/:id")
  .get(ensureAuthenticated, async (req, res) => {
    // Get book by id from MongoDB
    let book = await Book.findById(req.params.id)
      if(!book){
        res.send("Could not find book")
      }
      // Restrict to only allowing user that posted to make updates
      if (book.posted_by != req.user._id) {
        res.redirect("/");
      }
      res.render("edit_book", {
        book: book,
        genres: genres,
      });
    })
  .post(ensureAuthenticated, async (req, res) => {
    // Create dict to hold book values
    let book = {};

    // Assign attributes based on form data
    book.title = req.body.title;
    book.author = req.body.author;
    book.pages = req.body.pages;
    book.genres = req.body.genres;
    book.rating = req.body.rating;

    let query = { _id: req.params.id };

    let book_db = await Book.findById(req.params.id)
    if(!book_db){
      res.send("Could not find book")
    }
    console.log(book_db)
    // Restrict to only allowing user that posted to make updates
    if (book_db.posted_by != req.user._id) {
      res.send("Only user who posted book can edit")
    } else {
      // Update book in MongoDB
      let result = await Book.updateOne(query, book)
        if (!result) {
          res.send("Could not update book")
        } else {
          res.redirect("/");
        }
    }
  })

// Function to protect routes from unauthenticated users
function ensureAuthenticated(req, res, next) {
  // If logged in proceed to next middleware
  if (req.isAuthenticated()) {
    return next();
    // Otherwise redirect to login page
  } else {
    res.redirect("/users/login");
  }
}

module.exports = router;
