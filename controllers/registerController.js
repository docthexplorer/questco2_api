const userModel = require("../model/databaseSchemas.js");
const bcrypt = require("bcrypt");
const _ = require ("lodash");
const passwordSaltingRounds = 10;
const user = userModel.User;

const handleNewUserUniqueness = async (req,res)=>{
    const chosenUsername = _.capitalize(req.params.findUser);
    await user.findOne({username:chosenUsername}).exec().then((foundUsername)=>{
        if (foundUsername === null) {
            res.sendStatus(202);
        } else if( foundUsername) {
            res.sendStatus(205)
        } else if (!foundUsername) {
            res.sendStatus(200);
        }
    });
}

const handleNewUserRegistration = async (req,res)=>{
    const capUser =  _.capitalize(req.body.username);
    bcrypt.hash(req.body.password, passwordSaltingRounds, function(err, hash){
        const newUser = new user({
            username: capUser,
            password: hash,
            myQuest: [],
            progress: false    
        });
        newUser.save().then(()=>{
            res.sendStatus(201);
        }).catch((err)=>{
            console.log(err)
            res.sendStatus(406)
        });
    });
}

module.exports = { handleNewUserUniqueness, handleNewUserRegistration};