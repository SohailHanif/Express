const express = require('express')
// Create router
const router = express.Router()

// Initialize built-in middleware for urlencoding and json
router.use(express.urlencoded({extended: true}));
router.use(express.json());

// Create your endpoints/route handlers 
// GET request
router.get('/', function (req, res) {
    res.send('<h1>Hello World!</h1>')
})

// POST request
router.post('/', function (req, res) {
    console.log(req.body)
    res.send()
})

// This path will match to /about
router.get('/about', (req, res) => {
    res.send('about')
})

// This route path will match abcd and acd
router.get('/ab?cd', (req, res) => {
    res.send('ab?cd')
})

// This path will match abcd, abbcd, abbbcd, etc.
router.get('/ab+cd', (req, res) => {
    res.send('ab+cd')
})

// This path will match abcd, abxcd, abANYTHINGcd, ab123cd
// requires starting with ab and ending with cd
router.get('/ab*cd', (req, res) => {
    res.send('ab*cd')
})

// Will match /abe and /abcde. Bracket content optional
router.get('/ab(cd)?e', (req, res) => {
    res.send('ab(cd)?e')
})

// Regex path that will match anything with 'a'
router.get(/a/, (req, res) => {
    res.send('/a/')
})

// Regex path that matches anything that ends with fly
router.get(/.*fly$/, (req, res) => {
    res.send('/.*fly$/')
})

// Named parameters to get user and book ids
// Uses : followed by variable name
router.get('/users/:userId/books/:bookId', (req, res) => {
    res.send(req.params)
})

// Hyphen is used literally so can be used to 
// separate parameters
router.get('/flights/:from-:to', (req, res) => {
    res.send(req.params)
})

// Named regex parameters for more control of user id
// \ is part of string literal so needs to be escaped
router.get('/user/:userId(\\d+)', (req, res) => {
    res.send(req.params)
})

// Multiple callback functions for route requires using next
router.get('/b', (req, res, next) => {
    console.log('Response is sent by the next function')
    next()
}, (req, res) => {
    res.send('Hello from B!')
})

// Function that acts as middleware for request handler
const hello_1 = function (req, res, next) {
    console.log('Hello 1')
    next()
}

// Function that acts as middleware for request handler
// Code after next() is run after next function completes
const hello_2 = function (req, res, next) {
    console.log('Hello 2')
    next()
    console.log('Hello 2 after response sent')
}
  
// Multiple callback functions for route requires using next
router.get('/c', [hello_1, hello_2], (req, res, next) => {
    console.log('Response is sent by the next function')
    next()
    console.log('Printed after response sent')
}, (req, res) => {
    console.log('Hello from C!')
    res.send('Hello from C!')
})

// Chained router route for book resource
router.route('/book')
  .get((req, res) => {
    res.send('Get a random book')
  })
  .post((req, res) => {
    console.log(req.body)
    res.json(req.body)
  })
  .put((req, res) => {
    console.log(req.body)
    res.send('Update the book')
  })

// Export router
module.exports = router