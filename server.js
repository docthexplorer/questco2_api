require("dotenv").config();
const express = require("express");
const app = express();
const path = require('path')
const connectDB = require("./config.js/dbConn.js");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
const corsOptions = require("./config.js/corOptions.js");
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
// const questModel = require("./model/databaseSchemas.js");
// const questsData = require("./model/quests.js");
const port = process.env.PORT || 5000;

console.log(process.env.NODE_ENV);

connectDB();
// questModel.Quest.insertMany(questsData); //Already deployed from dev environment

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
// app.use(express.urlencoded({ extended: false }));
var jsonParser = bodyParser.json();

// built-in middleware for json 
// app.use(express.json());

//middleware for cookies
app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, 'public')));

//routes
app.use('/', require('./routes/root'));
app.use("/register", jsonParser, require("./routes/register.js"));
app.use("/login", jsonParser, require("./routes/auth.js"));
app.use("/refresh", require("./routes/refresh.js"));
app.use("/logout", require("./routes/logout.js"));

app.use(verifyJWT);
app.use("/quests", require("./routes/api/questsData.js"));
app.use("/start-quest", require("./routes/api/startQuest.js"));
app.use("/user-quests", require("./routes/api/userQuest.js"));
app.use("/delete-quest", require("./routes/api/deleteQuest.js"));
app.use("/quest-progress", jsonParser, require("./routes/api/questProgress.js"));

app.all("*", (req,res)=> {
    res.sendStatus(404);
    if (req.accepts("json")) {
        res.json({"error": "Error 404, resource not found"});
    } else {
        res.type("txt").send("Error 404")
    }
});

mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
    app.listen(port, ()=>{
        console.log(`Server started on port ${port}`)
    });
});

mongoose.connection.on("error", err => console.log(err));