require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyJWT = (req,res,next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.sendStatus(401); //authentication required
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRETE,(err,decoded)=>{
        if(err) return res.sendStatus(403); //Forbidden
        req.user = decoded.username;
        next();
    });
}

module.exports = verifyJWT;