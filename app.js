const express = require("express");
const logger = require("morgan");
const fs = require("fs");
const path = require("path");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
require("dotenv").config(); 

const app = express();
const port = 3000;

global.__views = __dirname + "/views/";
global.BaseUrl = "http://localhost:3000";
global.ThrowError = require("./helper/index").ThrowError;

require("./config/dbConfig");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine", "ejs");
// app.use(logger("combined"));
app.use(cookieParser());

//
const oneDay = 1000 * 60 * 60 * 24;
app.use(
  sessions({
    secret: process.env.SESSION_SECRET, 
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);
//

// Import routes
const routes = require("./routes/apiRouter");
app.use("/api", routes);
require("./routes/router")(app);

//
app.use(require("./helper/index").errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
