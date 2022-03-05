/*
This is the configuration file for the general app settings for the server-side of AirQuality app.
*/
const express = require("express"),
  bodyParser = require("body-parser"),
  path = require("path"),
  morgan = require("morgan"),
  cors = require("cors"),
  session = require("express-session"),
  creds = require("./credentials/credentials")
  history = require("connect-history-api-fallback");

module.exports = (app) => {
  // Setup our session and cookie info
  const sess = {
    secret: creds.sessionSecret,
    resave: false,
    saveUninitialized: true,
    name: "airqualityCookie",
    cookie: {
      httpOnly: false,
      maxAge: 3600000,
    },
  };

    const corsOptions = {
      origin: [
        "http://localhost:3000",
        "https://localhost:3000",
        "https://api.waqi.info",
      ],
      credentials: true,
    };

  // Setup our express and nodejs application:
  app
    .use(history())
    .use(express.static(path.join(__dirname, "../../client/src")))
    .use(cors(corsOptions))
    .use(morgan("dev"))
    .use(session(sess))
    .use(bodyParser.json());
};
