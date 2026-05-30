import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    nombre: { type: String },
    mensaje: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
