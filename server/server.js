const express = require("express"),
  app = express(),
  port = 8000;

// App Config
require("./config/app")(app);

// Database Config
require("./config/db");

// Server-Side Routing Config
require("./config/routes")(app); // server routes go in this file

// Run Server on Port
app.listen(port, "0.0.0.0", () => {
  console.log("🛸 Server running on port:", port);
});
