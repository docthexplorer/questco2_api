const mongoose = require("mongoose");

const questSchema = new mongoose.Schema({
        title: String,
        class: String,
        delayTime: Number,
        questProgress:[{id: String, progress: Boolean}, {id: String, progress: Boolean}, {id: String, progress: Boolean}, {id: String, progress: Boolean}, {id: String, progress: Boolean}],
        questComplete: Boolean
    });
const Quest = mongoose.model("Quest", questSchema);
    
const userSchema = new mongoose.Schema ({
        username: {
            type: String,
            unique: true
          },
        password: String,    
        userQuest: [questSchema],
        refreshToken: String
    });
const User = mongoose.model("User", userSchema);  

module.exports = {Quest, User};