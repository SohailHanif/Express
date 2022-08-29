let mongoose = require("mongoose");

// User Schema
let userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Export model
let User = module.exports = mongoose.model("User", userSchema);