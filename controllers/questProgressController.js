const Model = require("../model/databaseSchemas.js");
const user = Model.User;

const handleCompletedQuest = async (req, res) => {
  let completedQuests = [];
  let progressiveQuest = [];
  let questUser;

  await user
    .findOne({ username: req.user })
    .exec()
    .then((foundUser) => {
      questUser = foundUser.username;
      foundUser.userQuest.forEach((quest, i) => {
        if (quest.questComplete === true) {
          return completedQuests.push(i);
        } else if (quest.questComplete === false) {
          progressiveQuest.push({
            index: i,
            progress: quest.questProgress.filter((p) => p.progress === true),
            delayTime: quest.delayTime
          });
        }
      });
    });
  res.json({ completedQuests, progressiveQuest, questUser });
};

const handleQuestProgress = async (req, res) => {
  const { questIndex, progressIndex, countDownTime } = req.body;
  await user
    .findOne({ username: req.user })
    .exec()
    .then((foundUser) => {
      const foundUserQuest = foundUser.userQuest[questIndex];
      const userQuestProgress = foundUserQuest.questProgress[progressIndex];
      if (!userQuestProgress) return res.sendStatus(404);
      if (foundUserQuest.questProgress.indexOf(userQuestProgress) === 4) {
        userQuestProgress.progress = true;
        foundUserQuest.questComplete = true;
        foundUser.save();
        return res.sendStatus(202);
      }
      foundUserQuest.delayTime = countDownTime;
      userQuestProgress.progress = true;
      foundUser.save();
      return res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = { handleQuestProgress, handleCompletedQuest };