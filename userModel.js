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
    fame: Number, // between 0 and 5, like stars
    age: Date,
    gender: Number, // 0, 1, 2 = male female other
    interest: Number,
    preferences: {}, // {0,1} or {0, 2} etc
    tags: [], // {'dogs'}
    likes: {}, // id's of users that this user likes
    connected: {}, // id's of users that are connected to this
    notifications: {}, // notifications???
    location: {}, // longitude/latitude probably
    blocked: {}, // blocked user id's
    bio: String,
    phone: String,
    create_date: {type: Date, default: Date.now},
    file1: String,
    file2: String,
    file3: String,
    file4: String,
    file5: String
});

// Export User model
var User = module.exports = mongoose.model('user', userSchema);

module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
}

















