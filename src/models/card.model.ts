import { Schema, model } from "mongoose";

const CardSchema = new Schema(
  {
    name: String,
    surName: String,
    telephone: String,
    email: String,
    image: { data: Buffer, contentType: String },
  },
  {
    timestamps: true,
  }
);

export default model("Card", CardSchema);
