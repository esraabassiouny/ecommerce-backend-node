const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer"
    },
    address: {
      type: String
    },
  },
  { timestamps: true } 
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(15);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }

});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;












// User.js
// ----------------------------
// Fields:
// - name: String, required
// - email: String, required, unique
// - password: String, required (hashed)
// - role: enum ["customer", "admin"], default "customer"
// - timestamps
//
// TODO:
// - Add pre-save hook to hash password
// - Add method to compare passwords (bcrypt)
