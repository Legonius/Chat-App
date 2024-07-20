import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: [3, "Name must be at least 3 characters long"],
      maxlength: [50, "Name must be at most 50 characters long"],
    },
    age: {
      type: Number,
      min: [18, "Age must be at least 18"],
      max: [65, "Age must be at most 65"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /@example\.com$/.test(v); // Custom validation logic
        },
      },
      message: (props) =>
        `${props.value} is not a valid email! Email must be from example.com domain.`,
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "password must atleast 8 characters"],
    },
    gender: { type: String, enum: ["Male", "Female"], required: true },
  },
  { timestamps: true }
);

export const userModel = model("User", userSchema);
