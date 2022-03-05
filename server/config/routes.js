// Server side route configuration for Airquality

const UserController = require("./../controllers/user-controller");

module.exports = function (app) {
  app.post("/api/user", UserController.createUser);
  app.get("/api/user", UserController.getSessionUserById);
  app.post("/api/user/update", UserController.updateUser);
  app.post("/api/user/login", UserController.loginUser);
  app.get("/api/user/logout", UserController.logoutUser);
};
