import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
      maxlength: [20, "Your name cannot exceed 20 characters"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      match : [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Please enter a valid email"],
      unique: true,
      minlength: [5, "Your email cannot be less than 5 characters"],
      maxlength: [30, "Your email cannot exceed 30 characters"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minlength: [6, "Your password must be at least 6 characters long"],
    },
  },
  {
    timestamps: true,
  }
);

// Encrypt password before saving
UserSchema.pre('save', async function(){
  this.password = await bcrypt.hash(this.password, 10);
})

// Generate JWT token
UserSchema.methods.generateToken = function(){
  return jwt.sign(
    { userId : this._id, name : this.name },
    process.env.JWT_SECRET,
    { expiresIn : process.env.JWT_LIFETIME }
  )
}

// Compare password
UserSchema.methods.comparePassword = async function(password){
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
}

export const User = mongoose.model("User", UserSchema);