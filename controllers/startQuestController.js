const Model = require("../model/databaseSchemas.js");
const quests = Model.Quest;
const user = Model.User;

const handleStartQuest = async (req, res) => {
  const id = req.params.id;
  let quest;
  try{
    quest = await quests.findById(id).exec();
  } catch(err) {
    if (!err.quest) return res.sendStatus(401);
    console.log(err);
  }  
  await user.findOne({ username: req.user }).exec().then((foundUser) => {
    foundUser.userQuest.push(quest);
    foundUser.save();
    return res.sendStatus(200);
  }).catch((err)=>{
    res.sendStatus(403);
    console.log(err);
  });
}

module.exports = handleStartQuest;