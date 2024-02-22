const Model = require("../model/databaseSchemas.js");
const user = Model.User;

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;
  //check for user with refreshToken in the database
  await user.findOne({ refreshToken: refreshToken }).exec().then((foundUser) => {
    if (!foundUser) {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      return res.sendStatus(204);
    }
    // delete from database the refreshToken in foundUser document of User Schema.
    foundUser.refreshToken = "";
    foundUser.save();
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    res.sendStatus(204);
  });
}
module.exports = handleLogout;