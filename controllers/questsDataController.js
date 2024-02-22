const Model = require("../model/databaseSchemas.js");
const quests = Model.Quest;


const handleQuestsData = async (req,res) => {
    await quests.find({}).exec().then((questsData)=>{
        if(questsData) {
            res.json(questsData);
        } else {
            console.log("error")
        }
    }).catch((err)=>{
        console.log(err);
    });
}

module.exports = handleQuestsData;