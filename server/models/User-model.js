const mongoose = require("mongoose"),
  bcrypt = require("bcrypt"),
  saltRounds = 12,
  Schema = mongoose.Schema,
  uniqueValidator = require("mongoose-unique-validator");

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      minlength: [2, "First name must be at least 2 characters."],
      maxlength: [30, "First name must be no greater than 30 characters."],
      required: [true, "First Name is required."],
      trim: true,
    },
    lastName: {
      type: String,
      minlength: [2, "Last name must be at least 2 characters."],
      maxlength: [30, "Last name must be no greater than 30 characters."],
      required: [true, "Last Name is required."],
      trim: true,
    },
    email: {
      type: String,
      minlength: [5, "Email must be at least 5 characters."],
      maxlength: [50, "Email must be no greater than 50 characters."],
      required: [true, "Email is required."],
      trim: true,
      lowercase: true,
      unique: true,
      dropDups: true,
    },
    password: {
      type: String,
      minlength: [12, "Password must be at least 12 characters."],
      maxlength: [24, "Password must be no greater than 24 characters."],
      required: [true, "Password is required."],
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    limit: {
      type: Number,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", function(next) {
  // Hash password with bcrypt
  UserSchema.methods.encryptPass(this.password, (hashed, error) => {
    if (hashed) {
      this.password = hashed;
      next();
    } else if (error) {
      next(error);
    }
  });
});

// Encrypt a password given a user password, and callback function
UserSchema.methods.encryptPass = function(userPassword, callback) {
  bcrypt
    .hash(userPassword, saltRounds)
    .then(function(hash) {
      callback(hash);
    })
    .catch(function(error) {
      console.log(error);
      callback(false);
    });
};

// Decrypt a password given a user password, hash and a callback function
UserSchema.methods.decryptPass = function (userPassword, hash, callback) {
  bcrypt
    .compare(userPassword, hash)
    .then(function (result) {
      callback(result);
    })
    .catch(function () {
      callback(false);
    });
};

// Invoke the mongoose unique validator
UserSchema.plugin(uniqueValidator, {
  message: "Email address must be unique.",
});

// Invoke our model using our schema and export
const User = mongoose.model("User", UserSchema);
module.exports = User;
