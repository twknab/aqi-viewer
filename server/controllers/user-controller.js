const User = require("mongoose").model("User");

let UserController = {
  createUser: (req, res) => {
    User.create(req.body)
      .then((newUser) => {
        req.session.userId = newUser._id;
        return res.status(201).json({ success: true });
      })
      .catch((error) => {
        return res.status(403).json(error.errors);
      });
  },
  getSessionUserById: (req, res) => {
    const isAuthd = UserController.__isAuthorized(req.session);
    if (!isAuthd) {
      return UserController.__isUnauthorized(res);
    }
    User.findOne({ _id: req.session.userId })
      .then((user) => {
        return res.status(200).json(user);
      })
      .catch((error) => {
        return res.status(403).json(error.errors);
      });
  },
  updateUser: function (req, res) {
    const isAuthd = UserController.__isAuthorized(req.session);
    if (!isAuthd) {
      return UserController.__isUnauthorized(res);
    }
    User.updateOne({ _id: req.session.userId }, req.body)
      .then(() => {
        return res.status(201).json({ success: true });
      })
      .catch((error) => {
        return res.status(500).json(error.errors);
      });
  },
  loginUser: function (req, res) {
    User.findOne({ email: req.body.email })
      .then((foundUser) => {
        User.schema.methods.decryptPass(
          req.body.password,
          foundUser.password,
          function (result) {
            if (result) {
              req.session.userId = foundUser._id;
              return res.status(200).json({ success: true });
            } else {
              return res.status(401).json({
                invalid: {
                  message: "Invalid email or password.",
                },
              });
            }
          }
        );
      })
      .catch(() => {
        return res.status(401).json({
          invalid: {
            message: "Invalid email or password.",
          },
        });
      });
  },
  logoutUser: (req, res) => {
    const isAuthd = UserController.__isAuthorized(req.session);
    if (!isAuthd) {
      return UserController.__isUnauthorized(res);
    }
    req.session.destroy(function (err) {
      if (err) {
        return res.status(403);
      } else {
        return res.status(200).json({ success: true });
      }
    });
  },
  __isAuthorized(session) {
    return session.hasOwnProperty("userId");
  },
  __isUnauthorized(res) {
    return res.status(403).json({ invalid: "Not authorized." });
  },
};

module.exports = UserController;
