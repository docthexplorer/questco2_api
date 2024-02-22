require("dotenv").config();
const jwt = require("jsonwebtoken");
const Model = require("../model/databaseSchemas.js");
const user = Model.User;

const handleRefreshToken = async (req,res) =>{
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    await user.findOne({refreshToken: refreshToken}).exec().then((foundUserRefresh)=>{
        if (!foundUserRefresh) return res.sendStatus(403); //Forbidden
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRETE, (err, decoded)=>{
            if(err || foundUserRefresh.username !== decoded.username) return res.sendStatus(403);
            const accessToken = jwt.sign(
                {"username": decoded.username},
                process.env.ACCESS_TOKEN_SECRETE,
                {expiresIn: "1d"}
            );
            res.json({accessToken});
        });
    });
}
module.exports = handleRefreshToken;