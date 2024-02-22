const Model = require("../model/databaseSchemas.js");
const user = Model.User;

const handleRemoveQuest = async (req,res)=> {
    const index = parseInt(req.params.i);
    await user.findOne({username: req.user}).exec().then(foundUser => {
          const deleteIndex = foundUser.userQuest.indexOf(foundUser.userQuest[index]);
      if (deleteIndex > -1) {
        foundUser.userQuest.splice(deleteIndex, 1);
        foundUser.save();
        return res.sendStatus(200);
      } else {
        res.sendStatus(404)
      }
    })
  }

  module.exports = handleRemoveQuest;