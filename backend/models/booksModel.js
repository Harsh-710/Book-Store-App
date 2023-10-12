import mongoose from "mongoose";

const BookSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    boughtOn: { type: Date, required: true, default: new Date() },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide the user"],
    },
  },
  {
    timestamps: true,
  }
);

export const Book = mongoose.model("Book", BookSchema);