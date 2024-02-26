require("dotenv").config();
const jwt = require("jsonwebtoken");
const Model = require("../model/databaseSchemas.js");
const _ = require ("lodash");
const bcrypt = require("bcrypt");
const user = Model.User;

const userAuth = async (req, res) => {
  const { username, password } = req.body;
  const capUser =  _.capitalize(username);
  if (!username || !password) {
    res.sendStatus(400);
  }
  await user.findOne({ username: capUser }).exec().then((foundUser) => {
    if (!foundUser) {
      res.sendStatus(404);
    } else {
      bcrypt.compare(password, foundUser.password, (err, auth) => {
        if (auth) {
          const accessToken = jwt.sign(
            { username: foundUser.username },
            process.env.ACCESS_TOKEN_SECRETE,
            { expiresIn: "1d" }
          );
          const refreshToken = jwt.sign(
            { username: foundUser.username },
            process.env.REFRESH_TOKEN_SECRETE,
            { expiresIn: "2d" }
          );
          // save to database the refreshToken, in foundUser document of User Schema.
          foundUser.refreshToken = refreshToken;
          foundUser.save();
          return res
            .cookie("jwt", refreshToken, {
              httpOnly: true,
              sameSite: "Strict",
              secure: true,
              maxAge: 2 * 24 * 60 * 60 * 1000,
            })
            .json({ accessToken });
        } else {
          res.sendStatus(401);
        }
      });
    }
  });
};

module.exports = userAuth;