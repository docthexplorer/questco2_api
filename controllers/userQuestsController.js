const Model = require("../model/databaseSchemas.js");
const user = Model.User;

const handleUserQuests = async(req,res)=> {
    await user.findOne({username: req.user}).exec().then((foundUser)=>{
        if(foundUser?.userQuest) return res.json(foundUser.userQuest);

    }).catch((err)=>{
        if(err.status === 404) return res.sendStatus(404);
        res.sendStatus(403);
        console.log(err);
    })
}
module.exports = handleUserQuests;