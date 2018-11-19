var mongoose = require('mongoose');

/*
◦ The gender.
◦ Sexual preferences.
◦ A biography.
◦ A list of interests with tags (ex: #vegan, #geek, #piercing etc...). These tags
must be reusable.
◦ Pictures, max 5, including 1 as profile picture.
*/

// Setup schema
var userSchema = mongoose.Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    pass: {type: String, required: true},
    isFullyRegistered: {type: Number, required: true},
    fame: Number,
    age: Number,
    gender: Number,
    preferences: {},
    tags: {},
    location: {},
    bio: String,
    phone: String,
    create_date: { type: Date, default: Date.now}
});

// Export User model
var User = module.exports = mongoose.model('user', userSchema);


module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
}