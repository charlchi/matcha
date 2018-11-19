var mongoose = require('mongoose');

// Setup schema
var userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    pass: {
        type: String,
        required: true
    },
    gender: String,
    phone: String,
    create_date: {
        type: Date,
        default: Date.now
    }
});

// Export User model
var User = module.exports = mongoose.model('user', userSchema);


module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
}