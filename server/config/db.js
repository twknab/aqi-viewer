// This is the database config file for the server-side of AirQuality
let mongoose = require("mongoose"),
  path = require("path"),
  fs = require("fs"),
  modelsPath = path.join(__dirname, "./../models"),
  databaseName = "airqualityDB";

// Iterate through models folder and load each JS file:
fs.readdirSync(modelsPath).forEach((file) => {
  if (file.indexOf(".js") > 0) {
    require(modelsPath + "/" + file);
  }
});

// Setup Mongoose and MongoDB connection:
mongoose.connect("mongodb://localhost/" + databaseName, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Mongoose/Mongo/Node connection events:
mongoose.connection
  .on("connected", function () {
    console.log("ā  Mongoose now connected to MongoDB using DB:", databaseName);
  })
  .on("disconnected", function () {
    console.log("\nš“  Mongoose disconected from:", databaseName);
  })
  .on("error", function (err) {
    console.log(
      "ā Mongoose has encountered an error connecting to MongoDB.",
      err
    );
  });

// If Node connection breaks, close Mongoose and MongoDB connections:
process.on("SIGINT", function () {
  mongoose.connection.close(function () {
    console.log(
      "š“  Mongoose connection to MongoDB lost."
    );
    process.exit(0);
  });
});
